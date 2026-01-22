import { Search, ChevronLeft, ChevronRight, Briefcase, Building2, GraduationCap, MapPin } from 'lucide-react';
import { ImageWithFallback } from './effects/ImageWithFallback';
import { useState, useMemo } from 'react';

type Page = 'home' | 'about' | 'brothers' | 'executives' | 'alumni' | 'rush' | 'login' | 'protected';

interface Alumnus {
  id: number;
  name: string;
  graduationYear: string;
  major: string;
  currentRole: string;
  company: string;
  location: string;
  image: string;
}

// Expanded alumni data - 75 alumni total
const allAlumni: Alumnus[] = [
  { id: 1, name: 'James Chen', graduationYear: '2020', major: 'Computer Science', currentRole: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 2, name: 'David Park', graduationYear: '2019', major: 'Business Administration', currentRole: 'Product Manager', company: 'Meta', location: 'Menlo Park, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 3, name: 'Kevin Liu', graduationYear: '2021', major: 'Economics', currentRole: 'Investment Analyst', company: 'Goldman Sachs', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: 4, name: 'Andrew Ng', graduationYear: '2018', major: 'Mechanical Engineering', currentRole: 'Design Engineer', company: 'Tesla', location: 'Fremont, CA', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop' },
  { id: 5, name: 'Ryan Wang', graduationYear: '2020', major: 'Electrical Engineering', currentRole: 'Hardware Engineer', company: 'Apple', location: 'Cupertino, CA', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: 6, name: 'Kevin Nguyen', graduationYear: '2019', major: 'Data Science', currentRole: 'Data Scientist', company: 'Netflix', location: 'Los Gatos, CA', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop' },
  { id: 7, name: 'Steven Tran', graduationYear: '2017', major: 'Political Science', currentRole: 'Policy Analyst', company: 'State of California', location: 'Sacramento, CA', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
  { id: 8, name: 'Daniel Kim', graduationYear: '2021', major: 'Biology', currentRole: 'Medical Student', company: 'UCSF', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop' },
  { id: 9, name: 'Alex Patel', graduationYear: '2020', major: 'Chemistry', currentRole: 'Research Scientist', company: 'Genentech', location: 'South San Francisco, CA', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop' },
  { id: 10, name: 'Chris Lee', graduationYear: '2019', major: 'Architecture', currentRole: 'Architect', company: 'Gensler', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop' },
  { id: 11, name: 'Brandon Zhou', graduationYear: '2018', major: 'Mathematics', currentRole: 'Quantitative Analyst', company: 'Citadel', location: 'Chicago, IL', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop' },
  { id: 12, name: 'Eric Yamamoto', graduationYear: '2021', major: 'Media Studies', currentRole: 'Marketing Manager', company: 'Airbnb', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop' },
  { id: 13, name: 'Marcus Tan', graduationYear: '2017', major: 'Computer Science', currentRole: 'Senior Software Engineer', company: 'Amazon', location: 'Seattle, WA', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop' },
  { id: 14, name: 'Tony Chang', graduationYear: '2016', major: 'Business', currentRole: 'Founder & CEO', company: 'TechStart Inc', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop' },
  { id: 15, name: 'Justin Kim', graduationYear: '2020', major: 'Computer Science', currentRole: 'Full Stack Developer', company: 'Stripe', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop' },
  { id: 16, name: 'Michael Zhang', graduationYear: '2019', major: 'Finance', currentRole: 'Financial Advisor', company: 'Morgan Stanley', location: 'New York, NY', image: 'https://images.unsplash.com/photo-1543132220-7bc04a0e790a?w=400&h=400&fit=crop' },
  { id: 17, name: 'Jason Wu', graduationYear: '2018', major: 'Civil Engineering', currentRole: 'Project Manager', company: 'Bechtel', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=400&h=400&fit=crop' },
  { id: 18, name: 'Brian Choi', graduationYear: '2021', major: 'Neuroscience', currentRole: 'Research Associate', company: 'Stanford Medicine', location: 'Stanford, CA', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop' },
  { id: 19, name: 'Vincent Lee', graduationYear: '2017', major: 'Environmental Science', currentRole: 'Sustainability Consultant', company: 'Deloitte', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&h=400&fit=crop' },
  { id: 20, name: 'Raymond Ho', graduationYear: '2020', major: 'Physics', currentRole: 'Data Engineer', company: 'LinkedIn', location: 'Sunnyvale, CA', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop' },
  { id: 21, name: 'Dennis Lam', graduationYear: '2019', major: 'Bioengineering', currentRole: 'Biomedical Engineer', company: 'Medtronic', location: 'Minneapolis, MN', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
  { id: 22, name: 'Alan Chen', graduationYear: '2016', major: 'Psychology', currentRole: 'UX Researcher', company: 'Adobe', location: 'San Jose, CA', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop' },
  { id: 23, name: 'Gary Huang', graduationYear: '2018', major: 'Statistics', currentRole: 'Statistician', company: 'CDC', location: 'Atlanta, GA', image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop' },
  { id: 24, name: 'Patrick Kim', graduationYear: '2021', major: 'Molecular Biology', currentRole: 'PhD Student', company: 'MIT', location: 'Cambridge, MA', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop' },
  { id: 25, name: 'Timothy Wong', graduationYear: '2017', major: 'Public Health', currentRole: 'Epidemiologist', company: 'Kaiser Permanente', location: 'Oakland, CA', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
  { id: 26, name: 'Edward Park', graduationYear: '2019', major: 'Information Systems', currentRole: 'IT Consultant', company: 'Accenture', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=400&h=400&fit=crop' },
  { id: 27, name: 'Kenneth Nguyen', graduationYear: '2020', major: 'Marketing', currentRole: 'Brand Manager', company: 'Procter & Gamble', location: 'Cincinnati, OH', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: 28, name: 'Samuel Lee', graduationYear: '2018', major: 'Law', currentRole: 'Associate Attorney', company: 'Wilson Sonsini', location: 'Palo Alto, CA', image: 'https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400&h=400&fit=crop' },
  { id: 29, name: 'William Tan', graduationYear: '2016', major: 'Industrial Engineering', currentRole: 'Operations Manager', company: 'SpaceX', location: 'Hawthorne, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 30, name: 'Oscar Liu', graduationYear: '2021', major: 'Film & Media', currentRole: 'Video Producer', company: 'YouTube', location: 'San Bruno, CA', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop' },
  { id: 31, name: 'Henry Chang', graduationYear: '2015', major: 'Computer Engineering', currentRole: 'Senior Engineer', company: 'Intel', location: 'Santa Clara, CA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 32, name: 'Leonard Wu', graduationYear: '2014', major: 'Finance', currentRole: 'Investment Banker', company: 'JP Morgan', location: 'New York, NY', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 33, name: 'Calvin Huang', graduationYear: '2022', major: 'Data Science', currentRole: 'ML Engineer', company: 'OpenAI', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: 34, name: 'Derek Cheng', graduationYear: '2016', major: 'Mechanical Engineering', currentRole: 'Senior Engineer', company: 'Boeing', location: 'Seattle, WA', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop' },
  { id: 35, name: 'Felix Nguyen', graduationYear: '2015', major: 'Chemical Engineering', currentRole: 'Process Engineer', company: 'Chevron', location: 'San Ramon, CA', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: 36, name: 'Gordon Lee', graduationYear: '2013', major: 'Economics', currentRole: 'Financial Analyst', company: 'BlackRock', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop' },
  { id: 37, name: 'Howard Kim', graduationYear: '2014', major: 'Political Economy', currentRole: 'Consultant', company: 'McKinsey & Company', location: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
  { id: 38, name: 'Ian Park', graduationYear: '2022', major: 'Computer Science', currentRole: 'Software Developer', company: 'Salesforce', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop' },
  { id: 39, name: 'Jeffrey Zhao', graduationYear: '2015', major: 'Bioengineering', currentRole: 'Research Scientist', company: 'Illumina', location: 'San Diego, CA', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop' },
  { id: 40, name: 'Kenny Lin', graduationYear: '2013', major: 'History', currentRole: 'High School Teacher', company: 'Oakland Unified', location: 'Oakland, CA', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop' },
  { id: 41, name: 'Larry Pham', graduationYear: '2016', major: 'Environmental Engineering', currentRole: 'Project Engineer', company: 'AECOM', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop' },
  { id: 42, name: 'Martin Chen', graduationYear: '2014', major: 'Business Administration', currentRole: 'Account Manager', company: 'Oracle', location: 'Redwood City, CA', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop' },
  { id: 43, name: 'Nathan Wong', graduationYear: '2022', major: 'Cognitive Science', currentRole: 'UX Designer', company: 'Figma', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop' },
  { id: 44, name: 'Oliver Tan', graduationYear: '2015', major: 'Physics', currentRole: 'Quantitative Researcher', company: 'Two Sigma', location: 'New York, NY', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop' },
  { id: 45, name: 'Peter Liu', graduationYear: '2013', major: 'Materials Science', currentRole: 'Materials Engineer', company: 'Applied Materials', location: 'Santa Clara, CA', image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop' },
  { id: 46, name: 'Quincy Kim', graduationYear: '2017', major: 'Psychology', currentRole: 'Therapist', company: 'Private Practice', location: 'Berkeley, CA', image: 'https://images.unsplash.com/photo-1543132220-7bc04a0e790a?w=400&h=400&fit=crop' },
  { id: 47, name: 'Richard Nguyen', graduationYear: '2012', major: 'Computer Science', currentRole: 'Engineering Manager', company: 'Uber', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=400&h=400&fit=crop' },
  { id: 48, name: 'Scott Park', graduationYear: '2011', major: 'Economics', currentRole: 'Vice President', company: 'Wells Fargo', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop' },
  { id: 49, name: 'Thomas Lee', graduationYear: '2010', major: 'Civil Engineering', currentRole: 'Senior Project Manager', company: 'Turner Construction', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&h=400&fit=crop' },
  { id: 50, name: 'Victor Chen', graduationYear: '2012', major: 'Electrical Engineering', currentRole: 'Engineering Director', company: 'Nvidia', location: 'Santa Clara, CA', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop' },
  { id: 51, name: 'Wesley Huang', graduationYear: '2011', major: 'Business', currentRole: 'Director of Operations', company: 'Lyft', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
  { id: 52, name: 'Xavier Wu', graduationYear: '2009', major: 'Computer Science', currentRole: 'VP Engineering', company: 'DoorDash', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop' },
  { id: 53, name: 'Yale Kim', graduationYear: '2010', major: 'Finance', currentRole: 'Managing Director', company: 'Credit Suisse', location: 'New York, NY', image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop' },
  { id: 54, name: 'Zachary Nguyen', graduationYear: '2008', major: 'Law', currentRole: 'Partner', company: 'Morrison & Foerster', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop' },
  { id: 55, name: 'Adam Park', graduationYear: '2022', major: 'Entrepreneurship', currentRole: 'Founder', company: 'StartupCo', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
  { id: 56, name: 'Benjamin Lee', graduationYear: '2011', major: 'Architecture', currentRole: 'Principal Architect', company: 'SOM', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=400&h=400&fit=crop' },
  { id: 57, name: 'Carlos Chen', graduationYear: '2009', major: 'Medical School', currentRole: 'Physician', company: 'UCSF Medical Center', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: 58, name: 'Daniel Wu', graduationYear: '2007', major: 'Dentistry', currentRole: 'Dentist', company: 'Private Practice', location: 'San Jose, CA', image: 'https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400&h=400&fit=crop' },
  { id: 59, name: 'Ethan Kim', graduationYear: '2008', major: 'Pharmacy', currentRole: 'Pharmacist', company: 'CVS Health', location: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 60, name: 'Frank Nguyen', graduationYear: '2006', major: 'Business', currentRole: 'CEO', company: 'TechVentures Inc', location: 'Palo Alto, CA', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop' },
  { id: 61, name: 'George Park', graduationYear: '2005', major: 'Computer Science', currentRole: 'CTO', company: 'CloudTech', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 62, name: 'Harry Lee', graduationYear: '2004', major: 'Finance', currentRole: 'CFO', company: 'FinCorp', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 63, name: 'Isaac Chen', graduationYear: '2003', major: 'Engineering', currentRole: 'VP Engineering', company: 'Hardware Inc', location: 'San Jose, CA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: 64, name: 'Jack Wu', graduationYear: '2002', major: 'Marketing', currentRole: 'CMO', company: 'BrandCo', location: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop' },
  { id: 65, name: 'Kevin Chang', graduationYear: '2001', major: 'Real Estate', currentRole: 'Real Estate Developer', company: 'PropertyDev LLC', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: 66, name: 'Louis Kim', graduationYear: '2000', major: 'Business', currentRole: 'Managing Partner', company: 'Venture Capital Firm', location: 'Menlo Park, CA', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop' },
  { id: 67, name: 'Mark Nguyen', graduationYear: '1999', major: 'Computer Science', currentRole: 'Distinguished Engineer', company: 'Microsoft', location: 'Seattle, WA', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
  { id: 68, name: 'Nicholas Park', graduationYear: '1998', major: 'Law', currentRole: 'Senior Partner', company: 'Major Law Firm', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop' },
  { id: 69, name: 'Owen Lee', graduationYear: '1997', major: 'Medicine', currentRole: 'Chief of Surgery', company: 'Stanford Hospital', location: 'Palo Alto, CA', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop' },
  { id: 70, name: 'Paul Chen', graduationYear: '1996', major: 'Engineering', currentRole: 'Principal Engineer', company: 'Lockheed Martin', location: 'Sunnyvale, CA', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop' },
  { id: 71, name: 'Quinn Wu', graduationYear: '1995', major: 'Business', currentRole: 'Board Member', company: 'Fortune 500 Company', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop' },
  { id: 72, name: 'Robert Kim', graduationYear: '1994', major: 'Finance', currentRole: 'Hedge Fund Manager', company: 'Hedge Fund Partners', location: 'New York, NY', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop' },
  { id: 73, name: 'Steven Nguyen', graduationYear: '1993', major: 'Entrepreneurship', currentRole: 'Serial Entrepreneur', company: 'Multiple Ventures', location: 'Silicon Valley, CA', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop' },
  { id: 74, name: 'Timothy Park', graduationYear: '1992', major: 'Computer Science', currentRole: 'Technology Advisor', company: 'Tech Consulting', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop' },
  { id: 75, name: 'Vincent Lee', graduationYear: '1991', major: 'Business', currentRole: 'Chairman', company: 'Investment Group', location: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop' },
];

const ITEMS_PER_PAGE = 20;

function AlumnusCard({ alumnus }: { alumnus: Alumnus }) {
  return (
    <div className="group border-rough border-[#f8f8f8]/30 hover:border-[#f8f8f8] transition-all bg-[#141419] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="ornament-cal text-[6rem] top-0 right-0">CAL</div>
      </div>
      
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={alumnus.image} 
          alt={alumnus.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gold overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#b8941e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Graduation Year Badge */}
        <div className="absolute top-2 right-2 bg-[#f8f8f8] text-[#0a0a0f] px-3 py-1 text-xs tracking-wider">
          '{alumnus.graduationYear.slice(-2)}
        </div>
      </div>
      
      <div className="p-4 bg-[#0f1b4d] relative overflow-hidden">
        {/* Background image for blue section */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1738949538943-e54722a44ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZ3JhZHVhdGlvbiUyMGNlcmVtb255fGVufDF8fHx8MTc2ODUyMDI1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-[#0f1b4d]/85"></div>
        
        <div className="relative z-10">
          <h3 className="text-lg text-white mb-1 leading-tight">{alumnus.name}</h3>
          <div className="text-[#f8f8f8] text-xs tracking-wider mb-3">{alumnus.currentRole}</div>
          
          <div className="space-y-1.5 text-xs text-[#9ca3af]">
            <div className="flex items-center gap-2">
              <Building2 className="w-3 h-3 text-[#f8f8f8] flex-shrink-0" />
              <span className="truncate">{alumnus.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3 h-3 text-[#f8f8f8] flex-shrink-0" />
              <span className="truncate">{alumnus.major}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-[#f8f8f8] flex-shrink-0" />
              <span className="truncate">{alumnus.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AlumniPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter alumni based on search query
  const filteredAlumni = useMemo(() => {
    if (!searchQuery.trim()) return allAlumni;
    
    const query = searchQuery.toLowerCase();
    return allAlumni.filter(alumnus => 
      alumnus.name.toLowerCase().includes(query) ||
      alumnus.currentRole.toLowerCase().includes(query) ||
      alumnus.company.toLowerCase().includes(query) ||
      alumnus.major.toLowerCase().includes(query) ||
      alumnus.location.toLowerCase().includes(query) ||
      alumnus.graduationYear.includes(query)
    );
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAlumni = filteredAlumni.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

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
            <span className="text-[#0a0a0f] text-xs tracking-widest">LEGACY</span>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            ALUMNI
          </h1>
        </div>
      </section>

      {/* Search and Alumni Grid */}
      <section className="py-12 bg-[#141419] texture-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Search Bar */}
          <div className="mb-10">
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f8f8f8]" />
                <input
                  type="text"
                  placeholder="Search by name, company, role, major, location, or year..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-5 py-3 bg-[#0a0a0f] border-rough border-[#f8f8f8] text-white text-sm placeholder-[#9ca3af] focus:outline-none focus:border-white"
                />
              </div>
              <div className="mt-2 text-center text-xs text-[#9ca3af]">
                Showing {currentAlumni.length} of {filteredAlumni.length} alumni
                {searchQuery && ` matching "${searchQuery}"`}
              </div>
            </div>
          </div>

          {/* Alumni Grid */}
          {currentAlumni.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-10">
                {currentAlumni.map((alumnus) => (
                  <AlumnusCard key={alumnus.id} alumnus={alumnus} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 text-sm border-rough flex items-center gap-1.5 ${
                      currentPage === 1
                        ? 'border-[#f8f8f8]/30 text-[#9ca3af] cursor-not-allowed'
                        : 'border-[#f8f8f8] text-white hover:bg-[#172841]'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Previous
                  </button>

                  {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                      <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm border-rough ${
                          currentPage === page
                            ? 'bg-[#f8f8f8] text-[#0a0a0f] border-[#f8f8f8]'
                            : 'border-[#f8f8f8] text-white hover:bg-[#172841]'
                        }`}
                      >
                        {page}
                      </button>
                    ) : (
                      <span key={index} className="px-1.5 text-[#9ca3af] text-sm">
                        {page}
                      </span>
                    )
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 text-sm border-rough flex items-center gap-1.5 ${
                      currentPage === totalPages
                        ? 'border-[#f8f8f8]/30 text-[#9ca3af] cursor-not-allowed'
                        : 'border-[#f8f8f8] text-white hover:bg-[#172841]'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-[#f8f8f8] text-5xl mb-3">∅</div>
              <h3 className="text-xl text-white mb-2">No Alumni Found</h3>
              <p className="text-[#9ca3af] text-sm">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}