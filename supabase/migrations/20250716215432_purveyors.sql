-- Create the table
create table purveyors (
  id uuid primary key default uuid_generate_v4(),
  createdAt timestamptz default now(),
  updatedAt timestamptz default now(),
  purveyorName text not null unique,
  purveyorLink text
);

alter table purveyors enable row level security;

-- Allow everyone to select
create policy "everyone can select"
  on purveyors
  for select using (true);
