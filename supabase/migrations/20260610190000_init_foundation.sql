-- Phase 1 foundation: enums, profiles/projects/members, payments + Care Plan
-- subscriptions, RLS, and the auth.users -> profiles signup trigger.
--
-- Portal model: passwordless clients; a personal-vs-niche segment separates
-- Derrick's direct clients from niche-brand clients; payments cover one-time
-- redesign milestones (payments) and recurring Care Plans (subscriptions).
-- Write model: clients read their own rows under RLS; all structural writes go
-- through the service-role admin client + the Stripe webhook.

-- ── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists pgcrypto; -- gen_random_uuid()

-- ── Enums ────────────────────────────────────────────────────────────────────
create type public.profile_role       as enum ('admin', 'client');
create type public.client_segment     as enum ('personal', 'niche');
create type public.project_status      as enum ('draft', 'active', 'paused', 'completed', 'archived');
create type public.payment_milestone   as enum ('deposit', 'midpoint', 'final', 'change_order');
create type public.payment_status      as enum ('pending', 'paid', 'overdue', 'refunded', 'void');
create type public.care_plan           as enum ('basic', 'growth', 'partner');
create type public.subscription_status as enum ('incomplete', 'trialing', 'active', 'past_due', 'paused', 'canceled');

-- ── profiles (mirror of auth.users) ──────────────────────────────────────────
create table public.profiles (
  id                 uuid primary key references auth.users (id) on delete cascade,
  email              text not null,
  full_name          text,
  phone              text,
  role               public.profile_role   not null default 'client',
  segment            public.client_segment not null default 'personal',
  stripe_customer_id text,
  created_at         timestamptz not null default now(),
  last_login_at      timestamptz
);
comment on table public.profiles is
  'App user data mirrored from auth.users. segment separates direct (personal) clients from niche-brand clients.';

-- ── projects ─────────────────────────────────────────────────────────────────
create table public.projects (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  client_id         uuid references public.profiles (id) on delete set null,
  name              text not null,
  status            public.project_status not null default 'draft',
  total_cents       integer not null default 0 check (total_cents >= 0),
  paid_cents        integer not null default 0 check (paid_cents >= 0),
  created_by        uuid references public.profiles (id),
  created_at        timestamptz not null default now(),
  status_updated_at timestamptz not null default now(),
  completed_at      timestamptz
);

-- ── project_members (drives RLS scoping) ─────────────────────────────────────
create table public.project_members (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id    uuid not null references public.profiles (id) on delete cascade,
  role       public.profile_role not null default 'client',
  invited_by uuid references public.profiles (id),
  joined_at  timestamptz not null default now(),
  unique (project_id, user_id)
);

-- ── payments (one-time redesign milestones; Stripe-ready) ────────────────────
create table public.payments (
  id                         uuid primary key default gen_random_uuid(),
  project_id                 uuid not null references public.projects (id) on delete cascade,
  milestone                  public.payment_milestone not null,
  amount_cents               integer not null check (amount_cents > 0),
  status                     public.payment_status not null default 'pending',
  due_date                   date,
  stripe_checkout_session_id text,
  stripe_payment_intent_id   text,
  paid_at                    timestamptz,
  notes                      text,
  created_at                 timestamptz not null default now()
);

-- ── subscriptions (recurring Care Plans; mirrors a Stripe subscription) ──────
create table public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references public.profiles (id) on delete cascade,
  project_id             uuid references public.projects (id) on delete set null,
  plan                   public.care_plan not null,
  status                 public.subscription_status not null default 'incomplete',
  stripe_subscription_id text unique,
  stripe_price_id        text,
  current_period_end     timestamptz,
  cancel_at_period_end   boolean not null default false,
  created_at             timestamptz not null default now()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────
create index on public.projects (client_id);
create index on public.project_members (project_id);
create index on public.project_members (user_id);
create index on public.payments (project_id, status);
create index on public.subscriptions (client_id);
create index on public.subscriptions (stripe_subscription_id);

-- ── RLS helper functions (security definer to avoid policy recursion) ────────
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create or replace function public.is_project_member(pid uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.project_members
    where project_id = pid and user_id = (select auth.uid())
  );
$$;

-- ── Enable RLS ───────────────────────────────────────────────────────────────
alter table public.profiles        enable row level security;
alter table public.projects        enable row level security;
alter table public.project_members enable row level security;
alter table public.payments        enable row level security;
alter table public.subscriptions   enable row level security;

-- profiles: a user sees/updates their own row; admins see all. Role/segment are
-- not in the column grant below, so they stay service-role only.
create policy "profiles_select_self_or_admin" on public.profiles
  for select to authenticated using (id = (select auth.uid()) or public.is_admin());
create policy "profiles_update_self" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- projects / members / payments / subscriptions: read for admins + the right
-- client; every write is service-role (no insert/update/delete policy here).
create policy "projects_select_member_or_admin" on public.projects
  for select to authenticated using (public.is_admin() or public.is_project_member(id));

create policy "members_select_self_or_admin" on public.project_members
  for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());

create policy "payments_select_member_or_admin" on public.payments
  for select to authenticated using (public.is_admin() or public.is_project_member(project_id));

create policy "subs_select_owner_or_admin" on public.subscriptions
  for select to authenticated using (public.is_admin() or client_id = (select auth.uid()));

-- ── Grants (Data API needs explicit grants; new-table auto-expose is off) ────
grant usage on schema public to anon, authenticated;
grant select on public.profiles, public.projects, public.project_members,
  public.payments, public.subscriptions to authenticated;
grant update (full_name, phone) on public.profiles to authenticated;

-- ── handle_new_user: auto-create a profile row on signup ─────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
