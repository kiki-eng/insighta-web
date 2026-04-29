# Insighta Labs+ Web Portal

Web interface for the Insighta Labs+ Profile Intelligence Platform.

## Setup

```bash
git clone https://github.com/kiki-eng/insighta-web.git
cd insighta-web
npm install
```

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://hng-stage0-backend-production-68c6.up.railway.app
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Page | Path | Description |
|------|------|-------------|
| Login | `/` | GitHub OAuth login |
| Auth Callback | `/auth/callback` | Handles OAuth redirect |
| Dashboard | `/dashboard` | Overview metrics |
| Profiles | `/profiles` | Filterable profiles list |
| Profile Detail | `/profiles/[id]` | Individual profile view |
| Search | `/search` | Natural language search |
| Account | `/account` | User info and logout |

## Authentication

- Uses HTTP-only cookies set by the backend
- Tokens are not accessible via JavaScript
- Protected routes redirect to login if no cookie present
- Auto-refresh on 401 responses

## Deployment

Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

Set `NEXT_PUBLIC_API_URL` in Vercel environment variables.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
