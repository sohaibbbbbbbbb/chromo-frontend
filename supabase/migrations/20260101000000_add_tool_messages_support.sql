-- Add 'tool' role to messages table
alter table public.messages 
  drop constraint messages_role_check;

alter table public.messages 
  add constraint messages_role_check 
  check (role in ('user', 'assistant', 'tool'));

-- Add optional tool_result column for storing tool execution results
alter table public.messages 
  add column tool_result jsonb;

