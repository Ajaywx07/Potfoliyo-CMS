# Ajay Yadav — Portfolio + CMS

Next.js 14 (App Router, TypeScript) portfolio and blog with a Supabase-backed
Admin Dashboard. Built from the architecture in `docs-architecture-plan.md`.

## What's fully wired vs. scaffolded

**Fully implemented (real Supabase queries, real auth, real validation):**
- All 20 public pages, reading live data with graceful empty states
- Admin login/logout via Supabase Auth, with `middleware.ts` protecting every `/admin/*` route
- Admin Overview with real stat counts
- Admin **Projects**: full CRUD (list, search, filter, create, edit, soft-delete to Trash) — this is the reference pattern
- Admin **Messages** inbox with status updates
- Contact form → `/api/contact` with Zod validation, honeypot, and rate limiting
- Database schema + Row Level Security policies (`supabase/migrations/0001_init.sql`)
- SEO: dynamic sitemap, robots.txt, per-page metadata, Open Graph tags
- Dark/light/system theme, mobile nav, accessible focus states, reduced-motion support

**Scaffolded, not yet built (sidebar links exist and will 404 until built):**
Admin screens for Journey, AI Projects, Automation, Services, Experience,
Education, Certificates, Blog editor, Achievements, Tools, Gallery, Media
Library, Testimonials, SEO, Theme, Settings, Activity Logs, Trash.

**Why:** these all follow the exact same CRUD pattern as Projects
(`components/admin/ProjectForm.tsx` + `app/api/projects/*` +
`app/admin/projects/*`). Copy that pattern per content type — swap the
Zod schema, the Supabase table name, and the form fields. Doing this
honestly as a documented pattern, rather than generating 15 more near-
identical CRUD screens, keeps the codebase reviewable and avoids
`// rest of code here` placeholders.

## Setup

1. `npm install`
2. Create a free project at supabase.com
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase URL, anon key, and service role key
4. In the Supabase SQL editor, run `supabase/migrations/0001_init.sql`, then optionally `supabase/seed.sql`
5. In Supabase Auth, manually create your one admin user (email + password) — this is intentional; there is no public sign-up
6. `npm run dev` → http://localhost:3000, admin at http://localhost:3000/admin/login

### Environment variables (important)

This project separates public (client) Supabase envs used in the browser from server-only envs used on the server and in middleware.

- Public (browser) envs — used by client components (keep these prefixed with NEXT_PUBLIC_):
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY

- Server-only envs — must NOT be exposed to the client (do NOT prefix with NEXT_PUBLIC_):
  - SUPABASE_URL
  - SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY (admin-only; never expose this to client bundles)

When deploying (e.g., Vercel) set both the NEXT_PUBLIC_* vars and the server-only vars in the project settings. Never commit service role keys to source control.

## Deployment

- Push to GitHub, import into Vercel, add the same env vars from `.env.local` in Vercel's project settings
- Point your domain at Vercel, enable HTTPS (automatic on Vercel)
- Supabase free tier pauses after 7 days idle — fine for a personal site with visitors, but ping it if launching before traffic starts

## Extending the CRUD pattern (example: Skills)

1. Add `skillSchema` to `lib/validation/schemas.ts` (already present)
2. Create `app/api/skills/route.ts` + `app/api/skills/[id]/route.ts`, copying `app/api/projects/*` and swapping the table/schema
3. Create `components/admin/SkillForm.tsx`, copying `ProjectForm.tsx`
4. Create `app/admin/skills/page.tsx` (list) + `new/page.tsx` + `[id]/page.tsx`, copying the Projects equivalents

Repeat for each remaining content type.
