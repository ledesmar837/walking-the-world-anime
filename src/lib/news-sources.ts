// ============================================
// 📡 Fuentes de noticias anime verificadas
// ============================================

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  rssUrl: string;
  language: 'es' | 'en';
  category: string;
  priority: number; // 1-10, higher = more important
  logo?: string;
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: 'somoskudasai',
    name: 'SomosKudasai',
    url: 'https://somoskudasai.com',
    rssUrl: 'https://somoskudasai.com/feed/',
    language: 'es',
    category: 'noticias',
    priority: 10,
    logo: 'https://somoskudasai.com/wp-content/uploads/2020/01/cropped-icon.png',
  },
  {
    id: 'ramenparados',
    name: 'Ramen Para Dos',
    url: 'https://ramenparados.com',
    rssUrl: 'https://ramenparados.com/feed/',
    language: 'es',
    category: 'noticias',
    priority: 9,
  },
  {
    id: 'anmosugoi',
    name: 'Anmo Sugoi',
    url: 'https://www.anmosugoi.com',
    rssUrl: 'https://www.anmosugoi.com/feed/',
    language: 'es',
    category: 'noticias',
    priority: 8,
  },
  {
    id: 'crunchyroll-news',
    name: 'Crunchyroll News',
    url: 'https://www.crunchyroll.com/news',
    rssUrl: 'https://www.crunchyroll.com/news/rss',
    language: 'en',
    category: 'noticias',
    priority: 9,
  },
  {
    id: 'ann',
    name: 'Anime News Network',
    url: 'https://www.animenewsnetwork.com',
    rssUrl: 'https://www.animenewsnetwork.com/news/rss.xml',
    language: 'en',
    category: 'noticias',
    priority: 10,
  },
  {
    id: 'animecorner',
    name: 'Anime Corner',
    url: 'https://animecorner.me',
    rssUrl: 'https://animecorner.me/feed/',
    language: 'en',
    category: 'noticias',
    priority: 7,
  },
];

// Get sources by language
export function getSourcesByLanguage(lang: 'es' | 'en'): NewsSource[] {
  return NEWS_SOURCES.filter((s) => s.language === lang);
}

// Get prioritized sources (Spanish first, then English)
export function getPrioritizedSources(): NewsSource[] {
  return [...NEWS_SOURCES].sort((a, b) => b.priority - a.priority);
}
