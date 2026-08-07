-- Supabase setup for Sermons & Special Events content manager
-- Run this SQL in the Supabase SQL editor.

-- Create the public sermons table if it does not already exist.
create table if not exists public.sermons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  passage text,
  speaker text,
  body text,
  video_link text,
  published boolean default false not null,
  created_by uuid,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Ensure any existing sermons table has the necessary columns.
alter table if exists public.sermons
  add column if not exists passage text,
  add column if not exists speaker text,
  add column if not exists body text,
  add column if not exists video_link text,
  add column if not exists published boolean default false not null,
  add column if not exists created_by uuid,
  add column if not exists created_at timestamp with time zone default now() not null,
  add column if not exists updated_at timestamp with time zone default now() not null;

-- Create the special_events table.
create table if not exists public.special_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  event_type text not null,
  event_date date not null,
  start_time time,
  end_time time,
  location text not null,
  description text,
  photo_paths text[] default '{}',
  published boolean default false not null,
  created_by uuid,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Enable row level security and create policies.
alter table public.sermons enable row level security;
drop policy if exists "Public published sermons" on public.sermons;
create policy "Public published sermons" on public.sermons
  for select using (published);
drop policy if exists "Authenticated manage sermons" on public.sermons;
create policy "Authenticated manage sermons" on public.sermons
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table public.special_events enable row level security;
drop policy if exists "Public published events" on public.special_events;
create policy "Public published events" on public.special_events
  for select using (published);
drop policy if exists "Authenticated manage special events" on public.special_events;
create policy "Authenticated manage special events" on public.special_events
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Create bucket-specific storage policies for special event photos.
drop policy if exists "Public view special event photos" on storage.objects;
create policy "Public view special event photos" on storage.objects
  for select using (bucket_id = 'special-event-photos');
drop policy if exists "Authenticated manage special event photos" on storage.objects;
create policy "Authenticated manage special event photos" on storage.objects
  for all using (bucket_id = 'special-event-photos' and auth.role() = 'authenticated')
  with check (bucket_id = 'special-event-photos' and auth.role() = 'authenticated');

-- Create a public storage bucket for special event photos.
insert into storage.buckets (id, name, public)
values ('special-event-photos', 'special-event-photos', true)
on conflict (id) do update set public = excluded.public;
