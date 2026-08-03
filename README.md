# GMT Rally

A bilingual meeting time poll app with country-first time zone selection, GMT display, and realtime vote aggregation.

## Run

```bash
npm start
```

Then open:

```text
http://127.0.0.1:4173/
```

## How Sync Works

- `server.js` serves the website and API.
- Polls are created with `POST /api/polls`.
- Votes are submitted with `POST /api/polls/:id/votes`.
- Results update live through `GET /api/polls/:id/events` using Server-Sent Events.
- Runtime data is stored in `data/polls.json`.

The app still has a static offline fallback if the backend is unavailable, but realtime aggregation requires running `server.js`.

## Cloud Database

This project supports two storage providers:

- Local development: `DATABASE_PROVIDER=json` or no `DATABASE_PROVIDER`
- Production: `DATABASE_PROVIDER=supabase`

For Supabase:

1. Create a Supabase project.
2. Open the SQL editor and run `supabase-schema.sql`.
3. Configure these environment variables on the server host:

```text
DATABASE_PROVIDER=supabase
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-side-secret-or-service-role-key
```

Keep `SUPABASE_SERVICE_ROLE_KEY` on the backend only. Do not put a Supabase secret or service-role key in frontend code.

## Public Deployment

This app is a Node web service. Render, Railway, Fly.io, or any Node host that supports long-running HTTP connections can run it.

The included `render.yaml` is ready for Render Blueprints:

- Build command: `npm install`
- Start command: `npm start`
- Runtime env vars: see `.env.example`

After deploy, share links will use the public host:

```text
https://your-app.onrender.com/#poll=poll_...
```
