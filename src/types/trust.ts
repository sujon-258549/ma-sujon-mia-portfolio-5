export interface BrandLogo {
  id: string | number;
  name: string;
  image: string;
}

export interface TrustStats {
  label: string;
  value: string;
  icon: string;
}

export interface TrustSectionData {
  title?: string;
  subtitle?: string;
  description?: string;
  isActive?: boolean;
  slNumber?: number;
  brands?: BrandLogo[];
  stats?: TrustStats[];
}
