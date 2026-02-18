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
  content?: string;
}

export interface BlogSectionData {
  isActive?: boolean;
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  posts: BlogPost[];
}
