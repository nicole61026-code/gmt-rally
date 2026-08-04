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

  const creatorMatch = url.pathname.match(/^\/api\/creators\/([^/]+)\/polls$/);
  if (creatorMatch && request.method === "GET") {
    await listCreatorPolls(response, creatorMatch[1]);
    return;
  }

  const calendarMatch = url.pathname.match(/^\/api\/polls\/([^/]+)\/calendar\.ics$/);
  if (calendarMatch && request.method === "GET") {
    await sendCalendarInvite(request, response, calendarMatch[1]);
    return;
  }

  const notifyMatch = url.pathname.match(/^\/api\/polls\/([^/]+)\/notify$/);
  if (notifyMatch && request.method === "POST") {
    await notifyAttendees(request, response, notifyMatch[1]);
    return;
  }

  const pollMatch = url.pathname.match(/^\/api\/polls\/([^/]+)$/);
  if (pollMatch && request.method === "GET") {
    await sendPoll(request, response, pollMatch[1], url);
    return;
  }

  if (pollMatch && request.method === "PATCH") {
    await updatePollDetails(request, response, pollMatch[1]);
    return;
  }

  if (pollMatch && request.method === "DELETE") {
    await deletePoll(request, response, pollMatch[1]);
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
  const creatorName = cleanCreatorName(body.creatorName);
  const creator = cleanProfile(body.creator);
  const slots = cleanSlots(body.slots);

  if (!creatorName) {
    sendJson(response, 400, { error: "Creator name is required." });
    return;
  }

  if (!title) {
    sendJson(response, 400, { error: "Meeting title is required." });
    return;
  }

  if (!creator || !slots.length) {
    sendJson(response, 400, { error: "Creator time zone and at least one slot are required." });
    return;
  }

  const id = createId("poll");
  const adminToken = createToken();
  const poll = {
    version: 1,
    id,
    title,
    agenda,
    meetingUrl,
    creatorName,
    creatorKey: makeCreatorKey(creatorName),
    creator,
    adminToken,
    adminTokenHash: hashToken(adminToken),
    slots,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const payload = await store.createPoll(poll);
  await broadcastPoll(id);
  sendJson(response, 201, { ...payload, adminToken });
}

async function updatePollDetails(request, response, pollId) {
  const poll = await store.getPoll(pollId);
  if (!poll) {
    sendJson(response, 404, { error: "Poll not found." });
    return;
  }

  const body = await readJsonBody(request);
  const adminToken = cleanString(body.adminToken || request.headers["x-admin-token"], 200);

  if (!isValidAdminToken(poll, adminToken)) {
    sendJson(response, 403, { error: "Creator management link is required." });
    return;
  }

  const updates = {};
  if (Object.prototype.hasOwnProperty.call(body, "title")) {
    const title = cleanString(body.title, 90);
    if (!title) {
      sendJson(response, 400, { error: "Meeting title is required." });
      return;
    }
    updates.title = title;
  }
  if (Object.prototype.hasOwnProperty.call(body, "agenda")) {
    updates.agenda = cleanString(body.agenda, 800);
  }
  if (Object.prototype.hasOwnProperty.call(body, "meetingUrl")) {
    updates.meetingUrl = normalizeMeetingUrl(body.meetingUrl);
  }
  if (Object.prototype.hasOwnProperty.call(body, "finalSlotId")) {
    const finalSlotId = cleanString(body.finalSlotId, 80);
    if (!poll.slots.some((slot) => slot.id === finalSlotId)) {
      sendJson(response, 400, { error: "Choose one of the candidate meeting times." });
      return;
    }
    updates.finalSlotId = finalSlotId;
    updates.finalizedAt = new Date().toISOString();
    if (poll.finalSlotId !== finalSlotId) {
      updates.inviteSentAt = null;
      updates.inviteSentFinalSlotId = null;
      updates.inviteSentCount = null;
    }
  }

  await store.updatePoll(pollId, updates);
  const payload = await store.getPayload(pollId, { includePrivateVoteFields: true });
  await broadcastPoll(pollId);
  sendJson(response, 200, payload);
}

async function deletePoll(request, response, pollId) {
  const poll = await store.getPoll(pollId);
  if (!poll) {
    sendJson(response, 404, { error: "Poll not found." });
    return;
  }

  const body = await readJsonBody(request);
  const adminToken = cleanString(body.adminToken || request.headers["x-admin-token"], 200);

  if (!isValidAdminToken(poll, adminToken)) {
    sendJson(response, 403, { error: "Creator management link is required." });
    return;
  }

  await store.deletePoll(pollId);
  closePollClients(pollId);
  sendJson(response, 200, { ok: true, deletedPollId: pollId });
}

async function listCreatorPolls(response, encodedCreatorName) {
  const creatorName = cleanCreatorName(decodeURIComponent(encodedCreatorName));
  if (!creatorName) {
    sendJson(response, 400, { error: "Creator name is required." });
    return;
  }

  const polls = await store.listPollsByCreatorKey(makeCreatorKey(creatorName));
  sendJson(response, 200, { creatorName, polls });
}

async function submitVote(request, response, pollId) {
  const poll = await store.getPoll(pollId);
  if (!poll) {
    sendJson(response, 404, { error: "Poll not found." });
    return;
  }

  const body = await readJsonBody(request);
  const name = cleanString(body.name, 70);
  const email = cleanEmail(body.email);
  const profile = cleanProfile(body);

  if (!name || !email || !profile) {
    sendJson(response, 400, { error: "Participant name, email, and time zone are required." });
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
    email,
    countryCode: profile.countryCode,
    timeZone: profile.timeZone,
    choices,
    updatedAt: new Date().toISOString()
  };
  const payload = await store.saveVote(pollId, vote);
  await broadcastPoll(pollId);
  sendJson(response, 200, payload);
}

async function sendPoll(request, response, pollId, url) {
  const includePrivateVoteFields = await canReadPrivateVoteFields(
    pollId,
    cleanString(url.searchParams.get("adminToken") || request.headers["x-admin-token"], 200)
  );
  const payload = await store.getPayload(pollId, { includePrivateVoteFields });
  if (!payload) {
    sendJson(response, 404, { error: "Poll not found." });
    return;
  }
  sendJson(response, 200, payload);
}

async function sendCalendarInvite(request, response, pollId) {
  const poll = await store.getPoll(pollId);
  if (!poll) {
    sendJson(response, 404, { error: "Poll not found." });
    return;
  }

  const finalSlot = poll.finalSlotId ? poll.slots.find((slot) => slot.id === poll.finalSlotId) : null;
  if (!finalSlot) {
    sendJson(response, 409, { error: "Final meeting time has not been confirmed yet." });
    return;
  }

  const baseUrl = getRequestBaseUrl(request);
  const url = new URL(request.url || "/", `http://${request.headers.host || `${HOST}:${PORT}`}`);
  const includeAttendees = isValidAdminToken(poll, cleanString(url.searchParams.get("adminToken"), 200));
  const privatePayload = includeAttendees ? await store.getPayload(pollId, { includePrivateVoteFields: true }) : null;
  const attendeeEmails = includeAttendees ? collectAttendeeEmails(privatePayload?.votes || []) : [];
  const ics = createCalendarInvite({
    poll,
    finalSlot,
    attendeeEmails,
    baseUrl,
    organizerEmail: extractEmailAddress(process.env.EMAIL_FROM) || "no-reply@gmt-rally.local"
  });

  response.writeHead(200, {
    "Content-Type": `text/calendar; method=${attendeeEmails.length ? "REQUEST" : "PUBLISH"}; charset=utf-8`,
    "Content-Disposition": `attachment; filename="${safeFileName(poll.title)}.ics"`,
    "Cache-Control": "no-store"
  });
  response.end(ics);
}

async function notifyAttendees(request, response, pollId) {
  const poll = await store.getPoll(pollId);
  if (!poll) {
    sendJson(response, 404, { error: "Poll not found." });
    return;
  }

  const body = await readJsonBody(request);
  const adminToken = cleanString(body.adminToken || request.headers["x-admin-token"], 200);
  if (!isValidAdminToken(poll, adminToken)) {
    sendJson(response, 403, { error: "Creator management link is required." });
    return;
  }

  const finalSlot = poll.finalSlotId ? poll.slots.find((slot) => slot.id === poll.finalSlotId) : null;
  if (!finalSlot) {
    sendJson(response, 409, { error: "Confirm a final meeting time before sending calendar invites." });
    return;
  }

  if (poll.inviteSentAt && poll.inviteSentFinalSlotId === finalSlot.id) {
    sendJson(response, 409, {
      error: "Calendar invites were already sent for this final meeting time.",
      alreadySent: true,
      inviteSentAt: poll.inviteSentAt
    });
    return;
  }

  const config = getEmailDeliveryConfig();
  if (!config.ok) {
    sendJson(response, 503, {
      error: config.error
    });
    return;
  }

  const payload = await store.getPayload(pollId, { includePrivateVoteFields: true });
  const attendeeEmails = collectAttendeeEmails(payload?.votes || []);
  if (!attendeeEmails.length) {
    sendJson(response, 409, { error: "No attendee emails are available yet." });
    return;
  }

  const baseUrl = getRequestBaseUrl(request);
  let result;
  try {
    result = await sendInviteEmails({ poll, finalSlot, attendeeEmails, baseUrl, config });
  } catch (error) {
    console.error(error);
    sendJson(response, 502, {
      error: getEmailDeliveryErrorMessage(error)
    });
    return;
  }

  const sentAt = new Date().toISOString();
  await store.updatePoll(pollId, {
    inviteSentAt: sentAt,
    inviteSentFinalSlotId: finalSlot.id,
    inviteSentCount: result.count
  });
  const updatedPayload = await store.getPayload(pollId, { includePrivateVoteFields: true });
  await broadcastPoll(pollId);
  sendJson(response, 200, {
    ...updatedPayload,
    notification: {
      sent: true,
      count: result.count,
      sentAt
    }
  });
}

async function openEventStream(request, response, pollId) {
  const url = new URL(request.url || "/", `http://${request.headers.host || `${HOST}:${PORT}`}`);
  const includePrivateVoteFields = await canReadPrivateVoteFields(
    pollId,
    cleanString(url.searchParams.get("adminToken") || request.headers["x-admin-token"], 200)
  );
  const payload = await store.getPayload(pollId, { includePrivateVoteFields });
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

  const client = { response, includePrivateVoteFields };
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
  for (const client of clients) {
    const payload = await store.getPayload(pollId, { includePrivateVoteFields: client.includePrivateVoteFields });
    if (!payload) continue;
    writeEvent(client.response, "poll:update", payload);
  }
}

function closePollClients(pollId) {
  const clients = CLIENTS.get(pollId);
  if (!clients?.size) return;
  clients.forEach((client) => {
    writeEvent(client.response, "poll:deleted", { id: pollId });
    client.response.end();
  });
  CLIENTS.delete(pollId);
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

function cleanCreatorName(value) {
  return cleanString(value, 70).replace(/\s+/g, " ");
}

function cleanEmail(value) {
  const email = cleanString(value, 254).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

function collectAttendeeEmails(votes) {
  const seen = new Set();
  return votes
    .map((vote) => cleanEmail(vote.email))
    .filter((email) => {
      if (!email || seen.has(email)) return false;
      seen.add(email);
      return true;
    });
}

function getEmailDeliveryConfig() {
  const provider = cleanString(process.env.EMAIL_PROVIDER || (process.env.RESEND_API_KEY ? "resend" : ""), 30).toLowerCase();
  const setupMessage = "Automatic email sending is not configured yet. Add EMAIL_PROVIDER=resend, RESEND_API_KEY, and EMAIL_FROM in Render.";
  if (!provider) return { ok: false, error: setupMessage };
  if (provider !== "resend") {
    return { ok: false, error: "EMAIL_PROVIDER must be set to resend." };
  }
  const apiKey = cleanString(process.env.RESEND_API_KEY, 300);
  const from = cleanString(process.env.EMAIL_FROM, 300);
  if (!apiKey || !from) return { ok: false, error: setupMessage };
  if (!/^re_[\x21-\x7e]+$/.test(apiKey)) {
    return {
      ok: false,
      error: "RESEND_API_KEY in Render must be the real Resend API key. It should start with re_ and must not contain Chinese placeholder text."
    };
  }
  const organizerEmail = extractEmailAddress(from);
  if (!organizerEmail) {
    return {
      ok: false,
      error: "EMAIL_FROM in Render must be a real sender address, for example GMT Rally <invites@yourdomain.com>."
    };
  }
  return {
    ok: true,
    provider,
    apiKey,
    from,
    organizerEmail
  };
}

async function sendInviteEmails({ poll, finalSlot, attendeeEmails, baseUrl, config }) {
  const subject = `Confirmed: ${poll.title}`;
  const timeText = formatMeetingTimeForEmail(poll, finalSlot);
  const pollUrl = `${baseUrl}#poll=${encodeURIComponent(poll.id)}`;
  const filename = `${safeFileName(poll.title)}.ics`;

  for (const email of attendeeEmails) {
    const ics = createCalendarInvite({
      poll,
      finalSlot,
      attendeeEmails: [email],
      baseUrl,
      organizerEmail: config.organizerEmail
    });
    const { text, html } = createInviteEmailContent({ poll, timeText, pollUrl });
    await sendResendEmail({
      config,
      to: email,
      subject,
      text,
      html,
      attachment: {
        filename,
        content: Buffer.from(ics, "utf8").toString("base64")
      },
      idempotencyKey: `invite-${poll.id}-${finalSlot.id}-${hashToken(email).slice(0, 16)}`
    });
  }

  return { count: attendeeEmails.length };
}

async function sendResendEmail({ config, to, subject, text, html, attachment, idempotencyKey }) {
  const apiResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey
    },
    body: JSON.stringify({
      from: config.from,
      to: [to],
      subject,
      text,
      html,
      attachments: [attachment]
    })
  });

  if (!apiResponse.ok) {
    const textBody = await apiResponse.text();
    const error = new Error(parseResendErrorMessage(apiResponse.status, textBody));
    error.status = apiResponse.status;
    throw error;
  }

  return apiResponse.json().catch(() => ({}));
}

