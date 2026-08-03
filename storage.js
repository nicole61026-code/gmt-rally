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

  async getPayload(pollId) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;
    const { votes, ...publicPoll } = poll;
    return {
      poll: publicPoll,
      votes: Object.values(votes || {}).sort(sortVotesByName)
    };
  }

  async saveVote(pollId, vote) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;
    poll.votes[vote.name] = vote;
    poll.updatedAt = new Date().toISOString();
    await this.persist();
    return this.getPayload(pollId);
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

  async getPayload(pollId) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;

    const rows = await this.request(`/${this.voteTable}?poll_id=eq.${encodeFilterValue(pollId)}&select=*`);
    return {
      poll,
      votes: rows.map(normalizeVoteRow).sort(sortVotesByName)
    };
  }

  async saveVote(pollId, vote) {
    const poll = await this.getPoll(pollId);
    if (!poll) return null;

    const updatedAt = new Date().toISOString();
    await this.request(`/${this.voteTable}?on_conflict=poll_id,name`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
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
    createdAt: row.created_at || row.poll.createdAt,
    updatedAt: row.updated_at || row.poll.updatedAt
  };
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

function encodeFilterValue(value) {
  return encodeURIComponent(value).replace(/\./g, "%2E");
}

module.exports = {
  JsonPollStore,
  SupabasePollStore,
  createPollStore
};
