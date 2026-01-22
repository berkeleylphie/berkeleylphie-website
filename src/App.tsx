import { useState, createContext, useContext, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { BrothersPage } from './components/BrothersPage';
import { ExecutiveBoardPage } from './components/ExecutiveBoardPage';
import { AlumniPage } from './components/AlumniPage';
import { RushPage } from './components/RushPage';
import { LoginPage } from './components/LoginPage';
import { ProtectedContent } from './components/ProtectedContent';
import { ComingSoonPage } from './components/ComingSoonPage';

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
          return <ComingSoonPage setCurrentPage={setCurrentPage} />;
      case 'protected':
        return isAuthenticated ? <ProtectedContent /> : <LoginPage />;
      default:
        return <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <div className="min-h-screen bg-[#0a0a0f]">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </AuthContext.Provider>
  );
}