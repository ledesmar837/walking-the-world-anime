// ============================================
// ⚙️  Configuración global del sitio
// ============================================
import type { SiteConfig } from '@/lib/types';

export const SITE_CONFIG: SiteConfig = {
  name: 'Walking The World Anime',
  tagline: 'Explora el mundo del anime, un paso a la vez',
  description:
    'Portal premium de noticias, estrenos, rankings y curiosidades del anime. Cobertura diaria, análisis profundo y la mejor comunidad otaku en español.',
  url: 'https://walkingtheworldanime.com',
  ogImage: '/images/og-default.jpg',
  twitterHandle: '@WalkingTheWorldAnime',
  language: 'es',
  locale: 'es_ES',
  foundingYear: 2026,
  social: {
    twitter: 'https://twitter.com/WalkingTheWorldAnime',
    youtube: 'https://youtube.com/@WalkingTheWorldAnime',
    discord: 'https://discord.gg/walkingtheworldanime',
    telegram: 'https://t.me/walkingtheworldanime',
  },
  adsense: {
    publisherId: 'ca-pub-XXXXXXXXXXXX', // Reemplazar con ID real
    slots: {
      banner: '0000000000',
      sidebar: '0000000000',
      inContent: '0000000000',
    },
  },
};

export const ITEMS_PER_PAGE = 12;
export const RELATED_ARTICLES_COUNT = 4;