function parseResendErrorMessage(status, textBody) {
  try {
    const payload = JSON.parse(textBody);
    const message = payload.message || payload.error || payload.name;
    if (message) {
      return `Resend email delivery failed (${status}): ${message}`;
    }
  } catch (error) {
    // Fall through to the plain text response.
  }
  return `Resend email delivery failed (${status}): ${cleanString(textBody, 500) || "Unknown delivery error"}`;
}

function getEmailDeliveryErrorMessage(error) {
  const message = cleanString(error?.message, 700);
  if (!message) {
    return "Could not send calendar invite email. Check the Render logs and Resend settings.";
  }
  if (/api[_ -]?key|unauthorized|invalid/i.test(message)) {
    return `${message}. Check RESEND_API_KEY in Render.`;
  }
  if (/domain|sender|from|verify|verified/i.test(message)) {
    return `${message}. Check that EMAIL_FROM uses a sender verified in Resend.`;
  }
  return message;
}

function createInviteEmailContent({ poll, timeText, pollUrl }) {
  const lines = [
    "Hi,",
    "",
    "The meeting has been confirmed.",
    "",
    `Topic: ${poll.title}`,
    `Time: ${timeText}`,
    poll.meetingUrl ? `Meeting link: ${poll.meetingUrl}` : null,
    "",
    "A calendar invite (.ics) is attached to this email. Open or accept it to add the meeting to your calendar.",
    "",
    `Poll results: ${pollUrl}`,
    "",
    "Thank you."
  ].filter((line) => line !== null);

  const html = `
    <p>Hi,</p>
    <p>The meeting has been confirmed.</p>
    <p>
      <strong>Topic:</strong> ${htmlEscape(poll.title)}<br>
      <strong>Time:</strong> ${htmlEscape(timeText)}${poll.meetingUrl ? `<br><strong>Meeting link:</strong> <a href="${htmlEscape(poll.meetingUrl)}">${htmlEscape(poll.meetingUrl)}</a>` : ""}
    </p>
    <p>A calendar invite (.ics) is attached to this email. Open or accept it to add the meeting to your calendar.</p>
    <p><a href="${htmlEscape(pollUrl)}">View poll results</a></p>
  `;

  return { text: lines.join("\n"), html };
}

