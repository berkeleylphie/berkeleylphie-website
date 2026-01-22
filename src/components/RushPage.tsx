import { Calendar, Clock, MapPin, Users, MessageCircle, CheckCircle, Mail, User, FileText } from 'lucide-react';
import { ImageWithFallback } from './effects/ImageWithFallback';
import { useState } from 'react';
import rushhero from '../assets/images/rushhero.png';

type Page = 'home' | 'about' | 'brothers' | 'executives' | 'alumni' | 'rush' | 'login' | 'protected';

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
    date: 'Thursday, January 22',
    time: '9:00 PM - 11:00 PM',
    location: 'Chapter House',
    description: 'Come meet our brothers. Learn about who we are. After party with Berkeley Sigmas',
    attire: 'Casual'
  },
  {
    id: 2,
    title: 'HOUSE BBQ',
    date: 'Saturday, January 24',
    time: '5:00 PM - 9:00 PM',
    location: 'Chapter House',
    description: 'Games, food, and brotherhood.',
    attire: 'Casual'
  },
  {
    id: 3,
    title: 'TACO TUESDAY',
    date: 'Tuesday, January 27',
    time: '9:00 PM - 11:00 PM',
    location: 'Chapter House',
    description: 'Tacos and mingling with brothers and Berkeley Sigmas',
    attire: 'Casual'
  },
  {
    id: 4,
    title: 'INFO NIGHT',
    date: 'Wednesday, January 28',
    time: '9:00 pm - 11:00 PM',
    location: 'Chapter House',
    description: 'Learn the history and values of Lambda Phi Epsilon. After party with Berkeley SOPi',
    attire: 'Smart Casual'
  },
  {
    id: 5,
    title: 'SOCIAL NIGHT',
    date: 'Thursday, January 29',
    time: '9:00 PM - 11:00 PM',
    location: 'Chapter House',
    description: 'Last chance before interviews. Joined by Berkeley aKDPhi',
    attire: 'Casual'
  },
  {
    id: 6,
    title: 'RUSH PARTY',
    date: 'Friday, January 30',
    time: '10:00 PM',
    location: 'Chapter House',
    description: ' ',
    attire: 'Casual'
  },
];

export function RushPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: '',
    major: '',
    phone: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send data to a backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', year: '', major: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-[#0a0a0f] pt-20">
      {/* Hero with Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
          src={rushhero}
          alt="Rush"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="inline-block px-4 py-1.5 bg-[#f8f8f8] mb-4">
            <span className="text-[#0a0a0f] text-xs tracking-widest">SPRING 2025 RUSH</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            JOIN THE BROTHERHOOD
          </h1>
          <p className="text-lg text-white/90 mb-6">
            Your journey starts here
          </p>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-[#0a0a0f] texture-noise relative overflow-hidden">
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl text-white mb-4">SPRING 2025 SCHEDULE</h2>
          </div>

          <div className="space-y-4">
            {rushEvents.map((event) => (
              <div key={event.id} className="p-6 bg-[#172841] border-l-4 border-[#f8f8f8] hover:bg-[#324a6e] transition-all">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl text-white mb-2">{event.title}</h3>
                    <p className="text-[#9ca3af] mb-4">{event.description}</p>
                    <div className="flex flex-col md:flex-row gap-6 text-sm text-[#9ca3af]">
                      <div className="flex items-center gap-2 md:flex-1">
                        <Calendar className="w-4 h-4 text-[#f8f8f8] flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 md:flex-1">
                        <Clock className="w-4 h-4 text-[#f8f8f8] flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 md:flex-1">
                        <MapPin className="w-4 h-4 text-[#f8f8f8] flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-[#f8f8f8]/20 border-rough border-[#f8f8f8] text-[#f8f8f8] text-sm">
                    {event.attire}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are - Side by Side */}
      <section className="py-12 bg-[#141419] texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-video relative overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/rushvideo"
                  title="Rush Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="relative">
              <div className="inline-block px-3 py-1 bg-[#ffffff] mb-3 gold-shimmer">
                <span className="text-[#0a0a0f] text-xs tracking-widest">WHY RUSH?</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-white mb-4">
                THE OPPORTUNITY
              </h2>
              <div className="space-y-3 text-[#9ca3af] text-sm">
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
              <button 
                onClick={() => window.open('https://forms.gle/3qW7TMq2B86cZ8b26')}
                className="mt-5 px-6 py-2.5 glass-gold border-rough border-[#ffffff] text-white hover:bg-[#ffffff] hover:text-[#0a0a0f] transition-all">
                SP25 Interest Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0a0a0f] relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl text-white text-center mb-12">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'WHO CAN RUSH?', a: 'Any male-identifying UC Berkeley student in good academic standing.' },
              { q: 'DO I HAVE TO ATTEND ALL EVENTS?', a: 'Not required, but encouraged. Rush is designed to give interested individuals a glimpse into the real fraternity life, so the more you see it and feel it for yourself the better.' },
              { q: 'WHAT IS RUSH?', a: 'Rush is a period at the beginning of the semester where interested students can come to our events to meet the brothers and learn more about the fraternity.' },
              { q: 'AFTER RUSH?', a: 'Selected candidates receive bids to join our associate member program.' },
              { q: 'IS LAMBDA PHI EPSILON A HAZING-FREE ORGANIZATION?', a: 'Absolutely. Lambda Phi Epsilon has a strict anti-hazing policy. Our pledging process is designed to build brotherhood, leadership, and personal growth in a safe and supportive environment.' },
              { q: 'QUESTIONS?', a: 'Our rush chairs are here to help tayler@berkeley.edu, rush@lambdaphiepsilon.berkeley.edu. Click here to access the SP25 Interest Form.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-[#141419] border-l-4 border-[#f8f8f8] hover:bg-[#324a6e]">
                <h3 className="text-xl text-white mb-2">{item.q}</h3>
                <p className="text-[#9ca3af]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}