# Global Nexus

A premium media platform and forum with a mission to interview and feature **1,000 global leaders, founders, and investors** in IT and startup business.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (premium dark mode)
- **Lucide React** (icons)
- **Framer Motion** (animations)
- **Supabase** (Postgres, Auth, Realtime) with localStorage fallback

## Features

- **Hero** — Animated `[ 0000 / 1000 ]` counter, CTAs, speaker application modal
- **The Nexus Wall** — Responsive speaker gallery with hover effects
- **Admin Panel** (`/admin-panel`) — Add/delete speakers, review applications
- **Supabase Auth** — Protects admin when env vars are configured
- **Speaker applications** — Saved to Supabase (or localStorage offline)

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin dashboard: [http://localhost:3000/admin-panel](http://localhost:3000/admin-panel).

Without Supabase env vars, the app runs in **local mode** (localStorage, no admin login).

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy URL and publishable key into `.env.local`
3. Run the migration in **SQL Editor** or via CLI:

   ```bash
   supabase db push
   ```

   Migration file: `supabase/migrations/20250609000000_initial_schema.sql`

4. Create an admin user in **Authentication → Users → Add user**
5. Restart dev server — `/admin-panel` will require login

### Database tables

| Table | Purpose |
|-------|---------|
| `speakers` | Featured leaders on the Nexus Wall |
| `speaker_applications` | Submissions from "Become a Speaker" modal |

RLS policies: public read on speakers, authenticated CRUD on speakers, public insert on applications, authenticated read/delete on applications.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production |
| `npm run lint` | ESLint |
