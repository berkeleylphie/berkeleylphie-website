// The Executive Board page (currently hidden from the menu — see Header.tsx).
// To add/remove a cabinet member or chair, edit the centralized list in
// src/people.ts (not this file).

import { ImageWithFallback } from '../ImageWithFallback';
import { PersonCard } from '../PersonCard';
import { people } from '../people';

const cabinet = people.filter((person) => person.category === 'cabinet');
const chairs = people.filter((person) => person.category === 'chair');

export function ExecutiveBoardPage() {
  return (
    <div className="bg-background pt-20">
      {/* Hero with Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1743327572772-eca3c63b029e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cabinet.map((exec) => (
              <PersonCard key={exec.id} person={exec} />
            ))}
          </div>
        </div>
      </section>

      {/* Chairs */}
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
    </div>
  );
}
