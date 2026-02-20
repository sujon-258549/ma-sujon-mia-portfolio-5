export interface Experience {
  title: string;
  company: string;
  companyType: string;
  location: string;
  period: string;
  duration: string;
  type: string;
  icon?: string; // FontAwesome icon
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
  isActive?: boolean;
  slNumber?: number;
}
