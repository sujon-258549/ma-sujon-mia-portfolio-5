export interface CreativeItem {
  _id?: string; // MongoDB ID
  id?: string; // Frontend ID (optional, mapping to _id)
  title: string;
  description: string;
  image?: string;
  link?: string;
  icon?: string;
  order?: number;
}

export interface CreativeSectionData {
  isActive?: boolean;
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  items?: CreativeItem[];
}

export interface CreativeSectionProps {
  headerData?: CreativeSectionData | null;
  items?: CreativeItem[];
}
