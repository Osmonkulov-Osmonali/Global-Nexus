# Global Nexus

A premium media platform and forum with a mission to interview and feature **1,000 global leaders, founders, and investors** in IT and startup business.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (premium dark mode)
- **Lucide React** (icons)
- **Framer Motion** (animations)
- **localStorage** data layer (Supabase/Prisma-ready)

## Features

- **Hero** — Animated `[ 0000 / 1000 ]` counter, CTAs, speaker application modal
- **The Nexus Wall** — Responsive speaker gallery with hover effects
- **Admin Panel** (`/admin-panel`) — Add/delete speakers; updates counter and wall in real time

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin dashboard: [http://localhost:3000/admin-panel](http://localhost:3000/admin-panel).

## Data Layer

Speaker data lives in `lib/storage.ts`. Swap `getSpeakers` / `saveSpeakers` for Supabase or Prisma when ready — the `SpeakersContext` API stays the same.

## Scripts

| Command       | Description          |
|---------------|----------------------|
| `npm run dev` | Development server   |
| `npm run build` | Production build   |
| `npm run start` | Serve production   |
| `npm run lint` | ESLint              |
