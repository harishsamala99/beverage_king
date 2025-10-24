-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (id)
);

alter table public.profiles enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create customer_points table
create table public.customer_points (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  points integer not null default 0,
  total_earned integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (id),
  unique(user_id)
);

alter table public.customer_points enable row level security;

-- Customer points policies
create policy "Users can view their own points"
  on public.customer_points for select
  using (auth.uid() = user_id);

create policy "Users can insert their own points record"
  on public.customer_points for insert
  with check (auth.uid() = user_id);

-- Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  
  insert into public.customer_points (user_id, points, total_earned)
  values (new.id, 0, 0);
  
  return new;
end;
$$;

-- Trigger to create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_customer_points_updated_at
  before update on public.customer_points
  for each row execute function public.update_updated_at_column();