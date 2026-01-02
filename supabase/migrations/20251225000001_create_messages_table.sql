-- Create messages table
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  "order" integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to auto-increment order per project
create or replace function public.set_message_order()
returns trigger as $$
begin
  if new."order" is null then
    select coalesce(max("order"), 0) + 1
    into new."order"
    from public.messages
    where project_id = new.project_id;
  end if;
  return new;
end;
$$ language plpgsql;

-- Create trigger to set order before insert
create trigger set_message_order_trigger
  before insert on public.messages
  for each row
  execute function public.set_message_order();

-- Create index for faster queries
create index messages_project_id_idx on public.messages(project_id);
create index messages_order_idx on public.messages(project_id, "order");
