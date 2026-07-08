// The heart of the site: decides which page is shown and wraps every page
// with the Header (top menu) and Footer. To add a whole new page, import it here,
// add its name to the Page list, and add a case for it in renderPage below.
import { useState, createContext, useContext, useEffect } from 'react';
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
import { ComingSoonPage } from './pages/ComingSoonPage';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

type Page = 'home' | 'about' | 'brothers' | 'executives' | 'alumni' | 'rush' | 'login' | 'protected' | 'coming';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const login = (email: string, password: string) => {
    // Mock authentication - replace with Supabase
    if (email && password) {
      setIsAuthenticated(true);
      setCurrentPage('protected');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'brothers':
        return <BrothersPage setCurrentPage={setCurrentPage} />;
      case 'executives':
        return <ExecutiveBoardPage setCurrentPage={setCurrentPage} />;
      case 'alumni':
        return <AlumniPage setCurrentPage={setCurrentPage} />;
      case 'rush':
        return <RushPage setCurrentPage={setCurrentPage} />;
        case 'login':
          return <LoginPage />;
        case 'coming':
          return <ComingSoonPage />;
      case 'protected':
        return isAuthenticated ? <ProtectedContent /> : <LoginPage />;
      default:
        return <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <div className="min-h-screen bg-background">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </AuthContext.Provider>
  );
}