# Supabase setup

Everything the code can do has been built. What's left are one-time steps in
the Supabase Dashboard that only you can do (they need your project access),
plus a few configuration values. Do these in order.

## 1. Run the schema migration

Open your project's **SQL Editor** in the Supabase Dashboard and run the
contents of `supabase/migrations/20260819000000_init_members_schema.sql`.

This creates `member_profiles`, `member_accounts`, `user_roles`,
`leadership_positions`, all RLS policies, the helper functions
(`is_admin()`, `has_portal_access()`, `current_member_id()`), the self-edit
guard trigger, the allowlist hook function, the auto-link trigger, and the
`member-photos` storage bucket.

(If you'd rather use the CLI: `npx supabase login`, then
`npx supabase link --project-ref <your-project-ref>`, then
`npx supabase db push`.)

## 2. Register the "Before User Created" Auth Hook

This can't be done via SQL — it's an Auth service setting, not a schema
change.

Dashboard → **Authentication → Hooks** → enable **Before User Created** →
select the `public.check_member_allowlist` function.

This is what actually enforces the allowlist: signups are rejected unless a
`member_accounts` row already exists for that email.

## 3. Enable magic-link email sign-in + custom SMTP

Dashboard → **Authentication → Providers → Email** → make sure Email is
enabled. Password sign-in isn't used by this app (the frontend calls
`signInWithOtp`, i.e. magic links), so no password policy config is needed.

**Custom SMTP is not optional here.** Supabase's built-in email sender is
hard-capped at **2 emails/hour, project-wide** — combined across every
signup/recovery/magic-link request — and that limit can only be changed by
configuring a custom SMTP provider; there's no setting or paid Supabase
tier that raises it otherwise. With a real roster, you'll hit that within
the first couple of sign-ins.

We're using **Brevo** (free tier, no credit card, ~300 emails/day as of
this writing — confirm the current number when you sign up):

1. Sign up at brevo.com.
2. Dashboard → **Settings → SMTP & API** → get your SMTP credentials (host,
   port, login, password/key).
3. Optional but recommended for deliverability: verify `berkeleylphie.net`
   as a sending domain (Brevo gives you DNS records to add at your
   registrar, same idea as the GitHub Pages A records).
4. Supabase Dashboard → **Project Settings → Authentication → SMTP
   Settings** → enable custom SMTP, paste in Brevo's host/port/username/
   password, set a sender email (e.g. `noreply@berkeleylphie.net`) and
   sender name (e.g. "Lambda Phi Epsilon"), save.

## 4. Set the Auth redirect URL

Dashboard → **Authentication → URL Configuration**.

Set **Site URL** and add a **Redirect URL** matching your deployed site
(`https://berkeleylphie.net/`, or your GitHub Pages URL including the Vite
base path from `vite.config.ts` if not yet on the custom domain).

A mismatch here is the most common way magic links silently fail — the
link in the email will redirect somewhere the app isn't listening, or
Supabase will refuse to redirect at all.

For local development, also add `http://localhost:3000/` (or whatever
`npm run dev` prints).

## 5. Confirm the storage bucket

The migration already creates `member-photos` as a public bucket with a 5MB
limit and PNG/JPEG/WebP-only uploads. Dashboard → **Storage** → confirm it
exists and those settings look right.

## 6. Fill in your `.env`

```
cp .env.example .env
```

Then fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from
Dashboard → **Project Settings → API**. Use the **publishable** key — never
the secret/service-role key, which should never appear in this project at
all.

## 7. Bootstrap the first member + admin

The database starts empty on purpose (see the plan's Implementation
Constraint — none of the old placeholder data was migrated). To test the
whole flow end-to-end, seed one real row for yourself:

```sql
-- Run in the SQL Editor, with your real name/email.
with new_profile as (
  insert into public.member_profiles (first_name, last_name, status)
  values ('Your', 'Name', 'active')
  returning id
)
insert into public.member_accounts (member_id, email)
select id, 'you@berkeley.edu' from new_profile;
```

Then:
1. Go to the (currently hidden — see step 8) Login page and sign in with
   that email via the magic link. This confirms the allowlist hook and
   auto-link trigger both work.
2. Once signed in, grant yourself admin in the SQL Editor:

```sql
insert into public.user_roles (member_id, role)
select member_id, 'admin' from public.member_accounts where email = 'you@berkeley.edu';
```

There's intentionally no UI for this — it's a one-time bootstrap action.
After this, you can manage all members, statuses, and leadership positions
directly from the Dashboard's table editor (Section 10/11/12 of the plan).

## 8. Un-hide the nav — last step, not first

Per the plan, Executive Board / Alumni / Login stay routed to the "coming
soon" page in `src/Header.tsx` until everything above is verified working.
Once you've confirmed sign-in, profile editing, photo upload, and the
Brothers/Alumni/Executive Board pages all render correctly against your
Supabase project, flip the three buttons in `Header.tsx` (both the desktop
and mobile nav blocks — comments mark exactly where) from `'coming'` to
`'executives'`, `'alumni'`, and `'login'` respectively.

## Testing checklist

- [ ] Anon (logged out) can see Brothers/Alumni/Executive Board pages, but
      an inactive member never appears anywhere public.
- [ ] Signing up with a non-allowlisted email is rejected with the generic
      "not recognized as a member" message.
- [ ] Signing up with the allowlisted email from step 7 succeeds and links
      automatically (`member_accounts.auth_user_id` gets populated — check
      in the table editor).
- [ ] Logged-in brother can edit preferred name / pledge class / graduation
      year / major / hometown / bio / LinkedIn / company / contact email /
      Berkeley email / personal email / phone number on `/profile`, and the
      public-facing changes reflect on the Brothers page.
- [ ] Logged-in brother can upload a photo, and re-uploading replaces it
      (check the `member-photos` bucket in Storage — there should only ever
      be one file per member folder).
- [ ] Checking "I'm an alum" on `/profile` moves the member from Brothers to
      Alumni. Unchecking it does nothing (self-service can only move
      active -> alumni, never back) — the checkbox should show as checked
      and disabled afterward.
- [ ] A direct API call trying to change your own `status` to anything
      other than `'alumni'` (e.g. `'inactive'`), or your own `first_name` /
      `last_name`, is rejected. Test this from the browser console while
      signed in as a non-admin
      (`supabase.from('member_profiles').update({status: 'inactive'}).eq('id', '<your id>')`
      should fail; `update({status: 'alumni'})` should succeed), **not**
      from the SQL Editor — the SQL Editor runs as the Postgres superuser
      and bypasses RLS entirely, so it isn't a valid way to test policies.
- [ ] Setting `status = 'alumni'` on a member moves them from Brothers to
      Alumni with all data intact, and they can still log in to the portal.
- [ ] Setting `status = 'inactive'` removes portal access (they'll see the
      "Portal Access Unavailable" screen) and removes them from all public
      pages.
- [ ] Adding a `leadership_positions` row makes that member appear on
      Executive Board *in addition to* Brothers, not instead of.
- [ ] Setting `is_current = false` on a leadership row removes them from
      Executive Board but the row still exists in the database.
- [ ] A member with a current `leadership_positions` row (Cabinet or Chair,
      including a "Rush Chair" title used on the Rush page) shows their
      `berkeley_email` on their public card. A member with no current
      leadership row never has any `member_accounts` field exposed publicly
      — confirm by querying `leadership_contact_emails()` as `anon` and
      checking it only returns rows for current leadership members.
