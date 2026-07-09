// ============================================
// 🏷️  Walking The World Anime — TypeScript Types
// ============================================

// --- ARTICLE ---
export interface ArticleAuthor {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
}

export interface AffiliateProduct {
  name: string;
  link: string;
  price?: string;
  image?: string;
  platform?: 'amazon' | 'cdjapan' | 'amiami' | 'other';
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  tags: string[];
  author: ArticleAuthor;
  date: string;
  lastModified?: string;
  image: string;
  imageAlt: string;
  imageCredit?: string;
  featured: boolean;
  featuredOrder?: number;
  readingTime: number;
  seo?: ArticleSEO;
  affiliateProducts?: AffiliateProduct[];
  contentHtml?: string;
}

// --- CATEGORIES ---
export type CategorySlug =
  | 'noticias'
  | 'estrenos'
  | 'rankings'
  | 'curiosidades'
  | 'guias'
  | 'resenas'
  | 'personajes'
  | 'wallpapers';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  color: string;     // Tailwind color class for badges
  icon: string;       // Emoji icon
}

// --- NAVIGATION ---
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// --- RANKINGS ---
export interface RankingEntry {
  rank: number;
  title: string;
  image: string;
  score: number;
  genre: string[];
  episodes?: number;
  status: 'airing' | 'completed' | 'upcoming';
  synopsis?: string;
}

export interface Ranking {
  id: string;
  title: string;
  description: string;
  type: 'weekly' | 'monthly' | 'all-time';
  entries: RankingEntry[];
  lastUpdated: string;
}

// --- SEARCH ---
export interface SearchResult {
  type: 'article' | 'anime' | 'character';
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  category?: string;
}

// --- SITE CONFIG ---
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  twitterHandle: string;
  language: string;
  locale: string;
  foundingYear: number;
  social: {
    twitter?: string;
    youtube?: string;
    discord?: string;
    telegram?: string;
    twitch?: string;
  };
  adsense: {
    publisherId: string;
    slots: {
      banner: string;
      sidebar: string;
      inContent: string;
    };
  };
}

// --- PAGINATION ---
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

// --- AD COMPONENTS ---
export interface AdSlotProps {
  slotId: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
  style?: 'banner' | 'sidebar' | 'in-content';
}
