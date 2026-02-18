export interface AboutHighlight {
  title: string;
  desc: string;
  icon: string; // Storing as string for name representation in modal
}

export interface AboutStat {
  label: string;
  value: string;
  icon: string;
}

export interface AboutSectionData {
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string[];
  image: string;
  name: string;
  role: string;
  highlights: AboutHighlight[];
  stats: AboutStat[];
  isActive?: boolean;
}
