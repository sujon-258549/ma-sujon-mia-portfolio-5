export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface ServicesSectionData {
  badge: string;
  title: string;
  titleHighlight: string;
  services: ServiceItem[];
  isActive?: boolean;
  slNumber?: number;
}
