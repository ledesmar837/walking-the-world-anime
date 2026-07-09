// ============================================
// 📰  Walking The World Anime — Sample Content
// ============================================
import type { Article } from '@/lib/types';

export const FEATURED_ARTICLES: Article[] = [
  {
    slug: 'jujutsu-kaisen-temporada-3-trailer',
    title: 'Jujutsu Kaisen Temporada 3 lanza su primer tráiler oficial y confirma fecha de estreno',
    excerpt:
      'MAPPA reveló el esperado tráiler de la tercera temporada de Jujutsu Kaisen durante el Jump Festa. El arco del Juego de la Matanza llegará en octubre de 2026 con animación que promete superar todo lo visto hasta ahora.',
    category: 'noticias',
    tags: ['Jujutsu Kaisen', 'MAPPA', 'Trailer', 'Shonen'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-09',
    image: 'https://picsum.photos/seed/jjk3/1200/630',
    imageAlt: 'Visual de la temporada 3 de Jujutsu Kaisen',
    featured: true,
    featuredOrder: 1,
    readingTime: 4,
    seo: {
      keywords: [
        'Jujutsu Kaisen temporada 3',
        'trailer Jujutsu Kaisen',
        'fecha estreno Jujutsu Kaisen',
        'MAPPA Jujutsu Kaisen',
      ],
    },
    affiliateProducts: [
      {
        name: 'Figura Yuji Itadori - Banpresto',
        link: '#',
        price: '$29.99',
        platform: 'amazon',
      },
      {
        name: 'Manga Jujutsu Kaisen Vol. 1',
        link: '#',
        price: '$9.99',
        platform: 'amazon',
      },
    ],
  },
  {
    slug: 'one-piece-saga-final-anuncio',
    title: 'One Piece: Eiichiro Oda revela detalles sobre la saga final del manga',
    excerpt:
      'En una entrevista exclusiva, Oda confirmó que la saga final será la más larga de toda la serie y prometió que "ningún fan quedará decepcionado con el desenlace del One Piece".',
    category: 'noticias',
    tags: ['One Piece', 'Eiichiro Oda', 'Manga', 'Shonen'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-08',
    image: 'https://picsum.photos/seed/onepiece/1200/630',
    imageAlt: 'Arte promocional de One Piece saga final',
    featured: true,
    featuredOrder: 2,
    readingTime: 5,
    seo: {
      keywords: ['One Piece saga final', 'Eiichiro Oda', 'fin One Piece', 'One Piece manga'],
    },
  },
  {
    slug: 'chainsaw-man-pelicula-reze',
    title: 'Chainsaw Man: La película del arco de Reze revela fecha de estreno internacional',
    excerpt:
      'El arco de la Bomba llegará a la gran pantalla. MAPPA anunció que la película de Chainsaw Man se estrenará simultáneamente en Japón, Latinoamérica y España en diciembre de 2026.',
    category: 'noticias',
    tags: ['Chainsaw Man', 'MAPPA', 'Película', 'Reze'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-07',
    image: 'https://picsum.photos/seed/csmreze/1200/630',
    imageAlt: 'Póster de la película de Chainsaw Man',
    featured: true,
    featuredOrder: 3,
    readingTime: 3,
    seo: {
      keywords: ['Chainsaw Man película', 'arco de Reze', 'MAPPA película', 'estreno Chainsaw Man'],
    },
  },
  {
    slug: 'solo-leveling-temporada-2-record',
    title: 'Solo Leveling Temporada 2 rompe récords de audiencia en Crunchyroll',
    excerpt:
      'El regreso de Sung Jin-Woo arrasó. La segunda temporada de Solo Leveling superó a Demon Slayer como el estreno más visto en la historia de la plataforma con más de 15 millones de visualizaciones.',
    category: 'noticias',
    tags: ['Solo Leveling', 'Crunchyroll', 'Récord', 'A-1 Pictures'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-06',
    image: 'https://picsum.photos/seed/sololeveling/1200/630',
    imageAlt: 'Sung Jin-Woo en Solo Leveling Temporada 2',
    featured: true,
    featuredOrder: 4,
    readingTime: 4,
    seo: {
      keywords: ['Solo Leveling temporada 2', 'récord Crunchyroll', 'Sung Jin-Woo'],
    },
  },
];

export const LATEST_ARTICLES: Article[] = [
  {
    slug: 'dandadan-segunda-temporada',
    title: 'Dandadan confirma segunda temporada para enero 2027 con nuevo tráiler',
    excerpt:
      'Science SARU regresa con más acción sobrenatural. La segunda temporada de Dandadan adaptará el arco del Hombre Malvado y promete ser aún más loca que la primera.',
    category: 'noticias',
    tags: ['Dandadan', 'Science SARU', 'Trailer'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-09',
    image: 'https://picsum.photos/seed/dandadan/800/450',
    imageAlt: 'Visual de Dandadan temporada 2',
    featured: false,
    readingTime: 3,
  },
  {
    slug: 'mieruko-chan-pelicula',
    title: 'Mieruko-chan tendrá película live-action producida por Netflix',
    excerpt:
      'Netflix apuesta por el terror sobrenatural. La adaptación live-action de Mieruko-chan comenzará producción este año con un elenco japonés de primer nivel.',
    category: 'noticias',
    tags: ['Mieruko-chan', 'Netflix', 'Live-Action'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-09',
    image: 'https://picsum.photos/seed/mieruko/800/450',
    imageAlt: 'Arte de Mieruko-chan',
    featured: false,
    readingTime: 3,
  },
  {
    slug: 'mejores-animes-verano-2026',
    title: 'Top 10 animes más esperados de la temporada de Verano 2026',
    excerpt:
      'Desde secuelas épicas hasta nuevos originales. Analizamos los 10 estrenos que dominarán la conversación esta temporada según las encuestas en Japón.',
    category: 'rankings',
    tags: ['Temporada', 'Verano 2026', 'Top 10'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-08',
    image: 'https://picsum.photos/seed/summer2026/800/450',
    imageAlt: 'Collage de animes verano 2026',
    featured: false,
    readingTime: 6,
  },
  {
    slug: 'curiosidades-dragon-ball',
    title: '15 curiosidades de Dragon Ball que probablemente no conocías',
    excerpt:
      '¿Sabías que originalmente Goku iba a ser un mono literal? Descubre datos fascinantes sobre la obra maestra de Akira Toriyama que sorprenderán hasta a los fans más veteranos.',
    category: 'curiosidades',
    tags: ['Dragon Ball', 'Curiosidades', 'Akira Toriyama'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-07',
    image: 'https://picsum.photos/seed/dragonball/800/450',
    imageAlt: 'Goku niño en Dragon Ball clásico',
    featured: false,
    readingTime: 8,
  },
  {
    slug: 'guia-orden-fate',
    title: 'Guía definitiva: Cómo ver Fate en orden correcto en 2026',
    excerpt:
      'La franquicia Fate tiene más de 20 animes y es un laberinto para nuevos fans. Te explicamos el orden ideal para disfrutar la saga sin perderte ni un detalle.',
    category: 'guias',
    tags: ['Fate', 'Guía', 'Orden', 'Type-Moon'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-06',
    image: 'https://picsum.photos/seed/fate/800/450',
    imageAlt: 'Collage de la franquicia Fate',
    featured: false,
    readingTime: 10,
  },
  {
    slug: 'reseña-frieren',
    title: 'Reseña: Frieren — La obra maestra que redefinió el fantasy en el anime',
    excerpt:
      'Analizamos por qué Frieren: Beyond Journey\'s End se ha convertido en el anime mejor valorado de todos los tiempos en MyAnimeList, superando a Fullmetal Alchemist.',
    category: 'resenas',
    tags: ['Frieren', 'Reseña', 'Madhouse', 'Fantasy'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-05',
    image: 'https://picsum.photos/seed/frieren/800/450',
    imageAlt: 'Frieren y sus compañeros de viaje',
    featured: false,
    readingTime: 7,
  },
  {
    slug: 'personaje-levi-ackerman',
    title: 'Levi Ackerman: El soldado más fuerte de la humanidad — Análisis completo',
    excerpt:
      'Exploramos la psicología, las habilidades y el legado de Levi Ackerman, el personaje más icónico de Attack on Titan y uno de los más queridos de la historia del anime.',
    category: 'personajes',
    tags: ['Levi Ackerman', 'Attack on Titan', 'Análisis'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-04',
    image: 'https://picsum.photos/seed/levi/800/450',
    imageAlt: 'Levi Ackerman en acción',
    featured: false,
    readingTime: 8,
  },
  {
    slug: 'wallpapers-cyberpunk-edgerunners',
    title: 'Los 20 mejores wallpapers 4K de Cyberpunk: Edgerunners',
    excerpt:
      'Colección curada de fondos de pantalla en resolución 4K de Cyberpunk: Edgerunners. Descarga gratis los mejores wallpapers de Lucy, David y Night City.',
    category: 'wallpapers',
    tags: ['Cyberpunk', 'Wallpapers', '4K', 'Trigger'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-03',
    image: 'https://picsum.photos/seed/cyberpunk/800/450',
    imageAlt: 'Wallpaper de Cyberpunk Edgerunners',
    featured: false,
    readingTime: 2,
  },
  {
    slug: 'ofertas-figuras-julio-2026',
    title: 'Las mejores ofertas en figuras de anime — Julio 2026',
    excerpt:
      'Recopilamos las mejores ofertas en figuras, nendoroids y estatuas de tus animes favoritos. Hasta 40% de descuento en Amazon, AmiAmi y CDJapan.',
    category: 'noticias',
    tags: ['Ofertas', 'Figuras', 'Coleccionismo'],
    author: { name: 'Andrea Ledesma', avatar: '' },
    date: '2026-07-02',
    image: 'https://picsum.photos/seed/figures/800/450',
    imageAlt: 'Colección de figuras de anime',
    featured: false,
    readingTime: 5,
    affiliateProducts: [
      { name: 'Nendoroid Tanjiro', link: '#', price: '$49.99', platform: 'amazon' },
      { name: 'Figura Goku UI', link: '#', price: '$34.99', platform: 'amazon' },
    ],
  },
];

// Get all articles
export function getAllArticles(): Article[] {
  return [...FEATURED_ARTICLES, ...LATEST_ARTICLES];
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

// Get articles by category
export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

// Get related articles (same category or tags, excluding current)
export function getRelatedArticles(slug: string, limit = 4): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  return getAllArticles()
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      // Prioritize same category
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
      // Then common tags
      const aTags = a.tags.filter((t) => current.tags.includes(t)).length;
      const bTags = b.tags.filter((t) => current.tags.includes(t)).length;
      return bMatch + bTags - (aMatch + aTags);
    })
    .slice(0, limit);
}

// Search articles
export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return getAllArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
  );
}
