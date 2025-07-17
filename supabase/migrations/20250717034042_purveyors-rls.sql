-- Allow authenticated people to insert
create policy "Enable insert for authenticated users only"
  on "public"."purveyors"
  as PERMISSIVE
  for INSERT
  to authenticated
  with check (
    true
  );
