// The one card design used everywhere we show a person (Brothers, Executive
// Board, Alumni pages). Change the look here and it updates everywhere.

import { ImageWithFallback } from './ImageWithFallback';
import type { Person } from './people';

export function PersonCard({ person }: { person: Person }) {
  return (
    <div className="group border-rough border-off-white/30 hover:border-off-white transition-all bg-surface">
      <div className="aspect-square overflow-hidden">
        <ImageWithFallback
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 bg-navy">
        <h3 className="text-xl text-white mb-1">{person.name}</h3>
        <div className="space-y-1 text-xs text-muted">
          <div>{person.year}</div>
          <div>{person.major}</div>
          <div>{person.hometown}</div>
        </div>
      </div>
    </div>
  );
}
