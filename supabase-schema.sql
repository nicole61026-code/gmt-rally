create table if not exists public.gmt_rally_polls (
  id text primary key,
  creator_name text,
  creator_key text,
  admin_token text,
  poll jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gmt_rally_polls
  add column if not exists creator_name text,
  add column if not exists creator_key text,
  add column if not exists admin_token text;

create table if not exists public.gmt_rally_votes (
  poll_id text not null references public.gmt_rally_polls(id) on delete cascade,
  name text not null,
  vote jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (poll_id, name)
);

create index if not exists gmt_rally_votes_poll_id_idx
  on public.gmt_rally_votes (poll_id);

create index if not exists gmt_rally_polls_creator_key_idx
  on public.gmt_rally_polls (creator_key);

alter table public.gmt_rally_polls enable row level security;
alter table public.gmt_rally_votes enable row level security;

-- The Node backend uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- Do not expose that key in frontend code.
-- admin_token is used by the backend to rebuild creator management links.
