// Self-service profile editing for signed-in brothers, linked from
// ProtectedContent.tsx. Only the fields listed as user-editable in the
// backend plan are here — name is admin-only, and status only allows a
// self-transition to 'alumni' (see the "I'm an alum" checkbox below); both
// are enforced server-side by the enforce_profile_self_edit trigger even if
// this form were bypassed.

import { useEffect, useState } from 'react';
import { useAuth } from '../App';
import { useMembers } from '../MembersContext';
import { supabase } from '../lib/supabaseClient';
import { photoUrl } from '../members';
import { ImageWithFallback } from '../ImageWithFallback';
import { Loader2 } from 'lucide-react';

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

interface EditableProfile {
  id: string;
  preferred_name: string;
  is_alumnus: boolean;
  pledge_class: string;
  graduation_year: string;
  major: string;
  hometown: string;
  bio: string;
  linkedin_url: string;
  current_company: string;
  photo_path: string | null;
  berkeley_email: string;
  personal_email: string;
  phone_number: string;
}

export function ProfileEditPage() {
  const { session } = useAuth();
  const { refresh } = useMembers();
  const [profile, setProfile] = useState<EditableProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [message, setMessage] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!session) return;
      setLoading(true);

      const { data: memberId, error: idError } = await supabase.rpc('current_member_id');
      if (idError || !memberId) {
        if (!cancelled) {
          setMessage({ kind: 'error', text: 'Could not find your member profile.' });
          setLoading(false);
        }
        return;
      }

      const [{ data, error }, { data: account, error: accountError }] = await Promise.all([
        supabase
          .from('member_profiles')
          .select(
            'id, preferred_name, status, pledge_class, graduation_year, major, hometown, bio, linkedin_url, current_company, photo_path'
          )
          .eq('id', memberId)
          .single(),
        supabase
          .from('member_accounts')
          .select('berkeley_email, personal_email, phone_number')
          .eq('member_id', memberId)
          .single(),
      ]);

      if (!cancelled) {
        if (error || !data) {
          setMessage({ kind: 'error', text: 'Could not load your profile.' });
        } else if (accountError || !account) {
          setMessage({ kind: 'error', text: 'Could not load your contact info.' });
        } else {
          setProfile({
            id: data.id,
            preferred_name: data.preferred_name ?? '',
            is_alumnus: data.status === 'alumni',
            pledge_class: data.pledge_class ?? '',
            graduation_year: data.graduation_year?.toString() ?? '',
            major: data.major ?? '',
            hometown: data.hometown ?? '',
            bio: data.bio ?? '',
            linkedin_url: data.linkedin_url ?? '',
            current_company: data.current_company ?? '',
            photo_path: data.photo_path,
            berkeley_email: account.berkeley_email ?? '',
            personal_email: account.personal_email ?? '',
            phone_number: account.phone_number ?? '',
          });
        }
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const graduationYear = profile.graduation_year.trim();
    if (graduationYear && !/^\d+$/.test(graduationYear)) {
      setMessage({ kind: 'error', text: 'Graduation year must be a number.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    const [{ error }, { error: accountError }] = await Promise.all([
      supabase
        .from('member_profiles')
        .update({
          preferred_name: profile.preferred_name || null,
          // Only ever sent as 'alumni' — self-service can declare alumni
          // status but not revert it; omitting the key otherwise avoids the
          // self-edit trigger rejecting a no-op/unauthorized status write.
          ...(profile.is_alumnus ? { status: 'alumni' } : {}),
          pledge_class: profile.pledge_class || null,
          graduation_year: graduationYear ? parseInt(graduationYear, 10) : null,
          major: profile.major || null,
          hometown: profile.hometown || null,
          bio: profile.bio || null,
          linkedin_url: profile.linkedin_url || null,
          current_company: profile.current_company || null,
        })
        .eq('id', profile.id),
      supabase
        .from('member_accounts')
        .update({
          berkeley_email: profile.berkeley_email || null,
          personal_email: profile.personal_email || null,
          phone_number: profile.phone_number || null,
        })
        .eq('member_id', profile.id),
    ]);

    setSaving(false);
    setMessage(
      error || accountError
        ? { kind: 'error', text: 'Something went wrong saving your profile.' }
        : { kind: 'success', text: 'Profile updated.' }
    );

    if (!error && !accountError) refresh();
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !profile) return;

    if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
      setMessage({ kind: 'error', text: 'Please choose a PNG, JPEG, or WebP image.' });
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setMessage({ kind: 'error', text: 'Photo must be under 5MB.' });
      return;
    }

    setUploadingPhoto(true);
    setMessage(null);

    const folder = profile.id;
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const newPath = `${folder}/profile.${extension}`;

    // Remove whatever's currently in the member's folder first so a format
    // change (e.g. .png -> .jpg) doesn't leave an orphaned old file behind.
    const { data: existing } = await supabase.storage.from('member-photos').list(folder);
    if (existing && existing.length > 0) {
      await supabase.storage
        .from('member-photos')
        .remove(existing.map((item) => `${folder}/${item.name}`));
    }

    const { error: uploadError } = await supabase.storage
      .from('member-photos')
      .upload(newPath, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setUploadingPhoto(false);
      setMessage({ kind: 'error', text: 'Photo upload failed.' });
      return;
    }

    const { error: updateError } = await supabase
      .from('member_profiles')
      .update({ photo_path: newPath })
      .eq('id', profile.id);

    setUploadingPhoto(false);

    if (updateError) {
      setMessage({ kind: 'error', text: 'Photo uploaded but could not be saved to your profile.' });
      return;
    }

    setProfile({ ...profile, photo_path: newPath });
    setMessage({ kind: 'success', text: 'Photo updated.' });
    refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-off-white animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background pt-32 text-center px-6">
        <p className="text-muted">{message?.text ?? 'Could not load your profile.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl text-white mb-8">EDIT PROFILE</h1>

        <div className="p-8 bg-surface border-rough border-off-white/30">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 shrink-0 border-rough border-off-white/30 overflow-hidden">
              <ImageWithFallback
                src={photoUrl(profile.photo_path)}
                alt="Your profile photo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <label className="inline-block px-4 py-2 bg-off-white text-background text-sm cursor-pointer hover:bg-silver transition-all">
                {uploadingPhoto ? 'UPLOADING…' : 'CHANGE PHOTO'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  disabled={uploadingPhoto}
                  onChange={handlePhotoChange}
                />
              </label>
              <p className="text-xs text-muted mt-2">PNG, JPEG, or WebP. Max 5MB.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm text-muted mb-2">PREFERRED NAME</label>
              <input
                type="text"
                value={profile.preferred_name}
                onChange={(e) => setProfile({ ...profile, preferred_name: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
                placeholder="What should show on your card"
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-background border-2 border-off-white/30">
              <input
                type="checkbox"
                id="is_alumnus"
                checked={profile.is_alumnus}
                disabled={profile.is_alumnus}
                onChange={(e) => setProfile({ ...profile, is_alumnus: e.target.checked })}
                className="mt-1"
              />
              <label htmlFor="is_alumnus" className="text-sm text-white">
                I'm an alum (no longer an active brother)
                <span className="block text-xs text-muted mt-1">
                  {profile.is_alumnus
                    ? 'You are marked as an alum. Contact an admin to reactivate active status.'
                    : "Moves you from the Brothers page to Alumni. This can't be undone from here — an admin would need to reactivate you."}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted mb-2">PLEDGE CLASS</label>
                <input
                  type="text"
                  value={profile.pledge_class}
                  onChange={(e) => setProfile({ ...profile, pledge_class: e.target.value })}
                  className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
                  placeholder="e.g. Fall 2023"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">GRADUATION YEAR</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={profile.graduation_year}
                  onChange={(e) => setProfile({ ...profile, graduation_year: e.target.value })}
                  className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
                  placeholder="e.g. 2026"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">MAJOR</label>
              <input
                type="text"
                value={profile.major}
                onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
              />
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">HOMETOWN</label>
              <input
                type="text"
                value={profile.hometown}
                onChange={(e) => setProfile({ ...profile, hometown: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
              />
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">BIO</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
              />
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">LINKEDIN URL</label>
              <input
                type="url"
                value={profile.linkedin_url}
                onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div className="pt-4 border-t border-off-white/20">
              <p className="text-xs text-muted mb-4">
                For the alumni database. Personal email and phone number are never shown on the
                public site; Berkeley email is shown publicly only if you currently hold a Cabinet
                or Chair position (as your Executive Board contact).
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-muted mb-2">BERKELEY EMAIL</label>
                  <input
                    type="email"
                    value={profile.berkeley_email}
                    onChange={(e) => setProfile({ ...profile, berkeley_email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
                    placeholder="you@berkeley.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted mb-2">PERSONAL EMAIL</label>
                  <input
                    type="email"
                    value={profile.personal_email}
                    onChange={(e) => setProfile({ ...profile, personal_email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted mb-2">PHONE NUMBER</label>
                  <input
                    type="tel"
                    value={profile.phone_number}
                    onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                    className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">COMPANY</label>
              <input
                type="text"
                value={profile.current_company}
                onChange={(e) => setProfile({ ...profile, current_company: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
              />
            </div>

            {message && (
              <div
                className={`p-4 border-2 text-sm ${
                  message.kind === 'success'
                    ? 'bg-off-white/10 border-off-white text-white'
                    : 'bg-red-500/10 border-red-500 text-red-400'
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-off-white text-background border-rough border-off-white hover:bg-silver transition-all disabled:opacity-60"
            >
              {saving ? 'SAVING…' : 'SAVE CHANGES'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
