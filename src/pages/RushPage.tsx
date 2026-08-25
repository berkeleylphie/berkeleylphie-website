// The Rush page: event schedule, video, FAQ, and the interest-form link.
// Rush events are in the `rushEvents` list below; update dates/locations there each semester.

import { Calendar, Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import { PersonCard } from '../PersonCard';
import { useMembers } from '../MembersContext';
import rushhero from '../images/rushhero.png';

interface RushEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attire: string;
}

const rushEvents: RushEvent[] = [
  {
    id: 1,
    title: 'MEET THE BROS',
    date: 'Thursday, August 27',
    time: '8:00 PM',
    location: '2415 Fulton St',
    description: 'Meet the brothers of Lambda Phi Epsilon. Food & refreshments provided by the house.',
    attire: 'Casual'
  },
  {
    id: 2,
    title: 'TACO TUESDAY',
    date: 'Tuesday, September 1',
    time: '9:00 PM',
    location: '2415 Fulton St',
    description: 'Tacos and refreshments. Joined by Berkeley Sigmas.',
    attire: 'Casual'
  },
  {
    id: 3,
    title: 'INFO NIGHT',
    date: 'Wednesday, September 2',
    time: '9:00 PM',
    location: '2415 Fulton St',
    description: 'Learn about the history and traditions of Lambda Phi Epsilon. After party hosted with Berkeley SOPi.',
    attire: 'Casual'
  },
  {
    id: 4,
    title: 'SOCIAL NIGHT',
    date: 'Thursday, September 3',
    time: '8:00 PM',
    location: '2415 Fulton St',
    description: 'Social with Berkeley SYZ.',
    attire: 'Casual'
  },
  {
    id: 5,
    title: 'AFTER PARTY *Invite Only*',
    date: 'Friday, September 4',
    time: '10:00 PM',
    location: '2415 Fulton St',
    description: 'After party hosted with Berkeley Sigmas.',
    attire: 'Casual'
  },
  {
    id: 6,
    title: 'ALUMNI BBQ *Invite Only*',
    date: 'Saturday, September 5',
    time: '2:00 PM',
    location: '2415 Fulton St',
    description: 'Join us for a barbecue with alumni and refreshments before the Cal vs. UCLA football game.',
    attire: 'Casual'
  },
];

export function RushPage() {
  // Rush chairs are just chair-position leadership rows with the title
  // "Rush Chair" — set that in leadership_positions (title column) for the
  // two members who should show up here.
  const { chairs } = useMembers();
  const rushChairs = chairs.filter((person) => person.position === 'Rush Chair');

  return (
    <div className="bg-background pt-20">
      {/* Hero with Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
          src={rushhero}
          alt="Rush"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="inline-block px-4 py-1.5 bg-off-white mb-4">
            <span className="text-background text-xs tracking-widest">FALL 2026 RUSH</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            JOIN THE BROTHERHOOD
          </h1>
          <p className="text-lg text-white/90 mb-6">
            Your journey starts here
          </p>
        </div>
      </section>

      {/* Rush Chairs */}
      {rushChairs.length > 0 && (
        <section className="py-16 bg-surface texture-noise relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-5xl text-white mb-4">MEET YOUR RUSH CHAIRS</h2>
              <p className="text-muted">Reach out with any questions about rush</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {rushChairs.map((chair) => (
                <PersonCard key={chair.id} person={chair} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      <section className="py-16 bg-background texture-noise relative overflow-hidden">

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl text-white mb-4">FALL 2026 SCHEDULE</h2>
          </div>

          <div className="space-y-4">
            {rushEvents.map((event) => (
              <div key={event.id} className="p-6 bg-navy border-l-4 border-off-white hover:bg-navy-light transition-all">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl text-white mb-2">{event.title}</h3>
                    <p className="text-muted mb-4">{event.description}</p>
                    <div className="flex flex-col md:flex-row gap-6 text-sm text-muted">
                      <div className="flex items-center gap-2 md:flex-1">
                        <Calendar className="w-4 h-4 text-off-white flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 md:flex-1">
                        <Clock className="w-4 h-4 text-off-white flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 md:flex-1">
                        <MapPin className="w-4 h-4 text-off-white flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-off-white/20 border-rough border-off-white text-off-white text-sm">
                    {event.attire}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are - Side by Side */}
      <section className="py-12 bg-surface texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
            <div className="aspect-video relative overflow-hidden">
              <iframe
              src="https://www.instagram.com/reel/DccUcochIs5/embed"
              title="Instagram Reel"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              />
              </div>
            </div>
            <div className="relative">
              <div className="inline-block px-3 py-1 bg-off-white mb-3">
                <span className="text-background text-xs tracking-widest">WHY RUSH?</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-white mb-4">
                THE OPPORTUNITY
              </h2>
              <div className="space-y-3 text-muted text-sm">
                <p>
                  Founded in 1981, Lambda Phi Epsilon is the world's largest Asian-interest fraternity. 
                  Our Delta Chapter at UC Berkeley has been a pillar of the campus community for decades.
                </p>
                <p>
                  We guide men on a journey of authenticity and growth. Through our core values, 
                  we develop leaders who make lasting impact in their communities.
                </p>
                <p>
                  This isn't about parties. It's about purpose. Legacy. Brotherhood for life.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfdbHGs9TftPR3ztGLettJwGVrl5VwOD_1k54VtCdde33FFmg/viewform')}
                  className="px-6 py-2.5 glass-gold border-rough border-off-white text-white hover:bg-off-white hover:text-background transition-all">
                  FA26 Interest Form
                </button>
                <button
                  onClick={() => window.open('https://www.instagram.com/berkeleylphie/')}
                  className="px-6 py-2.5 glass-gold border-rough border-off-white text-white hover:bg-off-white hover:text-background transition-all">
                  Follow Our Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl text-white text-center mb-12">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'WHO CAN RUSH?', a: 'Any male-identifying UC Berkeley student in good academic standing.' },
              { q: 'DO I HAVE TO ATTEND ALL EVENTS?', a: 'Not required, but encouraged. Rush is designed to give interested individuals a glimpse into the real fraternity life, so the more you see it and feel it for yourself the better.' },
              { q: 'WHAT IS RUSH?', a: 'Rush is a period at the beginning of the semester where interested students can come to our events to meet the brothers and learn more about the fraternity.' },
              { q: 'AFTER RUSH?', a: 'Selected candidates receive bids to join our associate member program.' },
              { q: 'IS LAMBDA PHI EPSILON A HAZING-FREE ORGANIZATION?', a: 'Absolutely. Lambda Phi Epsilon has a strict anti-hazing policy. Our pledging process is designed to build brotherhood, leadership, and personal growth in a safe and supportive environment.' },
              { q: 'QUESTIONS?', a: 'Our rush chairs are here to help, feel free to email them. Access our interest form and follow our Instagram above!' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-surface border-l-4 border-off-white hover:bg-navy-light">
                <h3 className="text-xl text-white mb-2">{item.q}</h3>
                <p className="text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}