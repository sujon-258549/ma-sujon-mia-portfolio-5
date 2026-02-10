export interface ContactInfo {
  icon: string;
  title: string;
  value: string;
}

export interface ContactSectionData {
  badge: string;
  title: string;
  titleColor: string;
  contactCards: ContactInfo[];
}
