-- ============================================================================
-- LFE Delta website — members/auth/storage schema
--
-- Run this in the Supabase SQL Editor (or `supabase db push` once linked).
-- After running, finish the manual Dashboard steps documented in
-- supabase/README.md (registering the Before User Created hook, verifying
-- the storage bucket, setting Auth redirect URLs).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- Public-safe profile data. Contains no credentials or auth info by design —
-- exposure of this table only ever exposes what's already meant to be public.
create table public.member_profiles (
  id              uuid primary key default gen_random_uuid(),
  first_name      text not null,
  last_name       text not null,
  preferred_name  text,
  status          text not null default 'active'
                    check (status in ('active', 'alumni', 'inactive')),
  pledge_class    text,
  graduation_year int,
  major           text,
  hometown        text,
  bio             text,
  linkedin_url    text,
  current_role_title text,
  current_company text,
  photo_path      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Private account/auth data, one row per member_profiles row. Never exposed
-- to anon. member_accounts.email is the signup allowlist/login email —
-- admin-only to change (see enforce_account_self_edit below).
--
-- berkeley_email/personal_email/phone_number are internal-only contact
-- details for the alumni database; self-editable by the member, but (like
-- everything else in this table) never read by anon and never joined into
-- the public member directory queries in src/members.ts.
create table public.member_accounts (
  member_id       uuid primary key references public.member_profiles(id) on delete cascade,
  auth_user_id    uuid unique references auth.users(id) on delete set null,
  email           text not null unique,
  berkeley_email  text,
  personal_email  text,
  phone_number    text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Authorization, fully separate from profile data.
create table public.user_roles (
  id         uuid primary key default gen_random_uuid(),
  member_id  uuid not null references public.member_profiles(id) on delete cascade,
  role       text not null check (role in ('admin')),
  created_at timestamptz not null default now(),
  unique (member_id, role)
);

-- Executive Board positions. Historical (non-current) rows are kept, not
-- deleted, so `is_current` — not row existence — controls public display.
create table public.leadership_positions (
  id             uuid primary key default gen_random_uuid(),
  member_id      uuid not null references public.member_profiles(id) on delete cascade,
  position_type  text not null check (position_type in ('cabinet', 'chair')),
  title          text not null,
  term           text,
  is_current     boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now()
);

create index member_accounts_auth_user_id_idx on public.member_accounts (auth_user_id);
create index leadership_positions_member_id_idx on public.leadership_positions (member_id);
create index leadership_positions_is_current_idx on public.leadership_positions (is_current);
create index user_roles_member_id_idx on public.user_roles (member_id);

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger member_profiles_set_updated_at
  before update on public.member_profiles
  for each row execute function public.set_updated_at();

create trigger member_accounts_set_updated_at
  before update on public.member_accounts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Authorization helper functions.
--
-- security definer so they run with the owning role's privileges and are not
-- blocked by the very RLS policies they're used to write — the standard
-- Supabase pattern for avoiding self-referencing-RLS recursion. Each one
-- only ever looks up rows tied to the caller's own auth.uid(), so running
-- with elevated privilege does not leak other members' data.
-- ---------------------------------------------------------------------------

create or replace function public.current_member_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select member_id
  from public.member_accounts
  where auth_user_id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.user_roles ur
    where ur.member_id = public.current_member_id()
      and ur.role = 'admin'
  );
$$;

create or replace function public.has_portal_access()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.member_profiles mp
    where mp.id = public.current_member_id()
      and mp.status <> 'inactive'
  );
$$;

-- Narrow, deliberate exception to "member_accounts is never exposed to
-- anon": Executive Board cards show a leadership member's Berkeley email as
-- their public point of contact. Rather than loosening member_accounts' RLS
-- or grants (which — since Postgres column grants aren't row-conditional —
-- would risk exposing personal_email/phone_number/the login email too),
-- this returns only member_id + berkeley_email, and only for members who
-- currently hold a leadership_positions row. Nothing else in
-- member_accounts becomes reachable by anon through this.
create or replace function public.leadership_contact_emails()
returns table (member_id uuid, berkeley_email text)
language sql
security definer
set search_path = public
stable
as $$
  select ma.member_id, ma.berkeley_email
  from public.member_accounts ma
  join public.leadership_positions lp on lp.member_id = ma.member_id
  where lp.is_current = true;
$$;