function createCalendarInvite({ poll, finalSlot, attendeeEmails = [], baseUrl, organizerEmail }) {
  const start = new Date(finalSlot.startUtc);
  const end = new Date(start.getTime() + finalSlot.duration * 60000);
  const pollUrl = `${baseUrl}#poll=${encodeURIComponent(poll.id)}`;
  const description = [poll.agenda, poll.meetingUrl ? `Meeting link: ${poll.meetingUrl}` : "", `Poll: ${pollUrl}`]
    .filter(Boolean)
    .join("\n\n");

  return buildIcs([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GMT Rally//Meeting Poll//EN",
    "CALSCALE:GREGORIAN",
    attendeeEmails.length ? "METHOD:REQUEST" : "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${icsEscape(`${poll.id}@gmt-rally`)}`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${icsEscape(poll.title)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    poll.meetingUrl ? `LOCATION:${icsEscape(poll.meetingUrl)}` : "",
    poll.meetingUrl ? `URL:${icsEscape(poll.meetingUrl)}` : "",
    attendeeEmails.length ? `ORGANIZER;CN=${icsEscape(poll.creatorName || "GMT Rally")}:mailto:${icsEscape(organizerEmail)}` : "",
    ...attendeeEmails.map((email) => `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${icsEscape(email)}`),
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ]);
}

