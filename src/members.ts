// Types and Supabase queries for member data. This replaces the old
// src/people.ts static array — the Brothers/Alumni/Executive Board pages now
// derive from the same underlying `member_profiles` rows in Supabase instead
// of each having their own hardcoded copy.
//
// A member can be an active brother AND hold a leadership position at the
// same time (their `leadership_positions` rows are independent of
// `member_profiles.status`), so the same person can legitimately show up as
// both a Brother card and a Cabinet/Chair card — that's two rendered views
// of one database row, not a data copy.

import { supabase } from './lib/supabaseClient';

export type PersonCategory = 'brother' | 'cabinet' | 'chair' | 'alumni';

// The shape every page/PersonCard already knows how to render.
export interface DisplayPerson {
  id: string;
  name: string;
  category: PersonCategory;
  image: string;
  year: string;
  gradYear?: string;
  major: string;
  hometown: string;
  position?: string;
  currentRole?: string;
  company?: string;
  email?: string;
}

interface MemberProfileRow {
  id: string;
  first_name: string;
  last_name: string;
  preferred_name: string | null;
  status: 'active' | 'alumni' | 'inactive';
  pledge_class: string | null;
  graduation_year: number | null;
  major: string | null;
  hometown: string | null;
  current_role_title: string | null;
  current_company: string | null;
  photo_path: string | null;
}

interface LeadershipPositionRow {
  member_id: string;
  position_type: 'cabinet' | 'chair';
  title: string;
  sort_order: number;
  member_profiles: MemberProfileRow | null;
}

function displayName(row: Pick<MemberProfileRow, 'first_name' | 'last_name' | 'preferred_name'>) {
  return row.preferred_name?.trim() || `${row.first_name} ${row.last_name}`.trim();
}

export function photoUrl(photoPath: string | null) {
  if (!photoPath) return '';
  return supabase.storage.from('member-photos').getPublicUrl(photoPath).data.publicUrl;
}

function toBrotherOrAlumnus(row: MemberProfileRow): DisplayPerson {
  const isAlumnus = row.status === 'alumni';
  return {
    id: row.id,
    name: displayName(row),
    category: isAlumnus ? 'alumni' : 'brother',
    image: photoUrl(row.photo_path),
    year: row.pledge_class ?? '',
    gradYear: row.graduation_year?.toString() ?? '',
    major: row.major ?? '',
    hometown: row.hometown ?? '',
    currentRole: isAlumnus ? (row.current_role_title ?? undefined) : undefined,
    company: isAlumnus ? (row.current_company ?? undefined) : undefined,
  };
}

function toLeader(row: LeadershipPositionRow, berkeleyEmail: string | undefined): DisplayPerson | null {
  const profile = row.member_profiles;
  if (!profile) return null;
  return {
    id: `${row.position_type}-${row.member_id}-${row.title}`,
    name: displayName(profile),
    category: row.position_type,
    image: photoUrl(profile.photo_path),
    year: profile.pledge_class ?? '',
    major: profile.major ?? '',
    hometown: profile.hometown ?? '',
    position: row.title,
    email: berkeleyEmail,
  };
}

export interface MemberDirectory {
  brothers: DisplayPerson[];
  alumni: DisplayPerson[];
  cabinet: DisplayPerson[];
  chairs: DisplayPerson[];
}

export async function fetchMemberDirectory(): Promise<MemberDirectory> {
  const [profilesResult, leadershipResult, contactEmailsResult] = await Promise.all([
    supabase
      .from('member_profiles')
      .select(
        'id, first_name, last_name, preferred_name, status, pledge_class, graduation_year, major, hometown, current_role_title, current_company, photo_path'
      )
      .order('last_name', { ascending: true }),
    supabase
      .from('leadership_positions')
      .select(
        'member_id, position_type, title, sort_order, member_profiles(id, first_name, last_name, preferred_name, status, pledge_class, graduation_year, major, hometown, current_role_title, current_company, photo_path)'
      )
      .eq('is_current', true)
      .order('sort_order', { ascending: true }),
    supabase.rpc('leadership_contact_emails'),
  ]);

  if (profilesResult.error) throw profilesResult.error;
  if (leadershipResult.error) throw leadershipResult.error;
  if (contactEmailsResult.error) throw contactEmailsResult.error;

  const profiles = (profilesResult.data ?? []) as MemberProfileRow[];
  const leadership = (leadershipResult.data ?? []) as unknown as LeadershipPositionRow[];
  const contactEmails = (contactEmailsResult.data ?? []) as { member_id: string; berkeley_email: string | null }[];
  const contactEmailByMemberId = new Map(contactEmails.map((row) => [row.member_id, row.berkeley_email ?? undefined]));

  const brothers: DisplayPerson[] = [];
  const alumni: DisplayPerson[] = [];
  for (const profile of profiles) {
    const person = toBrotherOrAlumnus(profile);
    if (person.category === 'alumni') alumni.push(person);
    else brothers.push(person);
  }

  const cabinet: DisplayPerson[] = [];
  const chairs: DisplayPerson[] = [];
  for (const row of leadership) {
    const person = toLeader(row, contactEmailByMemberId.get(row.member_id));
    if (!person) continue;
    if (row.position_type === 'cabinet') cabinet.push(person);
    else chairs.push(person);
  }

  return { brothers, alumni, cabinet, chairs };
}