grant execute on function public.leadership_contact_emails() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Self-edit column guard on member_profiles.
--
-- RLS is row-level only — it can't express "this row, but only these
-- columns." Non-admins may freely update preferred_name/bio/major/
-- hometown/pledge_class/graduation_year/linkedin_url/photo_path/
-- current_role_title/current_company; legal name is admin-only.
--
-- status is a special case: a self-transition from 'active' to 'alumni' is
-- allowed (a member self-declaring they've graduated), but no other status
-- change is — critically, an 'inactive' member cannot reinstate their own
-- portal access by declaring themselves alumni, since the source status is
-- checked, not just the target.
-- ---------------------------------------------------------------------------

create or replace function public.enforce_profile_self_edit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- auth.uid() is null for requests with no Supabase Auth JWT attached —
  -- the Dashboard SQL Editor, table editor, and CLI migrations all run this
  -- way. Those contexts already bypass RLS entirely, so treat them as
  -- privileged here too; only authenticated non-admin app sessions are
  -- restricted by this trigger.
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;

  if (new.status is distinct from old.status
      and not (old.status = 'active' and new.status = 'alumni'))
     or new.first_name is distinct from old.first_name
     or new.last_name is distinct from old.last_name then
    raise exception 'Only administrators may change status (other than self-declaring as alumni from active) or name.';
  end if;

  return new;
end;
$$;

create trigger member_profiles_enforce_self_edit
  before update on public.member_profiles
  for each row execute function public.enforce_profile_self_edit();

-- ---------------------------------------------------------------------------
-- Self-edit column guard on member_accounts.
--
-- Same pattern as enforce_profile_self_edit above. Members may self-edit
-- berkeley_email/personal_email/phone_number; email (the login/allowlist
-- address) and auth_user_id (the auth.users link) are admin-only.
-- ---------------------------------------------------------------------------

create or replace function public.enforce_account_self_edit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;

  if new.email is distinct from old.email
     or new.auth_user_id is distinct from old.auth_user_id then
    raise exception 'Only administrators may change the login email or linked account.';
  end if;

  return new;
end;
$$;

create trigger member_accounts_enforce_self_edit
  before update on public.member_accounts
  for each row execute function public.enforce_account_self_edit();

-- ---------------------------------------------------------------------------
-- Auth hooks: allowlist gate + auto-link on signup.
--
-- check_member_allowlist is a "Before User Created" Auth Hook. It must be
-- registered manually in Dashboard -> Authentication -> Hooks (see
-- supabase/README.md) — there is no way to register it purely via SQL.
--
-- Payload shape (confirmed against Supabase docs): event->'user'->>'email'.
-- Rejection uses a generic message so this can't be used as an oracle for
-- "is this email a recognized member."
-- ---------------------------------------------------------------------------

create or replace function public.check_member_allowlist(event jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  signup_email text := lower(event->'user'->>'email');
  is_allowed boolean;
begin
  select exists (
    select 1 from public.member_accounts
    where lower(email) = signup_email
      and auth_user_id is null
  ) into is_allowed;

  if not is_allowed then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 403,
        'message', 'This email is not recognized as a member. Contact an administrator for access.'
      )
    );
  end if;

  return '{}'::jsonb;
end;
$$;

revoke execute on function public.check_member_allowlist(jsonb) from public, anon, authenticated;
grant execute on function public.check_member_allowlist(jsonb) to supabase_auth_admin;

create or replace function public.link_member_account()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.member_accounts
  set auth_user_id = new.id,
      updated_at = now()
  where lower(email) = lower(new.email)
    and auth_user_id is null;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_link_member on auth.users;
create trigger on_auth_user_created_link_member
  after insert on auth.users
  for each row execute function public.link_member_account();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.member_profiles enable row level security;
alter table public.member_accounts enable row level security;
alter table public.user_roles enable row level security;
alter table public.leadership_positions enable row level security;

-- member_profiles: public read of non-inactive rows; self-update own row
-- (columns further restricted by the trigger above); admins get full access.
create policy "member_profiles_public_read"
  on public.member_profiles for select
  to anon, authenticated
  using (status <> 'inactive');

create policy "member_profiles_self_update"
  on public.member_profiles for update
  to authenticated
  using (id = public.current_member_id())
  with check (id = public.current_member_id());

create policy "member_profiles_admin_all"
  on public.member_profiles for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- member_accounts: no anon access at all. Authenticated users may read and
-- update only their own row; the login email and auth link are not
-- self-editable within that (admin-only, enforced by the trigger above).
create policy "member_accounts_self_read"
  on public.member_accounts for select
  to authenticated
  using (auth_user_id = auth.uid());

create policy "member_accounts_self_update"
  on public.member_accounts for update
  to authenticated
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

create policy "member_accounts_admin_all"
  on public.member_accounts for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- user_roles: no anon access. Authenticated users may read only their own
-- role rows (so the UI can tell if the caller is an admin).
create policy "user_roles_self_read"
  on public.user_roles for select
  to authenticated
  using (member_id = public.current_member_id());

create policy "user_roles_admin_all"
  on public.user_roles for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- leadership_positions: no PII in this table, public read of everything;
-- pages filter to is_current = true client-side / in the query.
create policy "leadership_positions_public_read"
  on public.leadership_positions for select
  to anon, authenticated
  using (true);

create policy "leadership_positions_admin_all"
  on public.leadership_positions for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Explicit grants. Supabase/PostgREST exposes tables by default once RLS
-- policies exist, but grants are the actual gate PostgREST checks first —
-- keep them in lockstep with the policies above rather than relying on
-- defaults.
revoke all on public.member_profiles from anon, authenticated;
grant select on public.member_profiles to anon, authenticated;
grant insert, update, delete on public.member_profiles to authenticated;

revoke all on public.member_accounts from anon, authenticated;
grant select, insert, update, delete on public.member_accounts to authenticated;

revoke all on public.user_roles from anon, authenticated;
grant select, insert, update, delete on public.user_roles to authenticated;

revoke all on public.leadership_positions from anon, authenticated;
grant select on public.leadership_positions to anon, authenticated;
grant insert, update, delete on public.leadership_positions to authenticated;

-- ---------------------------------------------------------------------------
-- Storage: member-photos bucket
--
-- Public read (photos are public on the site anyway); writes restricted to
-- the member's own folder (member-photos/{member_id}/...) or admins.
-- MIME/size limits are enforced at the bucket level, not just client-side,
-- since client-side <input accept> is trivially bypassed.
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'member-photos',
  'member-photos',
  true,
  5242880, -- 5MB
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "member_photos_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'member-photos');

create policy "member_photos_own_write"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'member-photos'
    and (
      (storage.foldername(name))[1] = public.current_member_id()::text
      or public.is_admin()
    )
  );

create policy "member_photos_own_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'member-photos'
    and (
      (storage.foldername(name))[1] = public.current_member_id()::text
      or public.is_admin()
    )
  );

create policy "member_photos_own_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'member-photos'
    and (
      (storage.foldername(name))[1] = public.current_member_id()::text
      or public.is_admin()
    )
  );
