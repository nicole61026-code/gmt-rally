const http = require("http");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs/promises");
const { createPollStore } = require("./storage");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const CLIENTS = new Map();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const store = createPollStore({ root: ROOT });

async function main() {
  await store.init();
  const server = http.createServer((request, response) => {
    handleRequest(request, response).catch((error) => {
      console.error(error);
      sendJson(response, 500, { error: "Internal server error" });
    });
  });

  server.listen(PORT, HOST, () => {
    console.log(`GMT Rally is running at http://${HOST}:${PORT}/`);
  });
}

async function handleRequest(request, response) {
  const url = new URL(request.url || "/", `http://${request.headers.host || `${HOST}:${PORT}`}`);

  if (url.pathname === "/api/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (url.pathname === "/api/polls" && request.method === "POST") {
    await createPoll(request, response);
    return;
  }

  const pollMatch = url.pathname.match(/^\/api\/polls\/([^/]+)$/);
  if (pollMatch && request.method === "GET") {
    await sendPoll(response, pollMatch[1]);
    return;
  }

  if (pollMatch && request.method === "POST") {
    sendJson(response, 405, { error: "Use POST /api/polls/{id}/votes to vote." });
    return;
  }

  const voteMatch = url.pathname.match(/^\/api\/polls\/([^/]+)\/votes$/);
  if (voteMatch && request.method === "POST") {
    await submitVote(request, response, voteMatch[1]);
    return;
  }

  const eventMatch = url.pathname.match(/^\/api\/polls\/([^/]+)\/events$/);
  if (eventMatch && request.method === "GET") {
    await openEventStream(request, response, eventMatch[1]);
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  await serveStatic(url.pathname, response, request.method === "HEAD");
}

async function createPoll(request, response) {
  const body = await readJsonBody(request);
  const title = cleanString(body.title, 90);
  const agenda = cleanString(body.agenda, 800);
  const meetingUrl = normalizeMeetingUrl(body.meetingUrl);
  const creator = cleanProfile(body.creator);
  const slots = cleanSlots(body.slots);

  if (!title) {
    sendJson(response, 400, { error: "Meeting title is required." });
    return;
  }

  if (!creator || !slots.length) {
    sendJson(response, 400, { error: "Creator time zone and at least one slot are required." });
    return;
  }

  const id = createId("poll");
  const poll = {
    version: 1,
    id,
    title,
    agenda,
    meetingUrl,
    creator,
    slots,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const payload = await store.createPoll(poll);
  await broadcastPoll(id);
  sendJson(response, 201, payload);
}

async function submitVote(request, response, pollId) {
  const poll = await store.getPoll(pollId);
  if (!poll) {
    sendJson(response, 404, { error: "Poll not found." });
    return;
  }

  const body = await readJsonBody(request);
  const name = cleanString(body.name, 70);
  const profile = cleanProfile(body);

  if (!name || !profile) {
    sendJson(response, 400, { error: "Participant name and time zone are required." });
    return;
  }

  const existingVote = await store.getVote(pollId, name);
  if (existingVote) {
    const payload = await store.getPayload(pollId);
    sendJson(response, 409, {
      ...payload,
      alreadyVoted: true,
      error: "This participant already submitted a vote."
    });
    return;
  }

  const allowedSlotIds = new Set(poll.slots.map((slot) => slot.id));
  const choices = {};
  for (const slot of poll.slots) {
    const choice = body.choices?.[slot.id];
    if (choice !== "yes" && choice !== "no") {
      sendJson(response, 400, { error: "Every slot needs a yes or no choice." });
      return;
    }
    choices[slot.id] = choice;
  }

  Object.keys(body.choices || {}).forEach((slotId) => {
    if (!allowedSlotIds.has(slotId)) {
      delete choices[slotId];
    }
  });

  const vote = {
    name,
    countryCode: profile.countryCode,
    timeZone: profile.timeZone,
    choices,
    updatedAt: new Date().toISOString()
  };
  const payload = await store.saveVote(pollId, vote);
  await broadcastPoll(pollId);
  sendJson(response, 200, payload);
}

async function sendPoll(response, pollId) {
  const payload = await store.getPayload(pollId);
  if (!payload) {
    sendJson(response, 404, { error: "Poll not found." });
    return;
  }
  sendJson(response, 200, payload);
}

async function openEventStream(request, response, pollId) {
  const payload = await store.getPayload(pollId);
  if (!payload) {
    sendJson(response, 404, { error: "Poll not found." });
    return;
  }

  response.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no"
  });

  const client = { response };
  const clients = CLIENTS.get(pollId) || new Set();
  clients.add(client);
  CLIENTS.set(pollId, clients);

  writeEvent(response, "snapshot", payload);
  const heartbeat = setInterval(() => {
    response.write(": heartbeat\n\n");
  }, 25000);

  request.on("close", () => {
    clearInterval(heartbeat);
    clients.delete(client);
    if (!clients.size) {
      CLIENTS.delete(pollId);
    }
  });
}

async function broadcastPoll(pollId) {
  const clients = CLIENTS.get(pollId);
  if (!clients?.size) return;
  const payload = await store.getPayload(pollId);
  if (!payload) return;
  clients.forEach((client) => {
    writeEvent(client.response, "poll:update", payload);
  });
}

function writeEvent(response, event, payload) {
  response.write(`event: ${event}\n`);
  response.write(`data: ${JSON.stringify(payload)}\n\n`);
}

async function readJsonBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) {
      throw new Error("Request body is too large.");
    }
  }
  return body ? JSON.parse(body) : {};
}

async function serveStatic(pathname, response, isHead) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const decodedPath = decodeURIComponent(safePath);
  const target = path.resolve(ROOT, `.${decodedPath}`);

  if (!target.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(target);
    if (stat.isDirectory()) {
      await sendFile(path.join(target, "index.html"), response, isHead);
      return;
    }
    await sendFile(target, response, isHead);
  } catch (error) {
    await sendFile(path.join(ROOT, "index.html"), response, isHead);
  }
}

async function sendFile(filePath, response, isHead) {
  const data = await fs.readFile(filePath);
  response.writeHead(200, {
    "Content-Type": MIME_TYPES[path.extname(filePath)] || "application/octet-stream"
  });
  if (isHead) {
    response.end();
  } else {
    response.end(data);
  }
}

function cleanString(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function cleanProfile(value) {
  const countryCode = cleanString(value?.countryCode, 2).toUpperCase();
  const timeZone = cleanString(value?.timeZone, 80);
  if (!/^[A-Z]{2}$/.test(countryCode) || !timeZone || !isValidTimeZone(timeZone)) {
    return null;
  }
  return { countryCode, timeZone };
}

function cleanSlots(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((slot) => ({
      id: cleanString(slot.id, 80) || createId("slot"),
      startUtc: cleanString(slot.startUtc, 40),
      duration: Number(slot.duration)
    }))
    .filter((slot) => !Number.isNaN(Date.parse(slot.startUtc)) && [30, 45, 60, 90, 120].includes(slot.duration))
    .sort((a, b) => new Date(a.startUtc) - new Date(b.startUtc));
}

function normalizeMeetingUrl(value) {
  const raw = cleanString(value, 400);
  if (!raw) return "";
  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withProtocol);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch (error) {
    return "";
  }
}

function isValidTimeZone(timeZone) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return true;
  } catch (error) {
    return false;
  }
}

function createId(prefix) {
  return `${prefix}_${crypto.randomBytes(9).toString("base64url")}`;
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
