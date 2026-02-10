export interface SocialLink {
  faIcon: string;
  href: string;
  label: string;
  color?: string;
}

export interface QuickLink {
  name: string;
  href: string;
  icon?: string;
}

export interface ContactItem {
  icon: string;
  value: string;
  href?: string;
  label: string;
}

export interface FooterData {
  description: string;
  logo: string;
  contactTitle: string;
  contactTitleIcon: string;
  linksTitle: string;
  linksTitleIcon: string;
  copyrightText: string;
  craftedBy: string;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
  contactItems: ContactItem[];
}
