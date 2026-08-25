// The one card design used everywhere we show a person (Brothers, Executive
// Board, Alumni pages). Change the look here and it updates everywhere.

import { ImageWithFallback } from './ImageWithFallback';
import type { DisplayPerson } from './members';

export function PersonCard({ person }: { person: DisplayPerson }) {
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
        {person.category === 'brother' || person.category === 'alumni' ? (
          <div className="space-y-1 text-xs text-muted">
            <div>{person.major || '—'}</div>
            <div>Class of {person.gradYear || '—'}</div>
            <div>From {person.hometown || '—'}</div>
            <div>Crossed {person.year || '—'}</div>
          </div>
        ) : (
          <div className="space-y-1 text-xs text-muted">
            <div>{person.position}</div>
            <div>{person.email || '—'}</div>
          </div>
        )}
      </div>
    </div>
  );
}
