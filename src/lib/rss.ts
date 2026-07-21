// ============================================
// 📥 RSS Feed Parser — Convierte RSS a Articles
// ============================================
import type { Article, CategorySlug } from '@/lib/types';
import { NEWS_SOURCES } from '@/lib/news-sources';

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category?: string;
  'media:content'?: { url: string };
  enclosure?: { url: string };
  creator?: string;
}

interface RSSFeed {
  rss?: {
    channel?: Array<{
      title?: string[];
      item?: RSSItem[];
    }>;
  };
  feed?: {
    entry?: Array<{
      title: Array<{ _?: string } | string>;
      link: Array<{ href?: string; _?: string }>;
      summary?: Array<{ _?: string } | string>;
      updated?: string[];
      category?: Array<{ term?: string; _?: string }>;
    }>;
  };
}

// Simple XML to JSON-like parsing for RSS
export function parseRSSXML(xml: string): RSSItem[] {
  const items: RSSItem[] = [];

  // Match <item>...</item> blocks
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let itemMatch;

  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const itemXml = itemMatch[1];
    const item: RSSItem = {
      title: extractTag(itemXml, 'title'),
      link: extractTag(itemXml, 'link'),
      description: stripHTML(extractTag(itemXml, 'description')),
      pubDate: extractTag(itemXml, 'pubDate'),
      creator: extractTag(itemXml, 'dc:creator') || extractTag(itemXml, 'author'),
    };

    // Try to get image from media:content or enclosure
    const mediaContent = itemXml.match(/<media:content[^>]*url="([^"]*)"/i);
    const enclosure = itemXml.match(/<enclosure[^>]*url="([^"]*)"/i);
    if (mediaContent) item['media:content'] = { url: mediaContent[1] };
    if (enclosure) item.enclosure = { url: enclosure[1] };

    items.push(item);
  }

  return items;
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = xml.match(regex);
  if (match) return (match[1] || match[2] || '').trim();
  return '';
}

