/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface Author {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  imageUrl: string;
  imageHint?: string;
  videoUrl?: string;
  category: Category;
  author: Author;
  publishedAt: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
