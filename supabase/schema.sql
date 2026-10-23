-- Execute uma vez no SQL Editor do projeto yxgzsrvpvzpsxgzqxpsj.
-- O e-mail abaixo foi confirmado por Paulo para administrar o portfólio.
create table if not exists public.portfolio_entries (
  id uuid primary key default gen_random_uuid(),
  entry_type text not null check (entry_type in ('article', 'study')),
  title text not null check (char_length(title) between 1 and 120),
  category text not null check (char_length(category) between 1 and 60),
  body text not null check (char_length(body) between 1 and 20000),
  image_url text check (image_url is null or char_length(image_url) <= 2000),
  image_alt text check (image_alt is null or char_length(image_alt) <= 240),
  credit text check (credit is null or char_length(credit) <= 500),
  is_demo boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_entries_public_idx
  on public.portfolio_entries (entry_type, created_at desc)
  where is_published = true;

alter table public.portfolio_entries enable row level security;
grant select on public.portfolio_entries to anon, authenticated;
grant insert, update, delete on public.portfolio_entries to authenticated;

drop policy if exists "Public reads published entries" on public.portfolio_entries;
create policy "Public reads published entries"
  on public.portfolio_entries for select to anon, authenticated
  using (is_published = true);

drop policy if exists "Owner reads all entries" on public.portfolio_entries;
create policy "Owner reads all entries"
  on public.portfolio_entries for select to authenticated
  using ((select auth.jwt() ->> 'email') = 'leiteneto17@gmail.com');

drop policy if exists "Owner creates entries" on public.portfolio_entries;
create policy "Owner creates entries"
  on public.portfolio_entries for insert to authenticated
  with check ((select auth.jwt() ->> 'email') = 'leiteneto17@gmail.com');

drop policy if exists "Owner edits entries" on public.portfolio_entries;
create policy "Owner edits entries"
  on public.portfolio_entries for update to authenticated
  using ((select auth.jwt() ->> 'email') = 'leiteneto17@gmail.com')
  with check ((select auth.jwt() ->> 'email') = 'leiteneto17@gmail.com');

drop policy if exists "Owner deletes entries" on public.portfolio_entries;
create policy "Owner deletes entries"
  on public.portfolio_entries for delete to authenticated
  using ((select auth.jwt() ->> 'email') = 'leiteneto17@gmail.com');
