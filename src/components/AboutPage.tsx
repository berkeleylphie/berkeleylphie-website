import { Calendar, MapPin, Award, Target, Users, Heart, Trophy, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './effects/ImageWithFallback';
import { useState } from 'react';
import abouthero from '../assets/images/abouthero.png';
import ourhistory from '../assets/images/ourhistory.png';
import achievement from '../assets/images/achievement.png';
import brotherhood from '../assets/images/brotherhood.png';
import service from '../assets/images/service.png';
import culture from '../assets/images/culture.png';

type Page = 'home' | 'about' | 'brothers' | 'executives' | 'alumni' | 'rush' | 'login' | 'protected';

export function AboutPage({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) {
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);

  const timelineEvents = [
    {
      period: 'FALL 1988',
      title: 'Charter Secured, First Officers Elected',
      description: 'Douglas Nishida officially obtained the Charter of Lambda Phi Epsilon from Craig Ishigo, founder of the Alpha Chapter at UCLA, marking the formal establishment of the Delta Chapter at UC Berkeley.',
      details: [
        'The Charter Class',
        'Douglas Nishida — Charter President',
        'Bryan Nobida — Second Vice President (Social)',
        'Tan Thinh — Treasurer',
        'Alex Anh, Vernon Fong, Louis Kao, Eric Kwan, Ernest Ngo, Tan Thinh, Vince Young, Henri Ainai, Greg Fujikawa, Marc Kikuchi, Thuan Le, Douglas Nishida, Ronald Wagner, Stephen Chan, Danny Hion, James Kim, Alan Lin, Bryan Nobida, Chris Wong, Edward Chow, Michael Ide, Dennis Kung, Greg Ng, Nirav Shah, Marcus Wong'
      ]
    },
    {
      period: 'SPRING 1989',
      title: 'Admitted to UC Berkeley IFC (Colony Status)',
      description: 'After a screening process, Lambda Phi Epsilon was admitted into the UC Berkeley Interfraternity Council as a colony, marking its official recognition by the university.'
    },
    {
      period: 'SPRING 1990',
      title: 'Full IFC Membership',
      description: 'Lambda Phi Epsilon was granted full membership privileges within the UC Berkeley IFC, solidifying its standing as an established fraternity on campus.'
    },
    {
      period: 'FALL 2025',
      title: 'Rechartered as an MGC Organization',
      description: 'In Fall 2025, Lambda Phi Epsilon at UC Berkeley was officially rechartered as a Multicultural Greek Council (MGC) organization. This revival was led by a strong and committed Founding Recharter Class of 15, whose leadership and dedication restored the chapter\'s presence on campus and set a renewed foundation for brotherhood, cultural engagement, and long-term sustainability.',
      details: [
        'Founding Recharter Class:',
        'Daniel Phan, Tommy Zeng, Alex Siu, David Shi, Jason Pham, Hunter Flores, Matthew Lee, Ingu Hwang, Tayler Nguyen, Colin Suzuki, Shashwat Shrestha, Jordan Kim, Jeffrey Wu, Jason Yang, Yenadi Aye'
      ]
    }
  ];

  const pillars = [
    { 
      title: 'BROTHERHOOD', 
      desc: 'Lifelong bonds built on trust, respect, and shared values.',
      img: brotherhood,
    },
    { 
      title: 'ACHIEVEMENT', 
      desc: 'Excellence in academics, leadership, and personal growth.',
      img: achievement,
    },
    { 
      title: 'SERVICE', 
      desc: 'Making meaningful impact in our communities.',
      img: service,
    },
    { 
      title: 'CULTURE', 
      desc: 'Celebrating heritage and embracing diversity.',
      img: culture,
    },
  ];
  
  return (
    <div className="bg-[#0a0a0f] pt-20">
      {/* Hero with Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
        src={abouthero}
        alt="Rush"
        className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="inline-block px-4 py-1.5 bg-[#f8f8f8] mb-4">
            <span className="text-[#0a0a0f] text-xs tracking-widest">OUR STORY</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            ABOUT US
          </h1>
        </div>
      </section>

      {/* History with Image */}
      <section className="py-12 bg-[#141419] texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl text-white mb-4">OUR HISTORY</h2>
              <div className="space-y-3 text-[#9ca3af] text-sm">
                <p>
                Our mission is to provide Asian and Asian American men with a brotherhood that cultivates leadership, integrity, 
                and cultural awareness. We strive to empower our members to make positive contributions to their communities while honoring their heritage.
                </p>
                <p>
                The Delta Chapter at UC Berkeley has been a cornerstone of Asian American leadership and brotherhood on campus for decades. 
                Our chapter was established to provide a home for students seeking cultural connection, academic excellence, and lifelong friendships.
                </p>
                <p>
                Through the years, our chapter has grown to become one of the most respected organizations at UC Berkeley, producing alumni who have 
                gone on to become leaders in business, technology, medicine, law, and public service.
                </p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { icon: Calendar, label: 'Founded', value: 'Aug 17, 1988' },
                  { icon: MapPin, label: 'Delta Chapter', value: 'UC Berkeley' },
                  { icon: Award, label: 'Recognition', value: '#1 Asian-Interest' },
                  { icon: Target, label: 'Network', value: '400+ Alumni' },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-[#172841] border-rough border-[#f8f8f8]/30">
                    <item.icon className="w-5 h-5 text-[#f8f8f8] mb-1.5" />
                    <div className="text-xs text-[#9ca3af] mb-0.5">{item.label}</div>
                    <div className="text-white text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/3] overflow-hidden border-rough border-[#f8f8f8]">
              <ImageWithFallback
              src={ourhistory}
              alt="Brotherhood retreat"
              className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-12 bg-[#0a0a0f] texture-noise relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl text-white mb-3">OUR JOURNEY</h2>
            <p className="text-sm text-[#9ca3af] max-w-2xl mx-auto">
              From a vision in 1988 to a renewed legacy in 2025
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/20"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index} 
                  className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
                  onClick={() => setActiveTimelineItem(activeTimelineItem === index ? null : index)}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-8 md:left-1/2 w-3 h-3 -ml-1.5 bg-white rounded-full border-3 border-[#0a0a0f] z-10 cursor-pointer hover:scale-150 transition-transform ${activeTimelineItem === index ? 'scale-150' : ''}`}></div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'}`}>
                    <div className={`p-4 bg-[#141419] border-rough border-white/30 hover:border-white transition-all cursor-pointer ${activeTimelineItem === index ? 'border-white' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-2.5 py-0.5 bg-white text-[#0a0a0f] text-xs tracking-wider">
                          {event.period}
                        </div>
                      </div>
                      <h3 className="text-lg text-white mb-2">{event.title}</h3>
                      
                      {/* Expandable content */}
                      {activeTimelineItem === index && (
                        <>
                          <p className="text-[#9ca3af] leading-relaxed text-sm">
                            {event.description}
                          </p>
                          {event.details && (
                            <div className="mt-3 pt-3 border-t border-white/20">
                              <ul className="space-y-1.5 text-[#9ca3af] text-xs">
                                {event.details.map((detail, i) => (
                                  <li key={i} className={i === 0 ? 'font-bold text-white text-sm' : ''}>
                                    {i === 0 ? detail : `• ${detail}`}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="mt-3 text-white text-xs">
                        {activeTimelineItem === index ? 'Click to collapse ▲' : 'Click to expand ▼'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars with Images */}
      <section className="py-12 bg-[#141419] texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl text-white mb-3">FOUR PILLARS</h2>
            <p className="text-sm text-[#9ca3af] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="group relative overflow-hidden border-rough border-[#ffffff]/30 hover:border-[#ffffff] transition-all">
                <div className="aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src={pillar.img}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="bg-[#172841] p-5 relative">
                  <div className="glass-overlay"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl text-white mb-2">{pillar.title}</h3>
                    <p className="text-[#9ca3af] text-sm">{pillar.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}