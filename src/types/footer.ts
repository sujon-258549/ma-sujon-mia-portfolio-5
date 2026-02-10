export interface SocialLink {
  faIcon: string;
  href: string;
  label: string;
  color?: string;
}

export interface QuickLink {
  name: string;
  href: string;
}

export interface FooterData {
  description: string;
  email: string;
  location: string;
  logo: string;
  contactTitle: string;
  linksTitle: string;
  copyrightText: string;
  craftedBy: string;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
}
