// The Brothers page: the grid of active brothers. To add/remove a brother,
// edit the centralized list in src/people.ts (not this file).

import { ImageWithFallback } from '../ImageWithFallback';
import { PersonCard } from '../PersonCard';
import { people } from '../people';
import brotherhero from '../images/brothershero2.png';

const brothers = people.filter((person) => person.category === 'brother');

export function BrothersPage() {
  return (
    <div className="bg-background pt-20">
      {/* Hero with Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
          src={brotherhero}
          alt="Rush"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="inline-block px-4 py-1.5 bg-off-white mb-4">
            <span className="text-background text-xs tracking-widest">OUR BROTHERHOOD</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            THE BROTHERS
          </h1>
        </div>
      </section>

      {/* Active Brothers */}
      <section className="py-12 bg-surface texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-6 border-l-4 border-off-white pl-3">
            <h2 className="text-3xl text-white">ACTIVE BROTHERS</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {brothers.map((brother) => (
              <PersonCard key={brother.id} person={brother} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
