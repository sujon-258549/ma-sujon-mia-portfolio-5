export interface Project {
  _id?: string;
  id?: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string; // Gradient class or image URL
  imageName?: string; // Image alt text / descriptive name
  thumbnail: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  role?: string;
  problem?: string;
  plan?: string;
  teamMembers?: string[];
  duration?: string;
  features: string[];
  technologies: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    tools?: string[];
  };
  challenges?: string[];
  solutions?: {
    text: string;
    image?: string;
  }[];
  gallery?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  detailedDescriptions?: {
    title: string;
    content: string;
  }[];
  isActive?: boolean;
}

export interface ProjectsSectionData {
  isActive?: boolean;
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  projects: Project[];
}
