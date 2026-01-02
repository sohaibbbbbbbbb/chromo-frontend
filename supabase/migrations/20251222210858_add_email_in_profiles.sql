-- Add email column
alter table public.profiles
add column email text;

-- Backfill email for existing users
update public.profiles p
set email = u.email
from auth.users u
where u.id = p.id;

-- Optional: enforce uniqueness
create unique index profiles_email_unique
on public.profiles (email);