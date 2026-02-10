export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Font Awesome class (e.g., "fa-brands fa-github")
}

export interface TechStackItem {
  name: string;
  icon: string; // Font Awesome class (e.g., "fa-solid fa-code")
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
      icon: string; // Font Awesome class
    };
    secondary: {
      text: string;
      link: string;
      icon: string; // Font Awesome class
    };
  };
  techStack: TechStackItem[];
  socialLinks: SocialLink[];
}
