export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image_url: string;
  display_order: number;
  created_at: string;
  image_count?: number;
}

export interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail_url: string;
  width: number;
  height: number;
  photographer_name: string;
  photographer_url: string;
  is_ai_generated: boolean;
  download_count: number;
  view_count: number;
  featured: boolean;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface ImageWithTags extends Image {
  tags: Tag[];
  categories: Category[];
}

export type SortOption = 'newest' | 'popular' | 'trending';
