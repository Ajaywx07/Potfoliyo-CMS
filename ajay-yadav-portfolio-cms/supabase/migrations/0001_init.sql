-- =========================================================
-- Ajay Yadav Portfolio + CMS — Initial Schema
-- Run this in the Supabase SQL editor, or via `supabase db push`.
-- =========================================================

create extension if not exists "uuid-ossp";

-- ---------- Roles / Profiles (extends Supabase auth.users) ----------
create type user_role as enum ('super_admin', 'editor', 'author');

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'author',
  display_name text,
  created_at timestamptz not null default now()
);

-- ---------- Singleton site profile ----------
create table if not exists profile (
  id int primary key default 1 check (id = 1),
  name text not null default 'Ajay Yadav',
  headline text,
  bio text,
  avatar_url text,
  resume_url text,
  socials jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
insert into profile (id) values (1) on conflict (id) do nothing;

-- ---------- Journey ----------
create table if not exists journey_items (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  date text,
  icon text,
  display_order int not null default 0,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Skills ----------
create table if not exists skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  icon text,
  level int not null check (level between 0 and 100),
  category text,
  description text,
  display_order int not null default 0,
  status text not null default 'published' check (status in ('draft','published')),
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Projects ----------
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  short_description text,
  full_description text,
  category text not null check (category in ('web','ai','python','javascript','automation','other')),
  technologies jsonb not null default '[]',
  tags jsonb not null default '[]',
  features jsonb not null default '[]',
  demo_url text,
  github_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  featured boolean not null default false,
  start_date date,
  end_date date,
  display_order int not null default 0,
  featured_image text,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_images (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,
  url text not null,
  alt_text text,
  display_order int not null default 0
);

-- ---------- AI Projects (extends project shape) ----------
create table if not exists ai_projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  concept text,
  technology jsonb not null default '[]',
  features jsonb not null default '[]',
  status text not null default 'draft' check (status in ('draft','published')),
  production_ready boolean not null default false,
  future_plans text,
  featured_image text,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Services ----------
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  icon text,
  display_order int not null default 0,
  status text not null default 'published' check (status in ('draft','published')),
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Experience ----------
create table if not exists experience (
  id uuid primary key default uuid_generate_v4(),
  org text not null,
  role text not null,
  description text,
  start_date date,
  end_date date,
  is_current boolean not null default false,
  responsibilities jsonb not null default '[]',
  skills_used jsonb not null default '[]',
  display_order int not null default 0,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Education ----------
create table if not exists education (
  id uuid primary key default uuid_generate_v4(),
  institution text not null,
  course text not null,
  subject text,
  start_date date,
  end_date date,
  status text,
  description text,
  display_order int not null default 0,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Certificates ----------
create table if not exists certificates (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  issuer text,
  date date,
  file_url text,
  credential_id text,
  verify_url text,
  description text,
  featured boolean not null default false,
  status text not null default 'published' check (status in ('draft','published')),
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Blog: categories, tags, posts ----------
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique
);

create table if not exists tags (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique
);

create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb, -- Tiptap JSON document
  category_id uuid references categories(id) on delete set null,
  author_id uuid references auth.users(id),
  featured_image text,
  status text not null default 'draft' check (status in ('draft','published','scheduled')),
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  seo_title text,
  seo_description text,
  og_image text,
  reading_time_minutes int,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists post_tags (
  post_id uuid not null references posts(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- ---------- Achievements ----------
create table if not exists achievements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  date date,
  icon text,
  display_order int not null default 0,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Tools ----------
create table if not exists tools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  icon text,
  description text,
  display_order int not null default 0,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Gallery ----------
create table if not exists gallery_items (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  caption text,
  alt_text text,
  category text,
  featured boolean not null default false,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Media library ----------
create table if not exists media (
  id uuid primary key default uuid_generate_v4(),
  filename text not null,
  url text not null,
  type text not null,
  size int,
  alt_text text,
  caption text,
  category text,
  uploaded_at timestamptz not null default now()
);

-- ---------- Testimonials ----------
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text,
  photo_url text,
  review text not null,
  rating int check (rating between 1 and 5),
  status text not null default 'draft' check (status in ('draft','published')),
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Contact messages (never public) ----------
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);

-- ---------- Settings (key/value) ----------
create table if not exists settings (
  key text primary key,
  value jsonb not null
);

-- ---------- Activity log ----------
create table if not exists activity_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  action text not null,
  target_type text,
  target_id uuid,
  description text not null,
  created_at timestamptz not null default now()
);

-- =========================================================
-- Row Level Security
-- =========================================================

alter table projects enable row level security;
alter table ai_projects enable row level security;
alter table skills enable row level security;
alter table services enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table certificates enable row level security;
alter table posts enable row level security;
alter table achievements enable row level security;
alter table tools enable row level security;
alter table gallery_items enable row level security;
alter table testimonials enable row level security;
alter table journey_items enable row level security;
alter table messages enable row level security;
alter table settings enable row level security;
alter table activity_logs enable row level security;

-- Public read: only published, non-deleted rows
create policy "Public can read published projects" on projects
  for select using (status = 'published' and deleted_at is null);

create policy "Public can read published posts" on posts
  for select using (status = 'published' and deleted_at is null);

create policy "Public can read published skills" on skills
  for select using (status = 'published' and deleted_at is null);

create policy "Public can read published services" on services
  for select using (status = 'published' and deleted_at is null);

create policy "Public can read published certificates" on certificates
  for select using (status = 'published' and deleted_at is null);

create policy "Public can read published testimonials" on testimonials
  for select using (status = 'published' and deleted_at is null);

create policy "Public can read journey items" on journey_items
  for select using (deleted_at is null);

create policy "Public can read experience" on experience
  for select using (deleted_at is null);

create policy "Public can read education" on education
  for select using (deleted_at is null);

create policy "Public can read achievements" on achievements
  for select using (deleted_at is null);

create policy "Public can read tools" on tools
  for select using (deleted_at is null);

create policy "Public can read gallery" on gallery_items
  for select using (deleted_at is null);

-- Authenticated (admin) full access — writes always go through /api/* routes
-- using the service-role key, but this policy allows authenticated reads of
-- drafts directly from Server Components too.
create policy "Authenticated full access on projects" on projects
  for all using (auth.role() = 'authenticated');
create policy "Authenticated full access on posts" on posts
  for all using (auth.role() = 'authenticated');
create policy "Authenticated full access on skills" on skills
  for all using (auth.role() = 'authenticated');

-- messages: NO public select policy at all — only service role can read.
-- settings / activity_logs: same — admin (service role) only.

comment on table messages is 'Contact form submissions. Intentionally has no public SELECT policy.';
