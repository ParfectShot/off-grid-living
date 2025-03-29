// Export blog types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt: Date;
  updatedAt?: Date;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
} 