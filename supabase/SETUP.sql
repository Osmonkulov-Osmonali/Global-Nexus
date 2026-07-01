-- Global Nexus — ONE FILE SETUP (safe to run multiple times)
-- Paste this entire file in Supabase SQL Editor and click RUN.
-- Direct link:
-- https://supabase.com/dashboard/project/epldjzqnwozqqlqgnwuu/sql/new

create extension if not exists "pgcrypto";

create table if not exists public.speakers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  company text not null,
  topic text not null,
  photo_url text not null default '',
  country text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.speaker_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_role text not null,
  social_link text not null,
  topic text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  date text not null default '',
  location text not null default '',
  format text not null default 'online',
  link text not null default '',
  created_at timestamptz not null default now()
);

-- Speaker status: 'featured' (already interviewed) or 'upcoming' (expected)
alter table public.speakers add column if not exists status text not null default 'featured';

alter table public.speakers enable row level security;
alter table public.speaker_applications enable row level security;
alter table public.events enable row level security;

drop policy if exists "Speakers are publicly readable" on public.speakers;
drop policy if exists "Authenticated users can insert speakers" on public.speakers;
drop policy if exists "Authenticated users can update speakers" on public.speakers;
drop policy if exists "Authenticated users can delete speakers" on public.speakers;
drop policy if exists "Anyone can submit speaker applications" on public.speaker_applications;
drop policy if exists "Authenticated users can read applications" on public.speaker_applications;
drop policy if exists "Authenticated users can delete applications" on public.speaker_applications;
drop policy if exists "Events are publicly readable" on public.events;
drop policy if exists "Authenticated users can insert events" on public.events;
drop policy if exists "Authenticated users can update events" on public.events;
drop policy if exists "Authenticated users can delete events" on public.events;

create policy "Speakers are publicly readable"
  on public.speakers for select to anon, authenticated using (true);

create policy "Authenticated users can insert speakers"
  on public.speakers for insert to authenticated with check (true);

create policy "Authenticated users can update speakers"
  on public.speakers for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete speakers"
  on public.speakers for delete to authenticated using (true);

create policy "Anyone can submit speaker applications"
  on public.speaker_applications for insert to anon, authenticated with check (true);

create policy "Authenticated users can read applications"
  on public.speaker_applications for select to authenticated using (true);

create policy "Authenticated users can delete applications"
  on public.speaker_applications for delete to authenticated using (true);

create policy "Events are publicly readable"
  on public.events for select to anon, authenticated using (true);

create policy "Authenticated users can insert events"
  on public.events for insert to authenticated with check (true);

create policy "Authenticated users can update events"
  on public.events for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete events"
  on public.events for delete to authenticated using (true);

insert into public.speakers (name, role, company, topic, country, created_at)
select * from (values
  ('Sarah Chen', 'CEO', 'NovaStack', 'Scaling AI products from zero to enterprise', 'US', '2025-01-05'::timestamptz),
  ('Marcus Weber', 'Founder', 'FinBridge', 'Raising Series A in a downturn', 'DE', '2025-01-06'::timestamptz),
  ('Priya Sharma', 'CTO', 'CloudPulse', 'Building resilient infra at scale', 'IN', '2025-01-07'::timestamptz),
  ('James Okonkwo', 'Partner', 'Horizon VC', 'What investors look for in 2025', 'NG', '2025-01-08'::timestamptz),
  ('Elena Vasquez', 'VP Product', 'DataMesh', 'Finding product-market fit in 90 days', 'ES', '2025-01-09'::timestamptz),
  ('Kenji Tanaka', 'Founder', 'RoboFlow', 'Deep tech commercialization playbook', 'JP', '2025-01-10'::timestamptz),
  ('Amira Hassan', 'CMO', 'GrowthForge', 'Global go-to-market without a big budget', 'AE', '2025-01-11'::timestamptz),
  ('Lucas Ferreira', 'Head of Engineering', 'DevScale', 'Engineering culture in hypergrowth teams', 'BR', '2025-01-12'::timestamptz),
  ('Sophie Laurent', 'CEO', 'HealthNova', 'HealthTech expansion across borders', 'FR', '2025-01-13'::timestamptz),
  ('David Kim', 'Investor', 'Summit Capital', 'Term sheets founders should understand', 'KR', '2025-01-14'::timestamptz),
  ('Isabella Rossi', 'CPO', 'MobileFirst', 'Mobile product metrics that matter', 'IT', '2025-01-15'::timestamptz),
  ('Ahmed Al-Rashid', 'Founder', 'PropTech Global', 'PropTech and the future of real estate', 'SA', '2025-01-16'::timestamptz),
  ('Nina Petrov', 'CTO', 'SecureLayer', 'Cybersecurity for fast-growing startups', 'RU', '2025-01-17'::timestamptz),
  ('Tom Bradley', 'VP Sales', 'EnterpriseX', 'Enterprise sales from scratch', 'UK', '2025-01-18'::timestamptz),
  ('Yuki Nakamura', 'Founder', 'GameForge', 'Gamedev as a sustainable business', 'JP', '2025-01-19'::timestamptz),
  ('Fatima Diallo', 'CEO', 'EduLeap', 'EdTech monetization and retention', 'SN', '2025-01-20'::timestamptz),
  ('Oliver Schmidt', 'Head of Data', 'Analytics Pro', 'Data-driven decisions for CEOs', 'DE', '2025-01-21'::timestamptz),
  ('Maria Santos', 'Founder', 'AgriTech Labs', 'AgTech innovation in emerging markets', 'MX', '2025-01-22'::timestamptz),
  ('Ryan O''Connor', 'COO', 'LogiChain', 'Operational excellence in startups', 'IE', '2025-01-23'::timestamptz),
  ('Chloe Wang', 'Board Member', 'Corporate Ventures', 'Corporate innovation and intrapreneurship', 'SG', '2025-01-24'::timestamptz),
  ('Viktor Novak', 'CTO', 'CloudScale', 'Infrastructure at planetary scale', 'CZ', '2025-01-25'::timestamptz),
  ('Aisha Mohammed', 'CEO', 'FinTech Africa', 'Financial inclusion through technology', 'KE', '2025-01-26'::timestamptz),
  ('Daniel Park', 'Founder', 'TravelNexus', 'Solving the marketplace cold-start problem', 'KR', '2025-01-27'::timestamptz),
  ('Emma Wilson', 'CFO', 'UnitOps', 'Unit economics and financial modeling', 'AU', '2025-01-28'::timestamptz)
) as seed(name, role, company, topic, country, created_at)
where not exists (select 1 from public.speakers limit 1);

do $$
begin
  alter publication supabase_realtime add table public.speakers;
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.events;
exception
  when duplicate_object then null;
end $$;
