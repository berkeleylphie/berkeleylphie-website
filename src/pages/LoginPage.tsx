// The brothers-only login form (currently hidden from the menu — see Header.tsx).
// The login itself is mock/fake for now and is being replaced with real authentication.

import { useState } from 'react';
import { useAuth } from '../App';
import { Lock, Mail } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError('Invalid credentials');
    }
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

            <div>
              <label htmlFor="password" className="block text-sm text-muted mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border-2 border-off-white/30 text-white placeholder-muted focus:outline-none focus:border-off-white"
                  placeholder="••••••••"
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
              className="w-full py-3 bg-off-white text-background border-rough border-off-white hover:bg-gold transition-all"
            >
              SIGN IN
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-off-white hover:text-gold transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted space-y-2">
          <p>This portal is for brothers only.</p>
          <p>If you need access, contact the webmaster.</p>
        </div>
      </div>
    </div>
  );
}