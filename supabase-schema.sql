create table if not exists public.gmt_rally_polls (
  id text primary key,
  poll jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gmt_rally_votes (
  poll_id text not null references public.gmt_rally_polls(id) on delete cascade,
  name text not null,
  vote jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (poll_id, name)
);

create index if not exists gmt_rally_votes_poll_id_idx
  on public.gmt_rally_votes (poll_id);

alter table public.gmt_rally_polls enable row level security;
alter table public.gmt_rally_votes enable row level security;

-- The Node backend uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- Do not expose that key in frontend code.
