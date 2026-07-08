// The Alumni page (currently hidden from the menu — see Header.tsx). To
// add/remove an alumnus, edit the centralized list in src/people.ts (not
// this file). The search/filter logic is further down.

import { ImageWithFallback } from '../ImageWithFallback';
import { PersonCard } from '../PersonCard';
import { people } from '../people';
import { useState, useMemo } from 'react';

const allAlumni = people.filter((person) => person.category === 'alumni');

const ITEMS_PER_PAGE = 20;

export function AlumniPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter alumni based on search query
  const filteredAlumni = useMemo(() => {
    if (!searchQuery.trim()) return allAlumni;
    
    const query = searchQuery.toLowerCase();
    return allAlumni.filter(alumnus =>
      alumnus.name.toLowerCase().includes(query) ||
      (alumnus.currentRole ?? '').toLowerCase().includes(query) ||
      (alumnus.company ?? '').toLowerCase().includes(query) ||
      alumnus.major.toLowerCase().includes(query) ||
      alumnus.hometown.toLowerCase().includes(query) ||
      alumnus.year.includes(query)
    );
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAlumni = filteredAlumni.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-background pt-20">
      {/* Hero with Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1743327572772-eca3c63b029e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
          alt="Alumni"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="inline-block px-4 py-1.5 bg-off-white mb-4">
            <span className="text-background text-xs tracking-widest">LEGACY</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            ALUMNI
          </h1>
        </div>
      </section>

      {/* Search and Alumni Grid */}
      <section className="py-12 bg-surface texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Search Bar */}
          <div className="mb-10">
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search by name, company, role, major, location, or year..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-5 py-3 bg-background border-rough border-off-white text-white text-sm placeholder-muted focus:outline-none focus:border-white"
              />
              <div className="mt-2 text-center text-xs text-muted">
                Showing {currentAlumni.length} of {filteredAlumni.length} alumni
                {searchQuery && ` matching "${searchQuery}"`}
              </div>
            </div>
          </div>

          {/* Alumni Grid */}
          {currentAlumni.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {currentAlumni.map((alumnus) => (
                  <PersonCard key={alumnus.id} person={alumnus} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 text-sm border-rough ${
                      currentPage === 1
                        ? 'border-off-white/30 text-muted cursor-not-allowed'
                        : 'border-off-white text-white hover:bg-navy'
                    }`}
                  >
                    Previous
                  </button>

                  {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                      <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm border-rough ${
                          currentPage === page
                            ? 'bg-off-white text-background border-off-white'
                            : 'border-off-white text-white hover:bg-navy'
                        }`}
                      >
                        {page}
                      </button>
                    ) : (
                      <span key={index} className="px-1.5 text-muted text-sm">
                        {page}
                      </span>
                    )
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 text-sm border-rough ${
                      currentPage === totalPages
                        ? 'border-off-white/30 text-muted cursor-not-allowed'
                        : 'border-off-white text-white hover:bg-navy'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-off-white text-5xl mb-3">∅</div>
              <h3 className="text-xl text-white mb-2">No Alumni Found</h3>
              <p className="text-muted text-sm">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}