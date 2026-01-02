-- Add is_favourite column to palettes table
alter table palettes add column is_favourite int not null default 0;
