# Ajay Yadav — Portfolio + CMS: Architecture Plan (Phase 1)

## 1. Tech Stack (final decision + why)

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | **Next.js 14 (App Router, TypeScript)** | SSR/SSG for SEO, file-based routing fits 20-page sitemap, image optimization built-in |
| Styling | **Tailwind CSS + CSS variables** | Fast, matches "theme settings via CSS variables" requirement |
| Backend/API | **Next.js Route Handlers** (no separate server) | Keeps one deployable unit, less to maintain |
| Database | **Supabase (Postgres)** | Free tier, relational (matches your schema), row-level security for admin-only tables |
| Auth | **Supabase Auth** (email/password, hashed, server-side sessions) | Real auth, not `if (password === "123456")` |
| File/media storage | **Supabase Storage** | Signed URLs, size/type validation, buckets for images vs. docs |
| Rich text editor (blog) | **Tiptap** | Clean, extensible, no vendor lock-in |
| Deployment | **Vercel** (frontend+API) + Supabase (managed DB/auth/storage) | Free tiers exist; I'll flag exact limits below, not "free forever" |
| Analytics | **Plausible or Vercel Analytics** (privacy-conscious, no invented data) | Opt-in, no cookie banners needed |

**Free-tier honesty check:** Supabase free tier pauses projects after 7 days of inactivity and caps DB size (~500MB) and storage (~1GB). Vercel free tier caps bandwidth/build minutes. Fine for a personal portfolio; you'd upgrade only if traffic grows significantly.

## 2. High-Level Architecture

```
Browser (public visitor)          Browser (admin, you)
        │                                  │
        ▼                                  ▼
   Next.js App Router  ◄──────── Supabase Auth (session cookie)
   ├─ Public pages (SSG/ISR)              │
   ├─ /admin/* (protected, SSR + middleware)
   └─ /api/* route handlers ──► Supabase Postgres (RLS enforced)
                              ──► Supabase Storage (media)
```

- Public pages are statically generated/revalidated (fast, SEO-friendly).
- `/admin/*` routes are protected by middleware checking a valid Supabase session; unauthenticated requests redirect to `/admin/login`.
- All writes go through server-side Route Handlers — never direct client-to-DB writes for admin actions, even though Supabase allows it, so we keep validation centralized.

## 3. Sitemap (20 public pages + system pages)

`/`, `/about`, `/journey`, `/skills`, `/web-development`, `/projects`, `/projects/[slug]`, `/ai-projects`, `/automation`, `/programming`, `/blogger-seo`, `/portfolio`, `/services`, `/experience`, `/education`, `/certificates`, `/blog`, `/blog/[slug]`, `/achievements`, `/tools`, `/gallery`, `/contact`
Plus: `/404`, `/500`, `/admin/*` (dashboard, login).

## 4. Folder Structure

```
portfolio-cms/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  # Home
│   │   ├── about/page.tsx
│   │   ├── journey/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── web-development/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[slug]/page.tsx
│   │   ├── ai-projects/page.tsx
│   │   ├── automation/page.tsx
│   │   ├── programming/page.tsx
│   │   ├── blogger-seo/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── services/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── education/page.tsx
│   │   ├── certificates/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── tools/page.tsx
│   │   ├── gallery/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── layout.tsx                # protected shell (sidebar/nav)
│   │   ├── page.tsx                  # overview/stats
│   │   ├── projects/, blog/, skills/, services/, experience/,
│   │   │   education/, certificates/, achievements/, tools/,
│   │   │   gallery/, media/, messages/, testimonials/,
│   │   │   seo/, theme/, settings/, activity-logs/, trash/
│   ├── api/
│   │   ├── auth/…  projects/…  posts/…  media/…  contact/…
│   ├── sitemap.ts / robots.ts
│   └── layout.tsx
├── components/
│   ├── ui/ (Button, Card, Modal, Toast, Pagination, EmptyState…)
│   ├── layout/ (Header, Footer, MobileMenu)
│   └── sections/ (Hero, SkillCard, ProjectCard, BlogCard…)
├── lib/
│   ├── supabase/ (client.ts, server.ts, middleware.ts)
│   ├── validation/ (zod schemas per content type)
│   └── utils/
├── middleware.ts                     # admin route protection
├── supabase/
│   ├── migrations/                   # SQL schema below
│   └── seed.sql
├── public/ (favicon, manifest.json, robots.txt)
├── .env.local.example
└── README.md
```

## 5. Database Schema (Postgres / Supabase)

Core tables (all with `id uuid`, `created_at`, `updated_at`; content tables also get `status` enum `draft|published`, `display_order int`, `deleted_at` for soft-delete/trash):

