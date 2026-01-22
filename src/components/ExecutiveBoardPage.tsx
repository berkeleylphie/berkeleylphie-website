import { Briefcase, Target, Star } from 'lucide-react';
import { ImageWithFallback } from './effects/ImageWithFallback';

type Page = 'home' | 'about' | 'brothers' | 'executives' | 'alumni' | 'rush' | 'login' | 'protected';

interface Executive {
  id: number;
  name: string;
  position: string;
  year: string;
  major: string;
  hometown: string;
  image: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const cabinet: Executive[] = [
  { id: 1, name: 'Michael Chen', position: 'President', year: 'Senior', major: 'Computer Science', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', icon: Briefcase },
  { id: 2, name: 'Jason Park', position: 'Vice President', year: 'Junior', major: 'Business Administration', hometown: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', icon: Star },
  { id: 3, name: 'David Kim', position: 'Treasurer', year: 'Junior', major: 'Economics', hometown: 'San Diego, CA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', icon: Target },
  { id: 4, name: 'Andrew Wong', position: 'Secretary', year: 'Sophomore', major: 'Mechanical Engineering', hometown: 'Oakland, CA', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop', icon: Target },
  { id: 5, name: 'Ryan Lee', position: 'Recruitment Director', year: 'Junior', major: 'Electrical Engineering', hometown: 'Irvine, CA', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', icon: Target },
];

const chairs: Executive[] = [
  { id: 6, name: 'Kevin Nguyen', position: 'Social Chair', year: 'Junior', major: 'Data Science', hometown: 'San Jose, CA', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop', icon: Target },
  { id: 7, name: 'Steven Tran', position: 'Philanthropy Chair', year: 'Junior', major: 'Political Science', hometown: 'Sacramento, CA', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop', icon: Target },
  { id: 8, name: 'Daniel Liu', position: 'Academic Chair', year: 'Sophomore', major: 'Biology', hometown: 'Fremont, CA', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop', icon: Target },
  { id: 9, name: 'Alex Patel', position: 'Athletics Chair', year: 'Sophomore', major: 'Chemistry', hometown: 'Berkeley, CA', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop', icon: Target },
  { id: 10, name: 'Chris Wang', position: 'Brotherhood Chair', year: 'Sophomore', major: 'Architecture', hometown: 'Pasadena, CA', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop', icon: Target },
  { id: 11, name: 'Brandon Zhou', position: 'Professional Development Chair', year: 'Sophomore', major: 'Mathematics', hometown: 'Walnut Creek, CA', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop', icon: Target },
  { id: 12, name: 'Eric Yamamoto', position: 'Cultural Chair', year: 'Sophomore', major: 'Ethnic Studies', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop', icon: Target },
  { id: 13, name: 'Marcus Tan', position: 'Public Relations Chair', year: 'Sophomore', major: 'Media Studies', hometown: 'Fremont, CA', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop', icon: Target },
  { id: 14, name: 'Tony Chang', position: 'Alumni Relations Chair', year: 'Junior', major: 'Business', hometown: 'San Diego, CA', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop', icon: Target },
  { id: 15, name: 'Justin Kim', position: 'Webmaster', year: 'Sophomore', major: 'Computer Science', hometown: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop', icon: Target },
];

function ExecutiveCard({ exec, isLarge = false }: { exec: Executive, isLarge?: boolean }) {
  return (
    <div className="group border-rough border-[#f8f8f8]/30 hover:border-[#f8f8f8] transition-all bg-[#141419] relative overflow-hidden">
      <div className={`${isLarge ? 'aspect-[3/4]' : 'aspect-square'} overflow-hidden relative`}>
        <img 
          src={exec.image} 
          alt={exec.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 bg-[#172841] relative overflow-hidden">
        {/* Background image for blue section */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758518730178-6e237bc8b87d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHMlMjB0ZWFtfGVufDF8fHx8MTc2ODQ5NTE2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-[#172841]/85"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#f8f8f8] flex items-center justify-center">
              <exec.icon className="w-4 h-4 text-[#0a0a0f]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base text-white leading-tight">{exec.name}</h3>
              <div className="text-[#f8f8f8] text-xs tracking-wider">{exec.position}</div>
            </div>
          </div>
          <div className="space-y-0.5 text-xs text-[#9ca3af] mt-3">
            <div>{exec.year} • {exec.major}</div>
            <div className="truncate">{exec.hometown}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExecutiveBoardPage() {
  return (
    <div className="bg-[#0a0a0f] pt-20">
      {/* Hero with Image */}
      <section className="relative h-[60vh]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1743327572772-eca3c63b029e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjB0b2dldGhlcnxlbnwxfHx8fDE3NjcxMDA1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Rush"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]"></div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="inline-block px-4 py-1.5 bg-[#f8f8f8] mb-4">
            <span className="text-[#0a0a0f] text-xs tracking-widest">LEADERSHIP</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            EXECUTIVE BOARD
          </h1>
        </div>
      </section>

      {/* Cabinet Section */}
      <section className="py-12 bg-[#141419] texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-8 border-l-4 border-[#f8f8f8] pl-3">
            <Briefcase className="w-6 h-6 text-[#f8f8f8]" />
            <h2 className="text-3xl text-white">CABINET</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {cabinet.map((exec) => (
              <ExecutiveCard key={exec.id} exec={exec} isLarge={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Chairs Section */}
      <section className="py-12 bg-[#0a0a0f] texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-8 border-l-4 border-[#f8f8f8] pl-3">
            <Target className="w-6 h-6 text-[#f8f8f8]" />
            <h2 className="text-3xl text-white">CHAIRS</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {chairs.map((exec) => (
              <ExecutiveCard key={exec.id} exec={exec} isLarge={false} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}