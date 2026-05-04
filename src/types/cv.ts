export type CVLanguage = 'en' | 'fr';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 or 0-100
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g. Native, Professional, etc.
}

export interface CVData {
  language: CVLanguage;
  template: 'minimal' | 'modern' | 'sidebar';
  themeColor: string;
  personalInfo: PersonalInfo;
  about: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
}

export const initialCVData: CVData = {
  language: 'en',
  template: 'modern',
  themeColor: '#1a1a1a',
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
  },
  about: 'Innovative Software Engineer with 8+ years of experience in building scalable web applications. Passionate about clean code, UI/UX, and solving complex problems with modern technologies.',
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Lead Developer',
      location: 'Remote',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Leading a team of 10 developers to build a world-class platform. Increased performance by 40% using React and Node.js.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'M.S. in Computer Science',
      location: 'California',
      startDate: '2016-09',
      endDate: '2018-06',
      description: 'Focus on Distributed Systems and AI.'
    }
  ],
  skills: [
    { id: '1', name: 'React', level: 95 },
    { id: '2', name: 'TypeScript', level: 90 },
    { id: '3', name: 'Node.js', level: 85 },
    { id: '4', name: 'Tailwind CSS', level: 90 },
  ],
  projects: [
    {
      id: '1',
      name: 'EliteCV',
      link: '#',
      description: 'A modern CV generator built with React and Tailwind.',
      technologies: ['React', 'Tailwind']
    }
  ],
  certifications: [],
  languages: [
    { id: '1', name: 'English', level: 'Native' },
    { id: '2', name: 'French', level: 'Bilingual' }
  ],
};
