import { useAuth } from '../App';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import wcrest from '../assets/images/wcrest.png';

type Page = 'home' | 'about' | 'brothers' | 'executives' | 'alumni' | 'rush' | 'login' | 'protected' | 'coming';

export function Header({ currentPage, setCurrentPage }: { currentPage: Page; setCurrentPage: (page: Page) => void }) {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brothersDropdownOpen, setBrothersDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  let dropdownTimeout: NodeJS.Timeout | null = null;

  const navItems = [
    { label: 'Home', page: 'home' as Page },
    { label: 'About Us', page: 'about' as Page },
    { label: 'Brothers', page: 'brothers' as Page, hasDropdown: true },
    { label: 'Rush', page: 'rush' as Page },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setBrothersDropdownOpen(false);
    setMobileDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setBrothersDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => setBrothersDropdownOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeout) clearTimeout(dropdownTimeout);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto pl-3 pr-4 sm:px-6">
        <div className="flex justify-between pl-0 pr-4 items-center h-20">
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 group"
          >
            <div className="h-20 p-2 flex items-center justify-center">
              <img src={wcrest} alt="Lambda Phi Epsilon Crest" className="h-10 w-10 sm:h-14 sm:w-14 object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white tracking-wider">LAMBDA PHI EPSILON</div>
              <div className="text-white text-xs tracking-widest">UC BERKELEY</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div 
                  key={item.page}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleNavClick(item.page)}
                    className={`px-6 py-3 transition-all flex items-center gap-2 ${
                      currentPage === item.page || currentPage === 'executives' || currentPage === 'alumni'
                        ? 'bg-white text-[#0a0a0f]'
                        : 'text-white hover:bg-[#172841]'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${brothersDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {brothersDropdownOpen && (
                    <div className="absolute top-full left-0 w-56 bg-[#141419] overflow-hidden">
                      <button
                        onClick={() => handleNavClick('brothers')}
                        className="w-full text-left px-6 py-3 text-white hover:bg-[#172841] transition-all border-b border-white/30"
                      >
                        The Brothers
                      </button>
                      <button
                        onClick={() => handleNavClick('coming')}
                                          /////////////executives

                        className="w-full text-left px-6 py-3 text-white hover:bg-[#172841] transition-all border-b border-white/30"
                      >
                        Executive Board
                      </button>
                      <button
                        onClick={() => handleNavClick('coming')}
                                          /////////////alumni

                        className="w-full text-left px-6 py-3 text-white hover:bg-[#172841] transition-all"
                      >
                        Alumni
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-6 py-3 transition-all ${
                    currentPage === item.page
                      ? 'bg-white text-[#0a0a0f]'
                      : 'text-white hover:bg-[#172841]'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavClick('protected')}
                  className={`px-6 py-3 transition-all ${
                    currentPage === 'protected'
                      ? 'bg-white text-[#0a0a0f]'
                      : 'text-white hover:bg-[#172841]'
                  }`}
                >
                  Portal
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-6 py-3 text-white hover:bg-[#172841] transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
                <button
                  onClick={() => handleNavClick('coming')}
                  /////////////login
                  className={`px-6 py-3 transition-all ${
                    currentPage === 'login'
                      ? 'bg-white text-[#0a0a0f]'
                      : 'text-white hover:bg-[#172841]'
                  }`}
                >
                  Login
                </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t-2 border-white/30">
            <div className="space-y-2">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.page}>
                    <button
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className={`flex items-center justify-between w-full text-left px-4 py-3 transition-all ${
                        currentPage === item.page || currentPage === 'executives' || currentPage === 'alumni'
                          ? 'bg-white text-[#0a0a0f]'
                          : 'text-white hover:bg-[#172841]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileDropdownOpen && (
                      <div className="bg-[#141419] border-l-4 border-white ml-4 mt-1">
                        <button
                          onClick={() => handleNavClick('brothers')}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#172841] transition-all text-sm"
                        >
                          All Brothers
                        </button>
                        <button
                          onClick={() => handleNavClick('coming')}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#172841] transition-all text-sm"
                        >
                          Executive Board
                        </button>
                        <button
                          onClick={() => handleNavClick('coming')}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#172841] transition-all text-sm"
                        >
                          Alumni
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`block w-full text-left px-4 py-3 transition-all ${
                      currentPage === item.page
                        ? 'bg-white text-[#0a0a0f]'
                        : 'text-white hover:bg-[#172841]'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNavClick('protected')}
                    className={`block w-full text-left px-4 py-3 transition-all ${
                      currentPage === 'protected'
                        ? 'bg-white text-[#0a0a0f]'
                        : 'text-white hover:bg-[#172841]'
                    }`}
                  >
                    Portal
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-3 text-white hover:bg-[#172841] transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavClick('coming')}
                  className={`w-full px-4 py-3 text-left hover:bg-[#172841] ${
                    currentPage === 'login'
                      ? 'bg-white text-[#0a0a0f]'
                      : 'text-white hover:bg-[#172841]'
                  }`}
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}