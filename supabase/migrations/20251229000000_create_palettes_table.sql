-- Create palettes table
create table palettes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  version int not null,
  colors jsonb not null,
  created_at timestamp default now()
);

-- Add index on project_id for faster lookups
create index palettes_project_id_idx on palettes(project_id);

-- Add index on version for sorting
create index palettes_version_idx on palettes(version);
