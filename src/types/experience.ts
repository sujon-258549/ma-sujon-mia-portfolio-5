export interface Experience {
  title: string;
  company: string;
  companyType: string;
  location: string;
  period: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  responsibilities: string[];
  technologies: string[];
}

export interface ExperienceSectionData {
  badge: string;
  badgeIcon: string;
  title: string;
  titleColor: string;
  description: string;
  experiences: Experience[];
}
