export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
}

export interface TechStackItem {
  name: string;
  icon: string; // Lucide icon name
}

export interface HeroSectionData {
  greeting: string;
  name: string;
  nameHighlight: string;
  rotatingTexts: string[];
  description: string;
  techHighlights: string[]; // e.g., ["React", "Next.js", "Node.js"]
  buttons: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
  techStack: TechStackItem[];
  socialLinks: SocialLink[];
}
