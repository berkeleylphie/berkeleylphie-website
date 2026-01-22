import { ImageWithFallback } from './effects/ImageWithFallback';
import { GraduationCap, MapPin } from 'lucide-react';
import brotherhero from '../assets/images/brothershero2.png';
import alex from '../assets/headshots/alex.png';
import colin from '../assets/headshots/colin.png';
import daniel from '../assets/headshots/daniel.png';
import david from '../assets/headshots/david.png';
import ingu from '../assets/headshots/ingu.png';
import jeff from '../assets/headshots/jeff.png';
import jordan from '../assets/headshots/jordan.png';
import jpham from '../assets/headshots/jpham.png';
import jyang from '../assets/headshots/jyang.png';
import hunter from '../assets/headshots/hunter.png';
import matt from '../assets/headshots/matt.png';
import tayler from '../assets/headshots/tayler.png';
import tommy from '../assets/headshots/tommy.png';



type Page = 'home' | 'about' | 'brothers' | 'executives' | 'alumni' | 'rush' | 'login' | 'protected' | 'coming';

interface Brother {
  id: number;
  name: string;
  year: string;
  major: string;
  position?: string;
  hometown: string;
  image: string;
}

const brothers: Brother[] = [
  { id: 1, name: 'Alex Siu', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'alex'},
  { id: 2, name: 'Colin Suzuki', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'colin' },
  { id: 3, name: 'Daniel Phan', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'daniel' },
  { id: 4, name: 'David Shi', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'david' },
  { id: 5, name: 'Hunter Flores', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'https://images.unsplash./photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop' },
  { id: 6, name: 'Ingu Hwang', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'ingu' },
  { id: 7, name: 'Jason Pham', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'jpham' },
  { id: 8, name: 'Jason Yang', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'jyang' },
  { id: 9, name: 'Jeffrey Wu', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'jeff' },
  { id: 10, name: 'Jordan Kim', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'jordan' },
  { id: 11, name: 'Matthew Lee', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'matt' },
  { id: 12, name: 'Shash Shrestha', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'https://images..com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop' },
  { id: 13, name: 'Tayler Nguyen', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'tayler' },
  { id: 14, name: 'Tommy Zeng', year: 'Year', major: 'Major', hometown: 'Hometown', image: 'tommy' },
  { id: 15, name: 'Yenadi Aye', year: 'Year', major: 'Major', hometown: 'Hometown' },
];

function BrotherCard({ brother }: { brother: Brother }) {
  return (
    <div className="group border-rough border-[#f8f8f8]/30 hover:border-[#f8f8f8] transition-all bg-[#141419]">
      <div className="aspect-square overflow-hidden">
        <img 
          src={brother.image} 
          alt={brother.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 bg-[#172841]">
        <h3 className="text-xl text-white mb-1">{brother.name}</h3>
        {brother.position && (
          <div className="text-[#f8f8f8] text-sm mb-2 tracking-wider">{brother.position}</div>
        )}
        <div className="space-y-1 text-xs text-[#9ca3af]">
          <div className="flex items-center gap-2">
            <span>{brother.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{brother.major}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{brother.hometown}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrothersPage() {
  return (
    <div className="bg-[#0a0a0f] pt-20">
      {/* Hero with Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
          src={brotherhero}
          alt="Rush"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="inline-block px-4 py-1.5 bg-[#f8f8f8] mb-4">
            <span className="text-[#0a0a0f] text-xs tracking-widest">OUR BROTHERHOOD</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            THE BROTHERS
          </h1>
        </div>
      </section>

      {/* Active Brothers */}
      <section className="py-12 bg-[#141419] texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-6 border-l-4 border-[#f8f8f8] pl-3">
            <h2 className="text-3xl text-white">ACTIVE BROTHERS</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {brothers.map((brother) => (
              <BrotherCard key={brother.id} brother={brother} />
            ))}
          </div>
        </div>
      </section>

      {/* Brotherhood Photos */}
      {/* <section className="py-10 bg-[#0a0a0f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl text-white text-center mb-6">BROTHERHOOD MOMENTS</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1708447135262-850979354fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmF0ZXJuaXR5JTIwYnJvdGhlcmhvb2R8ZW58MXx8fHwxNzY3MDk5NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1763651959357-7382188b500f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwZ3JvdXAlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjcxMDA1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1760992004210-44a502a2872d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzZXJ2aWNlJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NjY5OTA2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1759694384846-fe2e5c46e76e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwdGVhbSUyMGh1ZGRsZXxlbnwxfHx8fDE3NjcxMDA1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1624639643276-84fc785f75e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5uZXIlMjBwYXJ0eSUyMGZyaWVuZHN8ZW58MXx8fHwxNjcxMDA1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1760348082270-3a46a3512850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VsZWJyYXRpb24lMjBncm91cHxlbnwxfHx8fDE3NjcxMDA1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1759662232612-1afda6c0d2ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBldmVudCUyMGdyb3VwfGVufDF8fHx8MTc2NzEwMDU3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              'https://images.unsplash.com/photo-1593739742226-5e5e2fdb1f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBncm91cCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NjcxMDA1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            ].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden border-rough border-[#f8f8f8]/20 hover:border-[#f8f8f8] transition-all group">
                <ImageWithFallback
                  src={src}
                  alt={`Brotherhood ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}