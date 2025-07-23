create table reviews (
  id uuid primary key default uuid_generate_v4(),
  review text,
  stars int,
  offeringId uuid references offerings(id),
  reviewerId uuid NOT NULL references profiles,
  createdAt timestamptz default now(),
  updatedAt timestamptz default now()
);

alter table reviews enable row level security;

-- Allow authenticated people to insert
create policy "Enable insert for authenticated users only"
  on "public"."reviews"
  as PERMISSIVE
  for INSERT
  to authenticated
  with check (
    true
  );

-- Allow all people to select
create policy "everyone can select reviews"
  on "public"."reviews"
  to public
  using (
    true
  );
