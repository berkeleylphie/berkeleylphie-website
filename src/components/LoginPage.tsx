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
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center py-32 px-6 pt-32 relative overflow-hidden">
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block w-20 h-11 bg-[#f8f8f8] border-rough border-[#f8f8f8] mb-6 flex items-center justify-center">
            <span className="text-[#0a0a0f] text-3xl font-black">ΛΦΕ</span>
          </div>
          <h1 className="text-4xl text-white mb-3">BROTHERS PORTAL</h1>
          <p className="text-[#9ca3af]">Sign in below</p>
        </div>

        <div className="p-8 bg-[#141419] border-rough border-[#f8f8f8]/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-[#9ca3af] mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f] border-2 border-[#f8f8f8]/30 text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#f8f8f8]"
                  placeholder="your.email@berkeley.edu"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-[#9ca3af] mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f] border-2 border-[#f8f8f8]/30 text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#f8f8f8]"
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
              className="w-full py-3 bg-[#f8f8f8] text-[#0a0a0f] border-rough border-[#f8f8f8] hover:bg-[#f5d576] transition-all"
            >
              SIGN IN
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-[#f8f8f8] hover:text-[#f5d576] transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-[#9ca3af] space-y-2">
          <p>This portal is for brothers only.</p>
          <p>If you need access, contact the webmaster.</p>
        </div>
      </div>
    </div>
  );
}