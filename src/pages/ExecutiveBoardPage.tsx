// The Executive Board page (currently hidden from the menu — see Header.tsx),
// sourced from Supabase via MembersContext. To add/remove a cabinet member or
// chair, add/remove a row in `leadership_positions` (not this file) — the
// same person can also independently appear on the Brothers page.

import { ImageWithFallback } from '../ImageWithFallback';
import { PersonCard } from '../PersonCard';
import { DirectoryStatus } from '../DirectoryStatus';
import { useMembers } from '../MembersContext';
import executivehero from '../images/executivehero.png';

export function ExecutiveBoardPage() {
  const { cabinet, chairs, loading, error } = useMembers();

  return (
    <div className="bg-background pt-20">
      {/* Hero with Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
          src={executivehero}
          alt="Executive Board"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="inline-block px-4 py-1.5 bg-off-white mb-4">
            <span className="text-background text-xs tracking-widest">LEADERSHIP</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            EXECUTIVE BOARD
          </h1>
        </div>
      </section>

      {/* Cabinet */}
      <section className="py-12 bg-surface texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-6 border-l-4 border-off-white pl-3">
            <h2 className="text-3xl text-white">CABINET</h2>
          </div>

          <DirectoryStatus loading={loading} error={error} />
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cabinet.map((exec) => (
                <PersonCard key={exec.id} person={exec} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Chairs */}
      {!loading && !error && (
        <section className="py-12 bg-background texture-noise relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex items-center gap-2 mb-6 border-l-4 border-off-white pl-3">
              <h2 className="text-3xl text-white">CHAIRS</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {chairs.map((exec) => (
                <PersonCard key={exec.id} person={exec} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
