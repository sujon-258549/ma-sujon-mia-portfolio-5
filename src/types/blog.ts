export interface BlogPost {
  id?: string;
  _id?: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
  slug: string;
  isActive?: boolean;
  slNumber?: number;
  content?: string;
}

export interface BlogHeader {
  isActive?: boolean;
  slNumber?: number;
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  type?: string;
}

export interface BlogSectionData extends BlogHeader {
  posts: BlogPost[];
}
