export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // Icon name from lucide or a class
  skills: string[];
}

export interface SkillsSectionData {
  title: string;
  titleHighlight: string;
  badge: string;
  categories: SkillCategory[];
}