function stripHTML(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Lista de términos obligatorios para filtrar contenido no-anime
// El título debe contener al menos uno de estos para ser aceptado
const ANIME_KEYWORDS = [
  // Español
  'anime', 'manga', 'otaku', 'seiyuu', 'estreno', 'película',
  'temporada', 'capítulo', 'episodio', 'doblaje', 'dub', 'sub',
  'tv', 'netflix', 'crunchyroll', 'disney', 'hulu', 'prime video',
  'japonés', 'japones', 'japón', 'japon', 'shonen', 'shounen',
  'seinen', 'shojo', 'shoujo', 'isekai', 'slice of life',
  'anime/manga', 'cosplay', 'figura', 'merchandising',
  // Inglés
  'season', 'episode', 'premiere', 'trailer', 'teaser',
  'voice actor', 'actress', 'soundtrack', 'ost', 'opening',
  'ending', 'adaptation', 'sequel', 'prequel', 'remake',
  'film', 'movie', 'ova', 'ona', 'special',
  'studio ghibli', 'toei', 'mappa', 'kyoto animation', 'ufotable',
  'wit studio', 'bones', 'madhouse', 'trigger', 'a-1 pictures',
  'cloverworks', 'science saru', 'production ig', 'sunrise',
  'bandai', 'aniplex', 'kodansha', 'shueisha', 'shogakukan',
  'tokyo', 'akihabara', 'comiket', 'comic market',
  'anime expo', 'crunchyroll expo', 'comic-con',
  'gundam', 'pokémon', 'pokemon', 'dragon ball', 'naruto',
  'one piece', 'demon slayer', 'jujutsu kaisen', 'chainsaw man',
  'attack on titan', 'shingeki', 'frieren', 'sousou no frieren',
  'solo leveling', 'oshi no ko', 'spy x family', 'dandadan',
  'mushoku tensei', 're:zero', 'steins;gate', 'evangelion',
  'death note', 'hunter x hunter', 'fullmetal alchemist',
  'bleach', 'one punch man', 'mob psycho', 'my hero academia',
  'boku no hero', 'kimetsu', 'kaguya-sama', 'love is war',
];

function isAnimeRelated(title: string): boolean {
  const lower = title.toLowerCase();
  return ANIME_KEYWORDS.some((kw) => lower.includes(kw));
}

// Convert RSS item to our Article format
// Returns null if the item is not anime-related
function rssItemToArticle(
  item: RSSItem,
  sourceId: string,
  index: number
): Article | null {
  const source = NEWS_SOURCES.find((s) => s.id === sourceId);
  const slug = item.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 80);

  // Filtrar solo contenido relacionado a anime
  if (!isAnimeRelated(item.title)) {
    return null;
  }

  const image =
    item['media:content']?.url ||
    item.enclosure?.url ||
    `https://picsum.photos/seed/${slug.substring(0, 10)}/800/450`;

  // Estimate reading time
  const wordCount = item.description.split(/\s+/).length;
  const readingTime = Math.max(2, Math.ceil(wordCount / 200));

  // Determine category
  const categoryMap: Record<string, CategorySlug> = {
    noticias: 'noticias',
    news: 'noticias',
    anime: 'noticias',
    manga: 'noticias',
    estrenos: 'estrenos',
    reviews: 'resenas',
  };
  const rawCat = (item.category || '').toLowerCase();
  const category: CategorySlug = categoryMap[rawCat] || 'noticias';

  return {
    slug,
    title: stripHTML(item.title).substring(0, 150),
    excerpt: item.description.substring(0, 200).replace(/\n/g, ' ').trim() + '...',
    category,
    tags: [source?.name || 'Noticias', 'Anime'],
    author: {
      name: item.creator || source?.name || 'Walking The World Anime',
    },
    date: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
    image,
    imageAlt: item.title,
    imageCredit: `Fuente: ${source?.name}`,
    featured: false,
    readingTime,
    seo: {
      keywords: [source?.name || '', 'anime', 'noticias'],
    },
  };
}

// Fetch and parse a single RSS feed
export async function fetchRSSFeed(sourceId: string): Promise<Article[]> {
  const source = NEWS_SOURCES.find((s) => s.id === sourceId);
  if (!source) return [];

  try {
    const response = await fetch(source.rssUrl, {
      headers: {
        'User-Agent': 'WalkingTheWorldAnime/1.0 (RSS Reader)',
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
    });

    if (!response.ok) {
      console.warn(`Failed to fetch ${source.name}: ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const items = parseRSSXML(xml);

    return items
      .map((item, i) => rssItemToArticle(item, sourceId, i))
      .filter((a): a is Article => a !== null);
  } catch (error) {
    console.warn(`Error fetching ${source.name}:`, error);
    return [];
  }
}

// Fetch all configured RSS feeds
export async function fetchAllFeeds(): Promise<Article[]> {
  const results = await Promise.allSettled(
    NEWS_SOURCES.map((source) => fetchRSSFeed(source.id))
  );

  const allArticles: Article[] = [];
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      allArticles.push(...result.value);
    } else {
      console.warn(`Feed ${NEWS_SOURCES[i].name} failed:`, result.reason);
    }
  });

  // Sort by date (newest first) and remove duplicates by title similarity
  const seen = new Set<string>();
  const unique = allArticles
    .filter((a) => {
      const key = a.title.substring(0, 50).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return unique;
}

// Merge RSS articles with our content articles
export function mergeArticles(
  existingArticles: Article[],
  rssArticles: Article[],
  maxArticles = 30
): Article[] {
  const existingSlugs = new Set(existingArticles.map((a) => a.slug));
  const newArticles = rssArticles.filter((a) => !existingSlugs.has(a.slug));

  // Prefer content articles, fill with RSS
  return [...existingArticles, ...newArticles].slice(0, maxArticles);
}
