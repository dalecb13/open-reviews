create table offerings (
  id uuid primary key default uuid_generate_v4(),
  offeringName varchar,
  offeringDescription varchar,

  purveyorId uuid references purveyors(id),
  
  createdAt timestamptz default now(),
  updatedAt timestamptz default now()
);

alter table offerings enable row level security;

-- Allow authenticated people to insert
create policy "Enable insert for authenticated users only"
  on "public"."offerings"
  as PERMISSIVE
  for INSERT
  to authenticated
  with check (
    true
  );

-- Allow all people to select
create policy "everyone can select offerings"
  on "public"."offerings"
  to public
  using (
    true
  );
