// The heart of the site: routes each URL path to a page and wraps every
// page with the Header (top menu) and Footer. To add a whole new page,
// import it here and add a <Route> for it below.
import { useState, createContext, useContext, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { Header } from './Header';
import { Footer } from './Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BrothersPage } from './pages/BrothersPage';
import { ExecutiveBoardPage } from './pages/ExecutiveBoardPage';
import { AlumniPage } from './pages/AlumniPage';
import { RushPage } from './pages/RushPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedContent } from './pages/ProtectedContent';
import { ProfileEditPage } from './pages/ProfileEditPage';
import { ComingSoonPage } from './pages/ComingSoonPage';
import { MembersProvider } from './MembersContext';

type AuthContextType = {
  session: Session | null;
  isAuthenticated: boolean;
  hasPortalAccess: boolean;
  portalAccessLoading: boolean;
  requestMagicLink: (email: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);
  const [hasPortalAccess, setHasPortalAccess] = useState(false);
  const [portalAccessLoading, setPortalAccessLoading] = useState(true);

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Restore any existing session on load, then keep it in sync — this SPA
  // has no server session to fall back on, so supabase-js's own localStorage
  // persistence is what survives a page refresh.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: subscription } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      // Only jump to the portal right after a fresh sign-in (e.g. clicking
      // the magic link) — not on every page load/refresh of an existing
      // session, which would hijack whatever page the brother is browsing.
      if (event === 'SIGNED_IN') {
        navigate('/portal');
      }
      if (event === 'SIGNED_OUT') {
        setHasPortalAccess(false);
        setPortalAccessLoading(false);
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, [navigate]);

  // A session existing isn't enough to grant portal access — an inactive
  // member can still hold a valid session. has_portal_access() checks
  // member_profiles.status server-side (active/alumni yes, inactive no).
  useEffect(() => {
    if (!session) {
      setHasPortalAccess(false);
      setPortalAccessLoading(false);
      return;
    }

    let cancelled = false;
    setPortalAccessLoading(true);
    supabase
      .rpc('has_portal_access')
      .then(({ data, error }) => {
        if (cancelled) return;
        setHasPortalAccess(!error && data === true);
        setPortalAccessLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [session]);

  const requestMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
      },
    });
    return { error: error?.message ?? null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isAuthenticated = session !== null;

  return (
    <AuthContext.Provider
      value={{ session, isAuthenticated, hasPortalAccess, portalAccessLoading, requestMagicLink, logout }}
    >
      <MembersProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/brothers" element={<BrothersPage />} />
              <Route path="/executives" element={<ExecutiveBoardPage />} />
              <Route path="/alumni" element={<AlumniPage />} />
              <Route path="/rush" element={<RushPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/coming" element={<ComingSoonPage />} />
              <Route
                path="/portal"
                element={
                  <RequirePortalAccess>
                    <ProtectedContent />
                  </RequirePortalAccess>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequirePortalAccess>
                    <ProfileEditPage />
                  </RequirePortalAccess>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </MembersProvider>
    </AuthContext.Provider>
  );
}

// Gate for the two portal-only routes: must be signed in, have finished
// checking access, and actually have portal access, in that order, before
// rendering the requested page.
function RequirePortalAccess({ children }: { children: JSX.Element }) {
  const { isAuthenticated, portalAccessLoading, hasPortalAccess, logout } = useAuth();

  if (!isAuthenticated) return <LoginPage />;
  if (portalAccessLoading) return null;
  if (!hasPortalAccess) return <PortalAccessDenied onLogout={logout} />;
  return children;
}

// Shown when a signed-in account is authenticated but no longer has portal
// access (status = 'inactive') — e.g. someone removed from the chapter while
// still holding a valid session elsewhere.
function PortalAccessDenied({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-32 px-6 pt-32 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl text-white mb-4">PORTAL ACCESS UNAVAILABLE</h1>
        <p className="text-muted mb-8">
          This account no longer has access to the Brothers Portal. Contact an administrator if you believe this is a mistake.
        </p>
        <button
          onClick={onLogout}
          className="px-6 py-3 bg-off-white text-background border-rough border-off-white hover:bg-silver transition-all"
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
}
