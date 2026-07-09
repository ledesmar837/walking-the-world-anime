import { getAllArticles as getLocalArticles } from '@/lib/articles';
import { fetchAllFeeds, mergeArticles } from '@/lib/rss';
import type { Article } from '@/lib/types';

// Cache storage (in-memory, resets on cold start)
let cachedArticles: Article[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

/**
 * Get all articles: merges local content with RSS feeds
 * Uses caching to avoid hitting RSS sources too often
 */
export async function getAllArticlesWithNews(): Promise<Article[]> {
  const now = Date.now();

  // Return cache if still fresh
  if (cachedArticles && now - lastFetchTime < CACHE_TTL) {
    return cachedArticles;
  }

  try {
    const localArticles = getLocalArticles();
    const rssArticles = await fetchAllFeeds();

    if (rssArticles.length > 0) {
      cachedArticles = mergeArticles(localArticles, rssArticles);
    } else {
      cachedArticles = localArticles;
    }

    lastFetchTime = now;
    return cachedArticles;
  } catch (error) {
    console.warn('Error fetching RSS feeds, using local articles:', error);
    return getLocalArticles();
  }
}

/**
 * Get article by slug — checks local first, then RSS cache
 */
export async function getArticleBySlugWithNews(
  slug: string
): Promise<Article | undefined> {
  const articles = await getAllArticlesWithNews();
  return articles.find((a) => a.slug === slug);
}

/**
 * Force refresh the cache (useful for webhooks/cron)
 */
export async function refreshNewsCache(): Promise<Article[]> {
  cachedArticles = null;
  lastFetchTime = 0;
  return getAllArticlesWithNews();
}
