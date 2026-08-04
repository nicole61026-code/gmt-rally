const fs = require("fs/promises");
const path = require("path");

class JsonPollStore {
  constructor({ root }) {
    this.dataDir = path.join(root, "data");
    this.dbFile = path.join(this.dataDir, "polls.json");
    this.db = { polls: {} };
    this.saveQueue = Promise.resolve();
  }

  async init() {
    await fs.mkdir(this.dataDir, { recursive: true });
    try {
      this.db = JSON.parse(await fs.readFile(this.dbFile, "utf8"));
      if (!this.db || typeof this.db !== "object" || !this.db.polls) {
        this.db = { polls: {} };
      }
    } catch (error) {
      this.db = { polls: {} };
      await this.persist();
    }
  }

  async createPoll(poll) {
    this.db.polls[poll.id] = {
      ...poll,
      votes: {}
    };
    await this.persist();
    return this.getPayload(poll.id);
  }

  async getPoll(pollId) {
    return this.db.polls[pollId] || null;
  }

  async getPayload(pollId, options = {}) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;
    const { votes, ...publicPoll } = stripPrivatePollFields(poll);
    return {
      poll: publicPoll,
      votes: Object.values(votes || {})
        .map((vote) => (options.includePrivateVoteFields ? vote : stripPrivateVoteFields(vote)))
        .sort(sortVotesByName)
    };
  }

  async listPollsByCreatorKey(creatorKey) {
    return Object.values(this.db.polls)
      .filter((poll) => (poll.creatorKey || normalizeCreatorKey(poll.creatorName)) === creatorKey)
      .map((poll) => toCreatorPollSummary(poll, Object.keys(poll.votes || {}).length))
      .sort(sortPollSummaries);
  }

  async getVote(pollId, name) {
    const poll = await this.getPoll(pollId);
    return poll?.votes?.[name] || null;
  }

  async saveVote(pollId, vote) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;
    poll.votes[vote.name] = vote;
    poll.updatedAt = new Date().toISOString();
    await this.persist();
    return this.getPayload(pollId);
  }

  async updatePoll(pollId, updates) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;
    Object.assign(poll, updates, { updatedAt: new Date().toISOString() });
    await this.persist();
    return this.getPayload(pollId);
  }

  async deletePoll(pollId) {
    const poll = await this.getPoll(pollId);
    if (!poll) return false;
    delete this.db.polls[pollId];
    await this.persist();
    return true;
  }

  persist() {
    this.saveQueue = this.saveQueue.then(async () => {
      const tempFile = `${this.dbFile}.tmp`;
      await fs.writeFile(tempFile, JSON.stringify(this.db, null, 2), "utf8");
      await fs.rename(tempFile, this.dbFile);
    });
    return this.saveQueue;
  }
}

class SupabasePollStore {
  constructor({ supabaseUrl, serviceRoleKey }) {
    this.supabaseUrl = supabaseUrl?.replace(/\/+$/, "");
    this.serviceRoleKey = serviceRoleKey;
    this.pollTable = process.env.SUPABASE_POLL_TABLE || "gmt_rally_polls";
    this.voteTable = process.env.SUPABASE_VOTE_TABLE || "gmt_rally_votes";
  }

  async init() {
    if (!this.supabaseUrl || !this.serviceRoleKey) {
      throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required when DATABASE_PROVIDER=supabase.");
    }
  }

