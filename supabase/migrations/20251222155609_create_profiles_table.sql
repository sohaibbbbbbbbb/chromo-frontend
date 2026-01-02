-- Create profiles table
create table public.profiles (
  id uuid primary key
    references auth.users(id)
    on delete cascade,
  full_name text,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can read own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);
