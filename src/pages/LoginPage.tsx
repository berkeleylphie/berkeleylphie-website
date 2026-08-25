// The brothers-only login form (currently hidden from the menu — see Header.tsx).
// Passwordless: the brother enters an allowlisted email and gets a magic
// link. Non-members are rejected server-side by the Before User Created
// Auth Hook (see supabase/migrations) — this page just surfaces that error.

import { useState } from 'react';
import { useAuth } from '../App';
import { Mail } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { requestMagicLink } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setSending(true);
    const { error: requestError } = await requestMagicLink(email);
    setSending(false);

    if (requestError) {
      setError(requestError);
      return;
    }

    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-32 px-6 pt-32 relative overflow-hidden">

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block w-20 bg-off-white border-rough border-off-white mb-6 flex items-center justify-center">
            <span className="text-background text-3xl font-black">ΛΦΕ</span>
          </div>
          <h1 className="text-4xl text-white mb-3">BROTHERS PORTAL</h1>
          <p className="text-muted">Sign in below</p>
        </div>

        <div className="p-8 bg-surface border-rough border-off-white/30">
          {sent ? (
            <div className="text-center space-y-4">
              <Mail className="w-10 h-10 text-off-white mx-auto" />
              <h2 className="text-xl text-white">CHECK YOUR EMAIL</h2>
              <p className="text-muted text-sm">
                We sent a sign-in link to <span className="text-white">{email}</span>. Click it to finish signing in.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm text-muted mb-2">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
                    placeholder="your.email@berkeley.edu"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border-2 border-red-500 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full px-6 py-3 bg-off-white text-background hover:bg-silver transition-all flex items-center justify-center gap-2 mx-auto"                           >
                {sending ? 'SENDING…' : 'SEND SIGN-IN LINK'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-muted space-y-2">
          <p>This portal is for brothers only.</p>
          <p>If you need access, contact the webmaster.</p>
        </div>
      </div>
    </div>
  );
}
