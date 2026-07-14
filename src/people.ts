// Every person shown on the Brothers, Executive Board, and Alumni pages lives
// in this one list. Each person has a `category` that decides which page they
// show up on and how their card is labeled (see PersonCard.tsx):
//   'brother' -> Brothers page, no special label
//   'cabinet' -> Executive Board page, labeled "Cab: {position}"
//   'chair'   -> Executive Board page, labeled "Chair: {position}"
//   'alumni'  -> Alumni page, labeled "Alumni"
//
// To add someone: put their photo in src/images/headshots/, import it below,
// and add one entry to `people`. That's the only place you need to touch —
// the right page and card label follow automatically from `category`.

import alex from './images/headshots/alex.png';
import colin from './images/headshots/colin.png';
import daniel from './images/headshots/daniel.png';
import david from './images/headshots/david.png';
import ingu from './images/headshots/ingu.png';
import jeff from './images/headshots/jeff.png';
import jordan from './images/headshots/jordan.png';
import jpham from './images/headshots/jpham.png';
import jyang from './images/headshots/jyang.png';
import matt from './images/headshots/matt.png';
import tayler from './images/headshots/tayler.png';
import tommy from './images/headshots/tommy.png';

export type PersonCategory = 'brother' | 'cabinet' | 'chair' | 'alumni';

export interface Person {
  id: number;
  name: string;
  category: PersonCategory;
  image: string;
  year: string; // class standing for brothers/execs, graduation year for alumni
  major: string;
  hometown: string; // hometown for brothers/execs, current location for alumni
  position?: string; // title, only used for cabinet/chair
  currentRole?: string; // alumni only — not shown on the card, used for search
  company?: string; // alumni only — not shown on the card, used for search
}