function formatMeetingTimeForEmail(poll, finalSlot) {
  const zone = poll.creator?.timeZone || "UTC";
  const start = new Date(finalSlot.startUtc);
  const end = new Date(start.getTime() + finalSlot.duration * 60000);
  return `${formatDateTimeInZone(start, zone)} - ${formatTimeInZone(end, zone)} (${zone}, ${formatGmtOffset(zone, start)})`;
}

function formatDateTimeInZone(date, timeZone) {
  try {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone
    }).format(date);
  } catch (error) {
    return date.toISOString();
  }
}

function formatTimeInZone(date, timeZone) {
  try {
    return new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone
    }).format(date);
  } catch (error) {
    return date.toISOString();
  }
}

function formatGmtOffset(timeZone, date) {
  try {
    const part = new Intl.DateTimeFormat("en", {
      timeZone,
      timeZoneName: "shortOffset"
    })
      .formatToParts(date)
      .find((item) => item.type === "timeZoneName");
    return part?.value || "GMT";
  } catch (error) {
    return "GMT";
  }
}

function extractEmailAddress(value) {
  const match = String(value || "").match(/<([^<>@\s]+@[^<>@\s]+\.[^<>@\s]+)>/);
  return cleanEmail(match?.[1] || value);
}

function htmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function makeCreatorKey(value) {
  return cleanCreatorName(value).toLowerCase();
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

function createToken() {
  return crypto.randomBytes(24).toString("base64url");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function isValidAdminToken(poll, token) {
  if (!poll.adminTokenHash || !token) return false;
  const expected = Buffer.from(poll.adminTokenHash, "hex");
  const actual = Buffer.from(hashToken(token), "hex");
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

async function canReadPrivateVoteFields(pollId, token) {
  if (!token) return false;
  const poll = await store.getPoll(pollId);
  return Boolean(poll && isValidAdminToken(poll, token));
}

function getRequestBaseUrl(request) {
  const host = cleanString(request.headers["x-forwarded-host"] || request.headers.host, 200) || `localhost:${PORT}`;
  const forwardedProto = cleanString(request.headers["x-forwarded-proto"], 20);
  const proto = forwardedProto || (/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host) ? "http" : "https");
  return `${proto}://${host}/`;
}

function buildIcs(lines) {
  return lines.filter(Boolean).flatMap(foldIcsLine).join("\r\n") + "\r\n";
}

function foldIcsLine(line) {
  const chunks = [];
  let remaining = line;
  while (remaining.length > 73) {
    chunks.push(remaining.slice(0, 73));
    remaining = ` ${remaining.slice(73)}`;
  }
  chunks.push(remaining);
  return chunks;
}

function formatIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function icsEscape(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function safeFileName(value) {
  return cleanString(value, 80).replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "") || "meeting";
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
