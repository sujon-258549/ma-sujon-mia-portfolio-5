export interface ContactInfo {
  icon: string;
  title: string;
  value: string;
}

export interface ContactSectionData {
  badge: string;
  badgeIcon: string;
  title: string;
  titleColor: string;
  contactCards: ContactInfo[];
  isActive?: boolean;
}
