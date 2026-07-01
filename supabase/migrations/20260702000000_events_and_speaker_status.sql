-- Events table + speaker status ('featured' | 'upcoming')

alter table public.speakers add column if not exists status text not null default 'featured';

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

alter table public.events enable row level security;

create policy "Events are publicly readable"
  on public.events for select to anon, authenticated using (true);

create policy "Authenticated users can insert events"
  on public.events for insert to authenticated with check (true);

create policy "Authenticated users can update events"
  on public.events for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete events"
  on public.events for delete to authenticated using (true);

do $$
begin
  alter publication supabase_realtime add table public.events;
exception
  when duplicate_object then null;
end $$;
