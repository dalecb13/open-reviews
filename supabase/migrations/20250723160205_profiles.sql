create table profiles (
  id uuid references auth.users not null primary key,
  createdAt timestamp with time zone,
  updatedAt timestamp with time zone,
  username text,
  email text,
  firstName text,
  lastName text,
  avatarUrl text,
  isAdmin boolean not null default false,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/database/postgres/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile."
  on profiles
  for insert
  to authenticated
  with check (
    (select auth.uid()) = id
  );

create policy "Users can update own profile."
  on profiles
  for update
  to authenticated
  using (
    (select auth.uid()) = id
  );

-- This trigger automatically creates a profile entry when a new user
-- signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers
-- for more details.
create function public.handle_new_user()
returns trigger set search_path = ''
as $$
begin
  insert into public.profiles (id, firstName, lastName, avatarUrl)
  values (new.id, new.raw_user_meta_data->>'firstName', new.raw_user_meta_data->>'lastName', new.raw_user_meta_data->>'avatarUrl');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
  
-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');
  
  -- Set up access controls for storage.
  -- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
  create policy "Avatar images are publicly accessible."
    on storage.objects
    for select using (bucket_id = 'avatars');
    
  create policy "Anyone can upload an avatar."
    on storage.objects
    for insert
    with check (bucket_id = 'avatars');
    
  create policy "Anyone can update their own avatar."
    on storage.objects
    for update
    using ((select auth.uid()) = owner)
    with check (bucket_id = 'avatars');