- **users** — managed by Supabase Auth; `profiles` table extends it with `role` (`super_admin|editor|author`)
- **profile** — singleton: name, headline, bio, avatar_url, resume_url, socials(jsonb)
- **journey_items** — title, description, date, icon, order
- **skills** — name, icon, level(int 0-100, labeled "self-assessed"), category, description, order, status
- **projects** — name, slug, short/full description, category, tags(jsonb), technologies(jsonb), demo_url, github_url, status(draft/published), start_date, end_date, featured(bool), order
- **project_images** — project_id FK, url, alt_text, order
- **ai_projects** — extends project shape + `future_plans`, `production_ready`(bool, default false)
- **services** — title, description, icon, order, status
- **experience** — org, role, description, start_date, end_date, is_current, responsibilities(jsonb)
- **education** — institution, course, subject, start_date, end_date, status, description
- **certificates** — title, issuer, date, file_url, credential_id, verify_url, featured, status
- **posts** (blog) — title, slug, excerpt, content(rich text/JSON), category_id, author_id, featured_image, status, published_at, seo_title, seo_description, og_image
- **categories**, **tags**, **post_tags** (join table)
- **achievements** — title, description, date, icon
- **tools** — name, icon, description, order
- **gallery_items** — url, caption, alt_text, category, featured
- **media** — filename, url, type, size, alt_text, caption, category, uploaded_at
- **testimonials** — name, role, photo_url, review, rating, status
- **messages** (contact submissions) — name, email, subject, message, status(new/read/replied/archived), created_at — **never exposed to public API**
- **settings** — key/value jsonb (site name, logo, theme colors, socials, footer text…)
- **activity_logs** — user_id, action, target_type, target_id, description, created_at (no secrets logged)

Row-Level Security: public tables → `SELECT` allowed only where `status = 'published'` and `deleted_at IS NULL`; all `INSERT/UPDATE/DELETE` restricted to authenticated admin roles. `messages` table has no public `SELECT` policy at all.

## 6. Admin Dashboard Structure

Sidebar sections mirror section 5 of your spec exactly: Overview → Profile → About → Journey → Skills → Projects → AI Projects → Automation → Services → Experience → Education → Certificates → Blog → Achievements → Tools → Gallery → Media Library → Messages → Testimonials → SEO → Theme → Settings → Activity Logs → Trash.

Every content type gets a shared **CRUD table pattern**: search bar, status filter, sort, bulk publish/unpublish, edit drawer, soft-delete to Trash → restore or permanently delete.

## 7. Security Architecture

- Supabase Auth (bcrypt-hashed passwords, server-managed sessions, no client-stored credentials)
- `middleware.ts` blocks any `/admin` request without a valid session → redirect to `/admin/login`
- Rate limiting on login (Supabase built-in + optional Upstash rate limiter on `/api/auth/*`)
- Zod validation on every API route, server-side, before DB writes
- File uploads: MIME-type allowlist (images: jpg/png/webp/gif, docs: pdf only), max size enforced server-side, stored in Supabase Storage (not executable paths)
- CSRF mitigated via same-site cookies + Next.js server actions' built-in origin checks
- All secrets (`SUPABASE_SERVICE_ROLE_KEY`, etc.) stay in `.env.local`, never shipped to client bundle
- RLS as the last line of defense even if API validation is bypassed

## 8. Feature List
Matches sections 4–39 of your spec: 20 public pages, full CRUD admin, media manager, blog editor, project editor, homepage section toggling, theme/dark-light mode, global search, contact inbox, testimonials, trash + soft delete, activity log, PWA-ready manifest, multi-language-ready (en/hi) i18n folder structure (content not pre-translated), analytics integration point.

## 9. Development Phases (maps to your Steps 1–18)
1. Repo scaffold + Supabase project + env config
2. DB schema migration + RLS policies
3. Auth (login/logout/session/middleware)
4. Design system (Tailwind theme tokens, typography, components)
5. Shared components (Header, Footer, cards, modals…)
6. Public pages — static content first (Home, About, Journey)
7. Projects system (list, detail, filters)
8. Blog/CMS (editor, listing, SEO metadata)
9. Admin dashboard shell + CRUD screens
10. Wire DB (replace placeholder data)
11. Media upload flow
12. SEO (sitemap.xml, robots.txt, OG tags, structured data)
13. Security hardening pass
14. Responsive QA pass (phone/tablet/desktop)
15. Full test pass against your checklist (section 45)
16. Bug fixes
17. Deployment (Vercel + Supabase prod config)
18. README + handover docs
