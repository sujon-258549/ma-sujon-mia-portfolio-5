export interface WelcomeModalData {
  isActive: boolean;
  welcomeBadge: string;
  title: string;
  titleHighlight: string;
  description: string;
  quickLinks: {
    id: string; // DOM ID to scroll to
    label: string;
    icon: string; // FontAwesome class
  }[];
  ctaText: string;
  ctaLink: string; // DOM ID to scroll to
}
