import { ArrowRight, Users, Heart, Trophy, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './effects/ImageWithFallback';
import homehero from '../assets/images/homehero.jpg';
import home11 from '../assets/images/1.1home.png';
import home12 from '../assets/images/1.2home.png';
import home13 from '../assets/images/1.3home.png';
import home14 from '../assets/images/1.4home.jpg';
import home21 from '../assets/images/home2.1.png';
import home22 from '../assets/images/2.2home.jpg';
import home23 from '../assets/images/2.3home.jpeg';
import home24 from '../assets/images/2.4home.png';


type Page = 'home' | 'about' | 'brothers' | 'executives' | 'alumni' | 'rush' | 'login' | 'protected';


export function HomePage({ currentPage, setCurrentPage }: { currentPage: Page; setCurrentPage: (page: Page) => void })
{
  const photoGallery = [home11, home12, home13, home14, home21, home22, home23, home24];

  return (
    <div className="bg-[#0a0a0f]">
      {/* Hero Section - Full width image with overlay */}
      <section className="relative h-[85vh]">
        <ImageWithFallback
          src={homehero}
          alt="Lambda Phi Epsilon Brotherhood"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1.5 bg-[#f8f8f8] mb-4">
              <span className="text-[#0a0a0f] text-xs tracking-widest">DELTA CHAPTER • UC BERKELEY</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight">
              ΛΦΕ
            </h1>
            <h2 className="text-2xl md:text-3xl text-white mb-3">
              LAMBDA PHI EPSILON
            </h2>
            <p className="text-lg md:text-xl text-[#f8f8f8] mb-6 max-w-2xl mx-auto">
              To be Leaders Among Men
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button 
                onClick={() => setCurrentPage('rush')}
                className="px-6 py-3 bg-[#ffffff] text-[#0a0a0f] hover:bg-[#bebebe] transition-all flex items-center gap-2 gold-shimmer">
                Rush ΛΦΕ
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setCurrentPage('about')}
                className="px-6 py-3 glass-gold text-white border-rough border-[#ffffff]/50 hover:border-[#ffffff] transition-all">
                About Us
              </button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-[#172841] py-8 relative overflow-hidden">
        {/* Liquid blobs */}
        <div className="liquid-blob liquid-blob-gold w-96 h-96 top-0 left-1/4"></div>
        <div className="liquid-blob liquid-blob-gold w-64 h-64 bottom-0 right-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r border-white/20 last:border-r-0">
              <div className="text-4xl font-black text-[#f8f8f8]">400+</div>
              <div className="text-white text-sm tracking-wider mt-1">ALUMNI</div>
            </div>
            <div className="border-r border-white/20 last:border-r-0">
              <div className="text-4xl font-black text-[#f8f8f8]">38</div>
              <div className="text-white text-sm tracking-wider mt-1">YEARS LEGACY</div>
            </div>
            <div className="border-r border-white/20 last:border-r-0">
              <div className="text-4xl font-black text-[#f8f8f8]">#1+</div>
              <div className="text-white text-sm tracking-wider mt-1">ASIAN-INTEREST</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#f8f8f8]">50+</div>
              <div className="text-white text-sm tracking-wider mt-1">ACTIVE CHAPTERS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid Section */}
      <section className="py-12 bg-[#0a0a0f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl text-white mb-3">OUR BROTHERHOOD</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photoGallery.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden border-rough border-[#ffffff]/20 hover:border-[#ffffff] transition-all group">
                <ImageWithFallback
                  src={src}
                  alt={`Brotherhood ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Core Values */}
      <section className="py-12 bg-[#141419] texture-noise relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 bg-[#f8f8f8] mb-3">
              <span className="text-[#0a0a0f] text-xs tracking-widest">OUR FOUNDATION</span>
            </div>
            <h2 className="text-3xl text-white mb-3">FIVE CORE VALUES</h2>
          </div>

          <div className="space-y-4">
            {[
              { title: 'AUTHENTICITY', desc: 'Demonstration of one\'s true self to the world, despite external expectations.' },
              { title: 'COURAGEOUS LEADERSHIP', desc: 'Integrity through action toward a more humane world, especially in times of adversity.' },
              { title: 'CULTURAL HERITAGE', desc: 'Ideas and experiences of a people, transcending the world through generations.' },
              { title: 'LOVE', desc: 'Care and respect for oneself, the brotherhood, and the world.' },
              { title: 'WISDOM', desc: 'Pursuit of understanding and its positive application toward one\'s life and the world.' },
            ].map((pillar) => (
              <div key={pillar.title} className="p-5 bg-[#172841] hover:bg-[#324a6e] border-l-4 border-[#f8f8f8] transition-all">
                <h3 className="text-xl text-white mb-2">{pillar.title}</h3>
                <p className="text-[#9ca3af] text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* NMDP Philanthropic Partner */}
      <section className="py-12 bg-[#0a0a0f] texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 bg-[#f8f8f8] mb-3">
              <span className="text-[#0a0a0f] text-xs tracking-widest">OUR IMPACT</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-white mb-3">PHILANTHROPIC PARTNER</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Video Section */}
            <div className="order-2 lg:order-1">
              <div className="aspect-video relative overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/MlA4KEbI1Gw"
                  title="NMDP Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2 relative">
              <h3 className="text-2xl text-[#f8f8f8] mb-4">
                National Marrow Donor Program (NMDP)
              </h3>
              <div className="space-y-3 text-[#9ca3af] text-sm">
                <p>
                  Lambda Phi Epsilon is proud to partner with the National Marrow Donor Program (NMDP), 
                  working together to save lives through bone marrow and blood stem cell transplants.
                </p>
                <p>
                  As an international fraternity, we recognize the critical need for diverse donors in the registry. 
                  Asian Americans and Pacific Islanders represent only 6% of the registry, yet they make up a significant 
                  portion of those in need of transplants.
                </p>
                <p>
                  Through our partnership, we host donor registration drives, raise awareness, and give our brothers 
                  the opportunity to become potential life-savers.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a 
                  href="https://bethematch.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#ffffff] text-[#0a0a0f] hover:bg-[#bebebe] transition-all gold-shimmer"
                >
                  Join Registry
                </a>
                <a 
                  href="https://fundraise.nmdp.org/events/870" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 glass-gold text-white border-rough border-white/50 hover:border-white transition-all"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Who We Are - Side by Side */}
      {/* <section className="py-12 bg-[#141419] texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="aspect-[4/3] overflow-hidden border-rough border-[#ffffff] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29sbGVnZSUyMHN0dWRlbnRzJTIwZ3JvdXB8ZW58MXx8fHwxNzY3MDczNTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Brotherhood"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-4 border-[#ffffff]/20 pointer-events-none"></div>
              </div>
            </div>
            <div className="relative">
              <div className="inline-block px-3 py-1 bg-[#ffffff] mb-3 gold-shimmer">
                <span className="text-[#0a0a0f] text-xs tracking-widest">WHO WE ARE</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-white mb-4">
                MORE THAN A FRATERNITY
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
              <button className="mt-5 px-6 py-2.5 glass-gold border-rough border-[#ffffff] text-white hover:bg-[#ffffff] hover:text-[#0a0a0f] transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-[#172841] texture-noise relative overflow-hidden">
        {/* Liquid blobs */}
        <div className="liquid-blob liquid-blob-gold w-[400px] h-[400px] top-1/2 -translate-y-1/2 left-10"></div>
        <div className="liquid-blob liquid-blob-gold w-[350px] h-[350px] bottom-10 right-10"></div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl text-white mb-4">
            READY TO JOIN?
          </h2>
          <p className="text-lg text-white/80 mb-6">
            Rush is your opportunity to discover what Lambda Phi Epsilon is all about.
          </p>
          <button 
            onClick={() => setCurrentPage('rush')}
            className="px-8 py-3 bg-[#ffffff] text-[#0a0a0f] hover:bg-[#bebebe] transition-all gold-shimmer">
            RUSH INFO
          </button>
        </div>
      </section>
    </div>
  );
}