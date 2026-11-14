export type AppCategory = 
  | 'all'
  | 'ai-education'
  | 'classroom-tools'
  | 'learning-study'
  | 'productivity';

export interface WebAppItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  url: string;
  imageUrl: string;
  category: AppCategory;
  tags: string[];
  features: string[];
  targetAudience: string;
  status: 'popular' | 'new' | 'live' | 'featured';
  featured?: boolean;
  viewsCount?: number;
  likesCount?: number;
  createdAt: string;
  updatedAt?: string;
  isCustom?: boolean;
}

export type SortOption = 'featured' | 'newest' | 'likes' | 'alphabetical';
export type ViewMode = 'grid' | 'compact';
