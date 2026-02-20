export interface FaqItem {
  id: number | string;
  question: string;
  answer: string;
}

export interface FaqSectionData {
  title?: string;
  subtitle?: string;
  description?: string;
  isActive?: boolean;
  slNumber?: number;
  faqs?: FaqItem[];
}