export const people: Person[] = [
  // ---- Active brothers (alphabetical by last name) ----
  { id: 1, name: 'Yenadi Aye', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 2, name: 'Daniel Bantay', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 3, name: 'Aaron Chang', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 4, name: 'Eugene Cho', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 5, name: 'Ethan Chung', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 6, name: 'Justin Do', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 7, name: 'Hunter Flores', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 8, name: 'Ingu Hwang', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: ingu },
  { id: 9, name: 'Tyler Ichihara', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 10, name: 'Jordan Kim', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: jordan },
  { id: 11, name: 'Matthew Lee', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: matt },
  { id: 12, name: 'Harry Lu', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 13, name: 'Tayler Nguyen', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: tayler },
  { id: 14, name: 'Jason Pham', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: jpham },
  { id: 15, name: 'Daniel Phan', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: daniel },
  { id: 16, name: 'Nam-An Phan', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 17, name: 'Aiden Reyes', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 18, name: 'David Shi', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: david },
  { id: 19, name: 'Shash Shrestha', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 20, name: 'Alex Siu', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: alex },
  { id: 21, name: 'Colin Suzuki', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: colin },
  { id: 22, name: 'Jeffrey Wu', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: jeff },
  { id: 23, name: 'Nathan Xie', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 24, name: 'Jason Yang', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: jyang },
  { id: 25, name: 'Andrew Yoon', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: '' },
  { id: 26, name: 'Tommy Zeng', category: 'brother', year: 'Year', major: 'Major', hometown: 'Hometown', image: tommy },

  // ---- Cabinet ----
  { id: 101, name: 'Michael Chen', category: 'cabinet', position: 'President', year: 'Senior', major: 'Computer Science', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 102, name: 'Jason Park', category: 'cabinet', position: 'Vice President', year: 'Junior', major: 'Business Administration', hometown: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 103, name: 'David Kim', category: 'cabinet', position: 'Treasurer', year: 'Junior', major: 'Economics', hometown: 'San Diego, CA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: 104, name: 'Andrew Wong', category: 'cabinet', position: 'Secretary', year: 'Sophomore', major: 'Mechanical Engineering', hometown: 'Oakland, CA', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop' },
  { id: 105, name: 'Ryan Lee', category: 'cabinet', position: 'Recruitment Director', year: 'Junior', major: 'Electrical Engineering', hometown: 'Irvine, CA', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },

  // ---- Chairs ----
  { id: 106, name: 'Kevin Nguyen', category: 'chair', position: 'Social Chair', year: 'Junior', major: 'Data Science', hometown: 'San Jose, CA', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop' },
  { id: 107, name: 'Steven Tran', category: 'chair', position: 'Philanthropy Chair', year: 'Junior', major: 'Political Science', hometown: 'Sacramento, CA', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
  { id: 108, name: 'Daniel Liu', category: 'chair', position: 'Academic Chair', year: 'Sophomore', major: 'Biology', hometown: 'Fremont, CA', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop' },
  { id: 109, name: 'Alex Patel', category: 'chair', position: 'Athletics Chair', year: 'Sophomore', major: 'Chemistry', hometown: 'Berkeley, CA', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop' },
  { id: 110, name: 'Chris Wang', category: 'chair', position: 'Brotherhood Chair', year: 'Sophomore', major: 'Architecture', hometown: 'Pasadena, CA', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop' },
  { id: 111, name: 'Brandon Zhou', category: 'chair', position: 'Professional Development Chair', year: 'Sophomore', major: 'Mathematics', hometown: 'Walnut Creek, CA', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop' },
  { id: 112, name: 'Eric Yamamoto', category: 'chair', position: 'Cultural Chair', year: 'Sophomore', major: 'Ethnic Studies', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop' },
  { id: 113, name: 'Marcus Tan', category: 'chair', position: 'Public Relations Chair', year: 'Sophomore', major: 'Media Studies', hometown: 'Fremont, CA', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop' },
  { id: 114, name: 'Tony Chang', category: 'chair', position: 'Alumni Relations Chair', year: 'Junior', major: 'Business', hometown: 'San Diego, CA', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop' },
  { id: 115, name: 'Justin Kim', category: 'chair', position: 'Webmaster', year: 'Sophomore', major: 'Computer Science', hometown: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop' },

  // ---- Alumni ----
  { id: 201, name: 'James Chen', category: 'alumni', year: '2020', major: 'Computer Science', currentRole: 'Software Engineer', company: 'Google', hometown: 'Mountain View, CA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 202, name: 'David Park', category: 'alumni', year: '2019', major: 'Business Administration', currentRole: 'Product Manager', company: 'Meta', hometown: 'Menlo Park, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 203, name: 'Kevin Liu', category: 'alumni', year: '2021', major: 'Economics', currentRole: 'Investment Analyst', company: 'Goldman Sachs', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: 204, name: 'Andrew Ng', category: 'alumni', year: '2018', major: 'Mechanical Engineering', currentRole: 'Design Engineer', company: 'Tesla', hometown: 'Fremont, CA', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop' },
  { id: 205, name: 'Ryan Wang', category: 'alumni', year: '2020', major: 'Electrical Engineering', currentRole: 'Hardware Engineer', company: 'Apple', hometown: 'Cupertino, CA', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: 206, name: 'Kevin Nguyen', category: 'alumni', year: '2019', major: 'Data Science', currentRole: 'Data Scientist', company: 'Netflix', hometown: 'Los Gatos, CA', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop' },
  { id: 207, name: 'Steven Tran', category: 'alumni', year: '2017', major: 'Political Science', currentRole: 'Policy Analyst', company: 'State of California', hometown: 'Sacramento, CA', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
  { id: 208, name: 'Daniel Kim', category: 'alumni', year: '2021', major: 'Biology', currentRole: 'Medical Student', company: 'UCSF', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop' },
  { id: 209, name: 'Alex Patel', category: 'alumni', year: '2020', major: 'Chemistry', currentRole: 'Research Scientist', company: 'Genentech', hometown: 'South San Francisco, CA', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop' },
  { id: 210, name: 'Chris Lee', category: 'alumni', year: '2019', major: 'Architecture', currentRole: 'Architect', company: 'Gensler', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop' },
  { id: 211, name: 'Brandon Zhou', category: 'alumni', year: '2018', major: 'Mathematics', currentRole: 'Quantitative Analyst', company: 'Citadel', hometown: 'Chicago, IL', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop' },
  { id: 212, name: 'Eric Yamamoto', category: 'alumni', year: '2021', major: 'Media Studies', currentRole: 'Marketing Manager', company: 'Airbnb', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop' },
  { id: 213, name: 'Marcus Tan', category: 'alumni', year: '2017', major: 'Computer Science', currentRole: 'Senior Software Engineer', company: 'Amazon', hometown: 'Seattle, WA', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop' },
  { id: 214, name: 'Tony Chang', category: 'alumni', year: '2016', major: 'Business', currentRole: 'Founder & CEO', company: 'TechStart Inc', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop' },
  { id: 215, name: 'Justin Kim', category: 'alumni', year: '2020', major: 'Computer Science', currentRole: 'Full Stack Developer', company: 'Stripe', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop' },
  { id: 216, name: 'Michael Zhang', category: 'alumni', year: '2019', major: 'Finance', currentRole: 'Financial Advisor', company: 'Morgan Stanley', hometown: 'New York, NY', image: 'https://images.unsplash.com/photo-1543132220-7bc04a0e790a?w=400&h=400&fit=crop' },
  { id: 217, name: 'Jason Wu', category: 'alumni', year: '2018', major: 'Civil Engineering', currentRole: 'Project Manager', company: 'Bechtel', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=400&h=400&fit=crop' },
  { id: 218, name: 'Brian Choi', category: 'alumni', year: '2021', major: 'Neuroscience', currentRole: 'Research Associate', company: 'Stanford Medicine', hometown: 'Stanford, CA', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop' },
  { id: 219, name: 'Vincent Lee', category: 'alumni', year: '2017', major: 'Environmental Science', currentRole: 'Sustainability Consultant', company: 'Deloitte', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&h=400&fit=crop' },
  { id: 220, name: 'Raymond Ho', category: 'alumni', year: '2020', major: 'Physics', currentRole: 'Data Engineer', company: 'LinkedIn', hometown: 'Sunnyvale, CA', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop' },
  { id: 221, name: 'Dennis Lam', category: 'alumni', year: '2019', major: 'Bioengineering', currentRole: 'Biomedical Engineer', company: 'Medtronic', hometown: 'Minneapolis, MN', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
  { id: 222, name: 'Alan Chen', category: 'alumni', year: '2016', major: 'Psychology', currentRole: 'UX Researcher', company: 'Adobe', hometown: 'San Jose, CA', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop' },
  { id: 223, name: 'Gary Huang', category: 'alumni', year: '2018', major: 'Statistics', currentRole: 'Statistician', company: 'CDC', hometown: 'Atlanta, GA', image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop' },
  { id: 224, name: 'Patrick Kim', category: 'alumni', year: '2021', major: 'Molecular Biology', currentRole: 'PhD Student', company: 'MIT', hometown: 'Cambridge, MA', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop' },
  { id: 225, name: 'Timothy Wong', category: 'alumni', year: '2017', major: 'Public Health', currentRole: 'Epidemiologist', company: 'Kaiser Permanente', hometown: 'Oakland, CA', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
  { id: 226, name: 'Edward Park', category: 'alumni', year: '2019', major: 'Information Systems', currentRole: 'IT Consultant', company: 'Accenture', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=400&h=400&fit=crop' },
  { id: 227, name: 'Kenneth Nguyen', category: 'alumni', year: '2020', major: 'Marketing', currentRole: 'Brand Manager', company: 'Procter & Gamble', hometown: 'Cincinnati, OH', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: 228, name: 'Samuel Lee', category: 'alumni', year: '2018', major: 'Law', currentRole: 'Associate Attorney', company: 'Wilson Sonsini', hometown: 'Palo Alto, CA', image: 'https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400&h=400&fit=crop' },
  { id: 229, name: 'William Tan', category: 'alumni', year: '2016', major: 'Industrial Engineering', currentRole: 'Operations Manager', company: 'SpaceX', hometown: 'Hawthorne, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 230, name: 'Oscar Liu', category: 'alumni', year: '2021', major: 'Film & Media', currentRole: 'Video Producer', company: 'YouTube', hometown: 'San Bruno, CA', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop' },
  { id: 231, name: 'Henry Chang', category: 'alumni', year: '2015', major: 'Computer Engineering', currentRole: 'Senior Engineer', company: 'Intel', hometown: 'Santa Clara, CA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 232, name: 'Leonard Wu', category: 'alumni', year: '2014', major: 'Finance', currentRole: 'Investment Banker', company: 'JP Morgan', hometown: 'New York, NY', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 233, name: 'Calvin Huang', category: 'alumni', year: '2022', major: 'Data Science', currentRole: 'ML Engineer', company: 'OpenAI', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: 234, name: 'Derek Cheng', category: 'alumni', year: '2016', major: 'Mechanical Engineering', currentRole: 'Senior Engineer', company: 'Boeing', hometown: 'Seattle, WA', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop' },
  { id: 235, name: 'Felix Nguyen', category: 'alumni', year: '2015', major: 'Chemical Engineering', currentRole: 'Process Engineer', company: 'Chevron', hometown: 'San Ramon, CA', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: 236, name: 'Gordon Lee', category: 'alumni', year: '2013', major: 'Economics', currentRole: 'Financial Analyst', company: 'BlackRock', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop' },
  { id: 237, name: 'Howard Kim', category: 'alumni', year: '2014', major: 'Political Economy', currentRole: 'Consultant', company: 'McKinsey & Company', hometown: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
  { id: 238, name: 'Ian Park', category: 'alumni', year: '2022', major: 'Computer Science', currentRole: 'Software Developer', company: 'Salesforce', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop' },
  { id: 239, name: 'Jeffrey Zhao', category: 'alumni', year: '2015', major: 'Bioengineering', currentRole: 'Research Scientist', company: 'Illumina', hometown: 'San Diego, CA', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop' },
  { id: 240, name: 'Kenny Lin', category: 'alumni', year: '2013', major: 'History', currentRole: 'High School Teacher', company: 'Oakland Unified', hometown: 'Oakland, CA', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop' },
  { id: 241, name: 'Larry Pham', category: 'alumni', year: '2016', major: 'Environmental Engineering', currentRole: 'Project Engineer', company: 'AECOM', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop' },
  { id: 242, name: 'Martin Chen', category: 'alumni', year: '2014', major: 'Business Administration', currentRole: 'Account Manager', company: 'Oracle', hometown: 'Redwood City, CA', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop' },
  { id: 243, name: 'Nathan Wong', category: 'alumni', year: '2022', major: 'Cognitive Science', currentRole: 'UX Designer', company: 'Figma', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop' },
  { id: 244, name: 'Oliver Tan', category: 'alumni', year: '2015', major: 'Physics', currentRole: 'Quantitative Researcher', company: 'Two Sigma', hometown: 'New York, NY', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop' },
  { id: 245, name: 'Peter Liu', category: 'alumni', year: '2013', major: 'Materials Science', currentRole: 'Materials Engineer', company: 'Applied Materials', hometown: 'Santa Clara, CA', image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop' },
  { id: 246, name: 'Quincy Kim', category: 'alumni', year: '2017', major: 'Psychology', currentRole: 'Therapist', company: 'Private Practice', hometown: 'Berkeley, CA', image: 'https://images.unsplash.com/photo-1543132220-7bc04a0e790a?w=400&h=400&fit=crop' },
  { id: 247, name: 'Richard Nguyen', category: 'alumni', year: '2012', major: 'Computer Science', currentRole: 'Engineering Manager', company: 'Uber', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=400&h=400&fit=crop' },
  { id: 248, name: 'Scott Park', category: 'alumni', year: '2011', major: 'Economics', currentRole: 'Vice President', company: 'Wells Fargo', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop' },
  { id: 249, name: 'Thomas Lee', category: 'alumni', year: '2010', major: 'Civil Engineering', currentRole: 'Senior Project Manager', company: 'Turner Construction', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&h=400&fit=crop' },
  { id: 250, name: 'Victor Chen', category: 'alumni', year: '2012', major: 'Electrical Engineering', currentRole: 'Engineering Director', company: 'Nvidia', hometown: 'Santa Clara, CA', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop' },
  { id: 251, name: 'Wesley Huang', category: 'alumni', year: '2011', major: 'Business', currentRole: 'Director of Operations', company: 'Lyft', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
  { id: 252, name: 'Xavier Wu', category: 'alumni', year: '2009', major: 'Computer Science', currentRole: 'VP Engineering', company: 'DoorDash', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop' },
  { id: 253, name: 'Yale Kim', category: 'alumni', year: '2010', major: 'Finance', currentRole: 'Managing Director', company: 'Credit Suisse', hometown: 'New York, NY', image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop' },
  { id: 254, name: 'Zachary Nguyen', category: 'alumni', year: '2008', major: 'Law', currentRole: 'Partner', company: 'Morrison & Foerster', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop' },
  { id: 255, name: 'Adam Park', category: 'alumni', year: '2022', major: 'Entrepreneurship', currentRole: 'Founder', company: 'StartupCo', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
  { id: 256, name: 'Benjamin Lee', category: 'alumni', year: '2011', major: 'Architecture', currentRole: 'Principal Architect', company: 'SOM', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=400&h=400&fit=crop' },
  { id: 257, name: 'Carlos Chen', category: 'alumni', year: '2009', major: 'Medical School', currentRole: 'Physician', company: 'UCSF Medical Center', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: 258, name: 'Daniel Wu', category: 'alumni', year: '2007', major: 'Dentistry', currentRole: 'Dentist', company: 'Private Practice', hometown: 'San Jose, CA', image: 'https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400&h=400&fit=crop' },
  { id: 259, name: 'Ethan Kim', category: 'alumni', year: '2008', major: 'Pharmacy', currentRole: 'Pharmacist', company: 'CVS Health', hometown: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 260, name: 'Frank Nguyen', category: 'alumni', year: '2006', major: 'Business', currentRole: 'CEO', company: 'TechVentures Inc', hometown: 'Palo Alto, CA', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop' },
  { id: 261, name: 'George Park', category: 'alumni', year: '2005', major: 'Computer Science', currentRole: 'CTO', company: 'CloudTech', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 262, name: 'Harry Lee', category: 'alumni', year: '2004', major: 'Finance', currentRole: 'CFO', company: 'FinCorp', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 263, name: 'Isaac Chen', category: 'alumni', year: '2003', major: 'Engineering', currentRole: 'VP Engineering', company: 'Hardware Inc', hometown: 'San Jose, CA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { id: 264, name: 'Jack Wu', category: 'alumni', year: '2002', major: 'Marketing', currentRole: 'CMO', company: 'BrandCo', hometown: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop' },
  { id: 265, name: 'Kevin Chang', category: 'alumni', year: '2001', major: 'Real Estate', currentRole: 'Real Estate Developer', company: 'PropertyDev LLC', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: 266, name: 'Louis Kim', category: 'alumni', year: '2000', major: 'Business', currentRole: 'Managing Partner', company: 'Venture Capital Firm', hometown: 'Menlo Park, CA', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop' },
  { id: 267, name: 'Mark Nguyen', category: 'alumni', year: '1999', major: 'Computer Science', currentRole: 'Distinguished Engineer', company: 'Microsoft', hometown: 'Seattle, WA', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
  { id: 268, name: 'Nicholas Park', category: 'alumni', year: '1998', major: 'Law', currentRole: 'Senior Partner', company: 'Major Law Firm', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop' },
  { id: 269, name: 'Owen Lee', category: 'alumni', year: '1997', major: 'Medicine', currentRole: 'Chief of Surgery', company: 'Stanford Hospital', hometown: 'Palo Alto, CA', image: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop' },
  { id: 270, name: 'Paul Chen', category: 'alumni', year: '1996', major: 'Engineering', currentRole: 'Principal Engineer', company: 'Lockheed Martin', hometown: 'Sunnyvale, CA', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop' },
  { id: 271, name: 'Quinn Wu', category: 'alumni', year: '1995', major: 'Business', currentRole: 'Board Member', company: 'Fortune 500 Company', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop' },
  { id: 272, name: 'Robert Kim', category: 'alumni', year: '1994', major: 'Finance', currentRole: 'Hedge Fund Manager', company: 'Hedge Fund Partners', hometown: 'New York, NY', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop' },
  { id: 273, name: 'Steven Nguyen', category: 'alumni', year: '1993', major: 'Entrepreneurship', currentRole: 'Serial Entrepreneur', company: 'Multiple Ventures', hometown: 'Silicon Valley, CA', image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop' },
  { id: 274, name: 'Timothy Park', category: 'alumni', year: '1992', major: 'Computer Science', currentRole: 'Technology Advisor', company: 'Tech Consulting', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop' },
  { id: 275, name: 'Vincent Lee', category: 'alumni', year: '1991', major: 'Business', currentRole: 'Chairman', company: 'Investment Group', hometown: 'San Francisco, CA', image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop' },
];
