// Simple "Coming Soon" placeholder shown for pages that aren't ready yet.

export function ComingSoonPage() {
  return (
    <div className="bg-background pt-20 min-h-screen flex items-center justify-center">
      <section className="relative py-16 w-full">
        {/* Background Effects */}
        <div className="absolute inset-0 texture-noise"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 bg-off-white mb-6">
              <span className="text-background text-xs tracking-widest">UNDER CONSTRUCTION</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl text-white mb-6">
              COMING SOON
            </h1>
            
            {/* Description */}
            <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
              Stay tuned.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
