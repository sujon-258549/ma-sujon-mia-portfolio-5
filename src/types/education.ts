export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  description: string;
  highlights: string[];
  courses: string[];
  isMain: boolean;
  icon?: string; // FontAwesome icon
}

export interface EducationSectionData {
  badge: string;
  badgeIcon: string;
  title: string;
  titleColor: string;
  description: string;
  education: EducationItem[];
  isActive?: boolean;
}
