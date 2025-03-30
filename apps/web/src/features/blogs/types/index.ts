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


export interface BlogPostSummary {
  id: number | string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  tags: string[]
  featured?: boolean
  imageUrl?: string
  featuredImage: string
  images?: string[]
}