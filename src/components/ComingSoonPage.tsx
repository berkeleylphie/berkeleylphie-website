import { Clock, Mail } from 'lucide-react';

export function ComingSoonPage() {
  return (
    <div className="bg-[#0a0a0f] pt-20 min-h-screen flex items-center justify-center">
      <section className="relative py-16 w-full">
        {/* Background Effects */}
        <div className="absolute inset-0 texture-noise"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 bg-[#f8f8f8] mb-6">
              <span className="text-[#0a0a0f] text-xs tracking-widest">UNDER CONSTRUCTION</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl text-white mb-6">
              COMING SOON
            </h1>
            
            {/* Description */}
            <p className="text-xl text-[#9ca3af] mb-12 max-w-2xl mx-auto">
              Stay tuned.
            </p>
            
            {/* {/* Glass Card */}
            {/* <div className="max-w-xl mx-auto p-8 glass-card mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-[#f8f8f8]" />
                <h2 className="text-2xl text-white">LAUNCHING SOON</h2>
              </div>
              <p className="text-[#9ca3af] text-sm">
                This page is currently under development. Check back soon for updates.
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
