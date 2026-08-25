// The Home page: hero photo, stats bar, photo gallery, five core values, and rush banner.
// The gallery photos are imported at the top and listed in `photoGallery` below.

import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../ImageWithFallback';
import homehero from '../images/homehero.jpg';
import home11 from '../images/1.1home.png';
import home12 from '../images/1.2home.png';
import home13 from '../images/1.3home.png';
import home14 from '../images/1.4home.jpg';
import home21 from '../images/home2.1.png';
import home22 from '../images/2.2home.jpg';
import home23 from '../images/2.3home.jpeg';
import home24 from '../images/2.4home.png';

export function HomePage() {
  const navigate = useNavigate();
  const photoGallery = [home11, home12, home13, home14, home21, home22, home23, home24];

  return (
    <div className="bg-background">
      {/* Hero Section - Full width image with overlay */}
      <section className="relative h-[85vh]">
        <ImageWithFallback
          src={homehero}
          alt="Lambda Phi Epsilon Brotherhood"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1.5 bg-off-white mb-4">
              <span className="text-background text-xs tracking-widest">DELTA CHAPTER • UC BERKELEY</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight">
              ΛΦΕ
            </h1>
            <h2 className="text-2xl md:text-3xl text-white mb-3">
              LAMBDA PHI EPSILON
            </h2>
            <p className="text-lg md:text-xl text-off-white mb-6 max-w-2xl mx-auto">
              To be Leaders Among Men
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => navigate('/rush')}
                className="px-6 py-3 bg-off-white text-background hover:bg-silver transition-all flex items-center gap-2">
                Rush ΛΦΕ
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/about')}
                className="px-6 py-3 glass-gold text-white border-rough border-off-white/50 hover:border-off-white transition-all">
                About Us
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-navy py-8 relative overflow-hidden">
        {/* Liquid blobs */}
        <div className="liquid-blob liquid-blob-gold w-96 h-96 top-0 left-1/4"></div>
        <div className="liquid-blob liquid-blob-gold w-64 h-64 bottom-0 right-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r border-white/20 last:border-r-0">
              <div className="text-4xl font-black text-off-white">400+</div>
              <div className="text-white text-sm tracking-wider mt-1">ALUMNI</div>
            </div>
            <div className="border-r border-white/20 last:border-r-0">
              <div className="text-4xl font-black text-off-white">38</div>
              <div className="text-white text-sm tracking-wider mt-1">YEARS LEGACY</div>
            </div>
            <div className="border-r border-white/20 last:border-r-0">
              <div className="text-4xl font-black text-off-white">#1</div>
              <div className="text-white text-sm tracking-wider mt-1">ASIAN-INTEREST</div>
            </div>
            <div>
              <div className="text-4xl font-black text-off-white">50+</div>
              <div className="text-white text-sm tracking-wider mt-1">ACTIVE CHAPTERS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid Section */}
      <section className="py-12 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl text-white mb-3">OUR BROTHERHOOD</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photoGallery.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden border-rough border-off-white/20 hover:border-off-white transition-all group">
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
      <section className="py-12 bg-surface texture-noise relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 bg-off-white mb-3">
              <span className="text-background text-xs tracking-widest">OUR FOUNDATION</span>
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
              <div key={pillar.title} className="p-5 bg-navy hover:bg-navy-light border-l-4 border-off-white transition-all">
                <h3 className="text-xl text-white mb-2">{pillar.title}</h3>
                <p className="text-muted text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* NMDP Philanthropic Partner */}
      <section className="py-12 bg-background texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 bg-off-white mb-3">
              <span className="text-background text-xs tracking-widest">OUR IMPACT</span>
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
              <h3 className="text-2xl text-off-white mb-4">
                National Marrow Donor Program (NMDP)
              </h3>
              <div className="space-y-3 text-muted text-sm">
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
                  className="px-6 py-2.5 bg-off-white text-background hover:bg-silver transition-all"
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
      

      {/* CTA Section */}
      <section className="py-16 bg-navy texture-noise relative overflow-hidden">
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
            onClick={() => navigate('/rush')}
            className="px-8 py-3 bg-off-white text-background hover:bg-silver transition-all">
            RUSH INFO
          </button>
        </div>
      </section>
    </div>
  );
}