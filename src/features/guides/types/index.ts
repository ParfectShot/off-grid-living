// Export guide types

export interface Guide {
  id: string;
  title: string;
  slug: string;
  category: string;
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

export interface GuideCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
} 