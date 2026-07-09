// The footer at the bottom of every page: quick links, contact info, and social links.

import { Mail, Instagram } from 'lucide-react';
import wcrest from './images/wcrest.png';

type Page = 'home' | 'about' | 'brothers' | 'executives' | 'alumni' | 'rush' | 'login' | 'protected';

export function Footer({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) {
  return (
    <footer className="bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Branding Section */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-20 h-20 p-1.5 flex items-center justify-center">
                <img src={wcrest} alt="Lambda Phi Epsilon Crest" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-white tracking-wider">LAMBDA PHI EPSILON</div>
                <div className="text-white text-xs tracking-widest">DELTA CHAPTER</div>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              UC Berkeley's founding chapter, building leaders and creating legacy since 1988.
            </p>
            <div className="mt-3 text-muted text-xs">
              <div>University of California, Berkeley</div>
              <div>Berkeley, CA 94720</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-3 border-b-2 border-white pb-2 inline-block">QUICK LINKS</h3>
            <div className="space-y-1.5">
              <button
                onClick={() => setCurrentPage('about')}
                className="block text-muted hover:text-white transition-colors text-sm"
              >
                About Us
              </button>
              <button
                onClick={() => setCurrentPage('executives')}
                className="block text-muted hover:text-white transition-colors text-sm"
              >
                Executive Board
              </button>
              <button
                onClick={() => setCurrentPage('alumni')}
                className="block text-muted hover:text-white transition-colors text-sm"
              >
                Alumni Network
              </button>
              <button
                onClick={() => setCurrentPage('rush')}
                className="block text-muted hover:text-white transition-colors text-sm"
              >
                Rush Information
              </button>
              <a
                href="https://www.lambdaphiepsilon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted hover:text-white transition-colors text-sm"
              >
                National Website ↗
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white mb-3 border-b-2 border-white pb-2 inline-block">CONTACT US</h3>
            <div className="space-y-2.5">
              <a
                href="https://forms.gle/3qW7TMq2B86cZ8b26"
                className="flex items-center gap-2.5 text-muted hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 bg-navy flex items-center justify-center border-rough border-white/30 group-hover:border-white transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs text-white">Rush Inquiries</div>
                  <div className="text-xs">FA26 Interest Form</div>
                </div>
              </a>
              
              <a
                href="mailto:contact@lambdaphiepsilon-berkeley.org"
                className="flex items-center gap-2.5 text-muted hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 bg-navy flex items-center justify-center border-rough border-white/30 group-hover:border-white transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs text-white">General Contact</div>
                  <div className="text-xs">contact@lpe-berkeley.org</div>
                </div>
              </a>

              <a
                href="https://www.instagram.com/berkeleylphie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-muted hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 bg-navy flex items-center justify-center border-rough border-white/30 group-hover:border-white transition-all">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs text-white">Follow Us</div>
                  <div className="text-xs">@berkeleylphie</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-muted text-xs">
            <div>
              © {new Date().getFullYear()} Lambda Phi Epsilon International Fraternity, Inc. - Delta Chapter. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white">Brotherhood • Leadership • Culture • Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}