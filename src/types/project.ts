export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string; // Gradient class or image URL
  thumbnail: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  features: string[];
  technologies: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    tools?: string[];
  };
  challenges?: string[];
  solutions?: string[];
  gallery?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface ProjectsSectionData {
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  projects: Project[];
}
