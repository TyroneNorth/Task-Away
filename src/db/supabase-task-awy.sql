


-- Create a table for public "profiles"
-- profiles can have many categories
create table profiles (
  id uuid unique references auth.users not null,
  updated_at date,
  full_name text,
  email text unique,
  avatar_url text,
  website text,
  bio text,
  primary key (id),
  unique(email)
);

alter table profiles enable row level security;


-- Create a table for private "categories"
-- categories can have many tasks
CREATE TABLE categories (
  id uuid unique references profiles not null,
  name text not null,

  -- foreign key to profile
  primary key (id),
  unique(name)
);



-- Create a table for private "tasks"
CREATE TABLE tasks (
  id bigint not null,
  user_id uuid references auth.users primary key,
  category_id uuid references categories primary key,
  title text,
  content text,
  is_completed boolean default false not null,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null

  -- foreign key to profile
  primary key (id),
  unique(user_id, category_id, title)

);

alter table tasks enable row level security;

--POLICIES


-- Create a policy for public "profiles"

create policy "Individuals can edit their profile" on profiles for
  update using (auth.uid() = user_id);

create policy "Individuals can view their profile" on profiles for
  select using (auth.uid() = user_id);

-- Create a policy for private "categories"

create policy "Individuals can create categories" on categories for
  insert using (auth.uid() = user_id);

create policy "Individuals can edit their categories" on categories for
  update using (auth.uid() = user_id);

create policy "Individuals can delete their categories" on categories for
  delete using (auth.uid() = user_id);

create policy "Individuals can view their own categories" on categories for
  select using (auth.uid() = user_id);

-- Create a policy for private "tasks"

create policy "Individuals can create tasks." on tasks for
  insert with check (auth.uid() = user_id);

create policy "Individuals can update their own tasks." on tasks for
  update using (auth.uid() = user_id);

create policy "Individuals can delete their own tasks." on tasks for
  delete using (auth.uid() = user_id);

create policy "Individuals can view their own tasks. " on tasks for
    select using (auth.uid() = user_id);