  async createPoll(poll) {
    const now = poll.createdAt || new Date().toISOString();
    await this.request(`/${this.pollTable}`, {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        id: poll.id,
        creator_name: poll.creatorName,
        creator_key: poll.creatorKey || normalizeCreatorKey(poll.creatorName),
        admin_token: poll.adminToken,
        poll,
        created_at: now,
        updated_at: now
      })
    });
    return this.getPayload(poll.id);
  }

  async getPoll(pollId) {
    const rows = await this.request(`/${this.pollTable}?id=eq.${encodeFilterValue(pollId)}&select=*`);
    const row = rows[0];
    if (!row) return null;
    return normalizePollRow(row);
  }

  async getPayload(pollId, options = {}) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;

    const rows = await this.request(`/${this.voteTable}?poll_id=eq.${encodeFilterValue(pollId)}&select=*`);
    return {
      poll: stripPrivatePollFields(poll),
      votes: rows
        .map(normalizeVoteRow)
        .map((vote) => (options.includePrivateVoteFields ? vote : stripPrivateVoteFields(vote)))
        .sort(sortVotesByName)
    };
  }

  async listPollsByCreatorKey(creatorKey) {
    const rows = await this.request(
      `/${this.pollTable}?creator_key=eq.${encodeFilterValue(creatorKey)}&select=*,${this.voteTable}(name)&order=created_at.desc`
    );
    return rows
      .map((row) => toCreatorPollSummary(normalizePollRow(row), Array.isArray(row[this.voteTable]) ? row[this.voteTable].length : 0))
      .sort(sortPollSummaries);
  }

  async getVote(pollId, name) {
    const rows = await this.request(
      `/${this.voteTable}?poll_id=eq.${encodeFilterValue(pollId)}&name=eq.${encodeFilterValue(name)}&select=*`
    );
    return rows[0] ? normalizeVoteRow(rows[0]) : null;
  }

  async saveVote(pollId, vote) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;

    const updatedAt = new Date().toISOString();
    await this.request(`/${this.voteTable}`, {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        poll_id: pollId,
        name: vote.name,
        vote,
        updated_at: updatedAt
      })
    });

    await this.request(`/${this.pollTable}?id=eq.${encodeFilterValue(pollId)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ updated_at: updatedAt })
    });

    return this.getPayload(pollId);
  }

  async updatePoll(pollId, updates) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;

    const updatedPoll = {
      ...poll,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.request(`/${this.pollTable}?id=eq.${encodeFilterValue(pollId)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        poll: updatedPoll,
        updated_at: updatedPoll.updatedAt
      })
    });

    return this.getPayload(pollId);
  }

  async deletePoll(pollId) {
    const poll = await this.getPoll(pollId);
    if (!poll) return false;
    await this.request(`/${this.pollTable}?id=eq.${encodeFilterValue(pollId)}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" }
    });
    return true;
  }

  async request(pathname, options = {}) {
    const response = await fetch(`${this.supabaseUrl}/rest/v1${pathname}`, {
      ...options,
      headers: {
        apikey: this.serviceRoleKey,
        Authorization: `Bearer ${this.serviceRoleKey}`,
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Supabase request failed (${response.status}): ${text}`);
    }

    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }
}

function createPollStore({ root }) {
  const provider = (process.env.DATABASE_PROVIDER || "json").toLowerCase();
  if (provider === "supabase") {
    return new SupabasePollStore({
      supabaseUrl: process.env.SUPABASE_URL,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    });
  }
  return new JsonPollStore({ root });
}

function normalizePollRow(row) {
  return {
    ...row.poll,
    creatorName: row.creator_name || row.poll.creatorName,
    creatorKey: row.creator_key || row.poll.creatorKey || normalizeCreatorKey(row.poll.creatorName),
    adminToken: row.admin_token || row.poll.adminToken,
    createdAt: row.created_at || row.poll.createdAt,
    updatedAt: row.updated_at || row.poll.updatedAt
  };
}

function stripPrivatePollFields(poll) {
  const { adminTokenHash, adminToken, creatorKey, ...publicPoll } = poll;
  return publicPoll;
}

function stripPrivateVoteFields(vote) {
  const { email, ...publicVote } = vote;
  return publicVote;
}

function normalizeVoteRow(row) {
  return {
    ...row.vote,
    updatedAt: row.updated_at || row.vote.updatedAt
  };
}

function sortVotesByName(a, b) {
  return a.name.localeCompare(b.name);
}

function sortPollSummaries(a, b) {
  return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
}

function toCreatorPollSummary(poll, voteCount) {
  return {
    id: poll.id,
    title: poll.title,
    creatorName: poll.creatorName,
    createdAt: poll.createdAt,
    updatedAt: poll.updatedAt,
    voteCount,
    adminToken: poll.adminToken || ""
  };
}

function normalizeCreatorKey(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function encodeFilterValue(value) {
  return encodeURIComponent(value).replace(/\./g, "%2E");
}

module.exports = {
  JsonPollStore,
  SupabasePollStore,
  createPollStore
};
