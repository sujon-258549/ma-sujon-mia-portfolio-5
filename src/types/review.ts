export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  email?: string;
  phone?: string;
  content: string;
  rating: number;
  date?: string;
  isActive?: boolean;
}

// Interface for the section header data (dynamic content)
export interface ReviewSectionHeaderData {
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  isActive?: boolean;
}

// Interface for the combined data (if needed by some components)
export interface ReviewSectionData extends ReviewSectionHeaderData {
  reviews: Review[];
}
