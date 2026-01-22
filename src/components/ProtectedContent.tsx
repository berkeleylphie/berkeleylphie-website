import { FileText, Calendar, Bell, ExternalLink } from 'lucide-react';

interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
}

interface ResourceLink {
  id: number;
  title: string;
  url: string;
  description: string;
}

const upcomingEvents: UpcomingEvent[] = [
  { id: 1, title: 'Chapter Meeting', date: 'February 3', time: '7:00 PM', type: 'Meeting' },
  { id: 2, title: 'Brotherhood Dinner', date: 'February 7', time: '6:30 PM', type: 'Social' },
  { id: 3, title: 'Community Service: Food Bank', date: 'February 10', time: '10:00 AM', type: 'Service' },
  { id: 4, title: 'Alumni Networking Event', date: 'February 14', time: '5:00 PM', type: 'Professional' },
  { id: 5, title: 'Intramural Basketball Game', date: 'February 16', time: '8:00 PM', type: 'Sports' },
];

const resourceLinks: ResourceLink[] = [
  { id: 1, title: 'Academic Drive', url: 'https://drive.google.com', description: 'Study guides, notes, and academic resources' },
  { id: 2, title: 'Resumes', url: 'https://drive.google.com', description: 'Brother resumes and career materials' },
  { id: 3, title: 'Alumni Database', url: 'https://docs.google.com', description: 'Contact info and networking with alumni' },
  { id: 4, title: 'Meeting Minutes', url: 'https://drive.google.com', description: 'Chapter meeting notes and records' },
  { id: 5, title: 'Photo Albums', url: 'https://photos.google.com', description: 'Event photos and brotherhood memories' },
  { id: 6, title: 'Alumni Chat', url: 'https://photos.google.com', description: 'Event photos and brotherhood memories' },
];

export function ProtectedContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      {/* Header */}
      <section className="relative py-16 bg-[#172841] texture-noise overflow-hidden">
        {/* Liquid blobs */}
        <div className="liquid-blob liquid-blob-gold w-96 h-96 top-0 left-1/4"></div>
        <div className="liquid-blob liquid-blob-gold w-64 h-64 bottom-0 right-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-block px-4 py-1 bg-[#f8f8f8] mb-4">
            <span className="text-[#0a0a0f] text-sm tracking-widest">WELCOME BACK</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">BROTHERS PORTAL</h1>
          <p className="text-xl text-white/80">Access chapter resources and stay updated</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Announcements - Now at the top */}
        <div className="mb-12 p-6 bg-[#172841] border-l-4 border-[#f8f8f8]">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-[#f8f8f8]" />
            <h2 className="text-3xl text-white">ANNOUNCEMENTS</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-4 bg-[#0a0a0f] border-rough border-[#f8f8f8]/30">
              <span className="text-[#f8f8f8] mt-1 text-xl">■</span>
              <span className="text-[#9ca3af]">Dues for Spring 2025 are due by February 1st</span>
            </li>
            <li className="flex items-start gap-3 p-4 bg-[#0a0a0f] border-rough border-[#f8f8f8]/30">
              <span className="text-[#f8f8f8] mt-1 text-xl">■</span>
              <span className="text-[#9ca3af]">Brotherhood retreat registration closes January 31st</span>
            </li>
            <li className="flex items-start gap-3 p-4 bg-[#0a0a0f] border-rough border-[#f8f8f8]/30">
              <span className="text-[#f8f8f8] mt-1 text-xl">■</span>
              <span className="text-[#9ca3af]">New chapter house key pickup available at next meeting</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Upcoming Events */}
          <div className="p-6 bg-[#141419] border-rough border-[#f8f8f8]/30">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-[#f8f8f8] pb-3">
              <Calendar className="w-6 h-6 text-[#f8f8f8]" />
              <h2 className="text-2xl text-white">UPCOMING EVENTS</h2>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 bg-[#172841] hover:bg-[#324a6e] transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white">{event.title}</h3>
                    <span className="text-xs px-2 py-1 bg-[#f8f8f8] text-[#0a0a0f]">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-[#9ca3af]">{event.date} • {event.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="p-6 bg-[#141419] border-rough border-[#f8f8f8]/30">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-[#f8f8f8] pb-3">
              <FileText className="w-6 h-6 text-[#f8f8f8]" />
              <h2 className="text-2xl text-white">LINKS</h2>
            </div>
            <div className="space-y-3">
              {resourceLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-[#172841] hover:bg-[#324a6e] transition-all group"
                >
                  <div className="flex-1">
                    <h3 className="text-white mb-1 flex items-center gap-2">
                      {link.title}
                      <ExternalLink className="w-4 h-4 text-[#9ca3af] group-hover:text-[#f8f8f8]" />
                    </h3>
                    <p className="text-xs text-[#9ca3af]">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}