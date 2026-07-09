// ============================================
// 📰  Walking The World Anime — Contenido
//     Imágenes reales via MyAnimeList CDN
// ============================================
import type { Article } from '@/lib/types';

// --- IMAGE CDN (MAL) ---
const IMG = {
  jujutsu: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
  jujutsuS2: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
  onePiece: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
  chainsawMan: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
  soloLeveling: 'https://cdn.myanimelist.net/images/anime/1801/142390l.jpg',
  dandadan: 'https://cdn.myanimelist.net/images/anime/1584/143719l.jpg',
  mieruko: 'https://cdn.myanimelist.net/images/anime/1277/117155l.jpg',
  dragonBall: 'https://cdn.myanimelist.net/images/anime/7/74606l.jpg',
  fate: 'https://cdn.myanimelist.net/images/anime/12/67333l.jpg',
  frieren: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
  aot: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
  cyberpunk: 'https://cdn.myanimelist.net/images/anime/1818/126435l.jpg',
  demonSlayer: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
  hunterXHunter: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
  naruto: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
  deathNote: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
  evangelion: 'https://cdn.myanimelist.net/images/anime/1314/108941l.jpg',
  spyFamily: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
  oshiNoKo: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg',
};

// ============================================
// 🌟 ARTÍCULOS DESTACADOS (Hero Carousel)
// ============================================
export const FEATURED_ARTICLES: Article[] = [
  {
    slug: 'jujutsu-kaisen-temporada-3-trailer',
    title: 'Jujutsu Kaisen Temporada 3 lanza su primer tráiler oficial y confirma fecha de estreno',
    excerpt:
      'MAPPA reveló el esperado tráiler de la tercera temporada de Jujutsu Kaisen durante el Jump Festa. El arco del Juego de la Matanza llegará en octubre de 2026 con animación que promete superar todo lo visto hasta ahora.',
    category: 'noticias',
    tags: ['Jujutsu Kaisen', 'MAPPA', 'Tráiler', 'Shonen'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-09',
    image: IMG.jujutsuS2,
    imageAlt: 'Visual de la temporada 2 de Jujutsu Kaisen — Arco de Shibuya',
    featured: true,
    featuredOrder: 1,
    readingTime: 4,
    seo: {
      keywords: ['Jujutsu Kaisen temporada 3', 'tráiler Jujutsu Kaisen', 'MAPPA'],
    },
    affiliateProducts: [
      { name: 'Figura Yuji Itadori — Banpresto', link: '#', price: '$29.99', platform: 'amazon' },
      { name: 'Manga Jujutsu Kaisen Vol. 1', link: '#', price: '$9.99', platform: 'amazon' },
    ],
  },
  {
    slug: 'one-piece-saga-final-anuncio',
    title: 'One Piece: Eiichiro Oda revela detalles sobre la saga final del manga',
    excerpt:
      'En una entrevista exclusiva, Oda confirmó que la saga final será la más larga de toda la serie y prometió que "ningún fan quedará decepcionado con el desenlace del One Piece".',
    category: 'noticias',
    tags: ['One Piece', 'Eiichiro Oda', 'Manga', 'Shonen'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-08',
    image: IMG.onePiece,
    imageAlt: 'Arte promocional de One Piece — Los Sombrero de Paja',
    featured: true,
    featuredOrder: 2,
    readingTime: 5,
    seo: {
      keywords: ['One Piece saga final', 'Eiichiro Oda', 'fin One Piece'],
    },
  },
  {
    slug: 'chainsaw-man-pelicula-reze',
    title: 'Chainsaw Man: La película del arco de Reze revela fecha de estreno internacional',
    excerpt:
      'El arco de la Bomba llegará a la gran pantalla. MAPPA anunció que la película de Chainsaw Man se estrenará simultáneamente en Japón, Latinoamérica y España en diciembre de 2026.',
    category: 'noticias',
    tags: ['Chainsaw Man', 'MAPPA', 'Película', 'Reze'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-07',
    image: IMG.chainsawMan,
    imageAlt: 'Póster de Chainsaw Man — Denji y Pochita',
    featured: true,
    featuredOrder: 3,
    readingTime: 3,
    seo: {
      keywords: ['Chainsaw Man película', 'arco de Reze', 'estreno Chainsaw Man'],
    },
  },
  {
    slug: 'solo-leveling-temporada-2-record',
    title: 'Solo Leveling Temporada 2 rompe récords de audiencia en Crunchyroll',
    excerpt:
      'El regreso de Sung Jin-Woo arrasó. La segunda temporada de Solo Leveling superó a Demon Slayer como el estreno más visto en la historia de la plataforma con más de 15 millones de visualizaciones.',
    category: 'noticias',
    tags: ['Solo Leveling', 'Crunchyroll', 'Récord', 'A-1 Pictures'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-06',
    image: IMG.soloLeveling,
    imageAlt: 'Sung Jin-Woo en Solo Leveling Temporada 2',
    featured: true,
    featuredOrder: 4,
    readingTime: 4,
    seo: {
      keywords: ['Solo Leveling temporada 2', 'récord Crunchyroll', 'Sung Jin-Woo'],
    },
  },
];

// ============================================
// 📰 NOTICIAS
// ============================================
export const LATEST_ARTICLES: Article[] = [
  {
    slug: 'dandadan-segunda-temporada',
    title: 'Dandadan confirma segunda temporada para enero 2027 con nuevo tráiler',
    excerpt:
      'Science SARU regresa con más acción sobrenatural. La segunda temporada de Dandadan adaptará el arco del Hombre Malvado y promete ser aún más loca que la primera.',
    category: 'noticias',
    tags: ['Dandadan', 'Science SARU', 'Tráiler'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-09',
    image: IMG.dandadan,
    imageAlt: 'Visual de Dandadan — Momo y Okarun',
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
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-09',
    image: IMG.mieruko,
    imageAlt: 'Miko viendo fantasmas en Mieruko-chan',
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
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-08',
    image: IMG.spyFamily,
    imageAlt: 'Collage de animes verano 2026',
    featured: false,
    readingTime: 6,
  },
  {
    slug: 'demon-slayer-arco-castillo-infinito',
    title: 'Demon Slayer: Tráiler del arco del Castillo Infinito revela animación impresionante',
    excerpt:
      'Ufotable vuelve a superarse. El tráiler de la trilogía del Castillo Infinito muestra una calidad de animación que deja sin palabras a los fans de Kimetsu no Yaiba.',
    category: 'noticias',
    tags: ['Demon Slayer', 'Ufotable', 'Película', 'Castillo Infinito'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-07',
    image: IMG.demonSlayer,
    imageAlt: 'Tanjiro en Demon Slayer — Arco del Castillo Infinito',
    featured: false,
    readingTime: 4,
  },
  {
    slug: 'spy-family-pelicula-codigo-blanco',
    title: 'Spy x Family: Código Blanco se convierte en la película más taquillera del año en Japón',
    excerpt:
      'La familia Forger conquista la taquilla japonesa. La película original de Spy x Family superó los 6 mil millones de yenes en su primer mes en cartelera.',
    category: 'noticias',
    tags: ['Spy x Family', 'Película', 'Taquilla', 'WIT Studio'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-06',
    image: IMG.spyFamily,
    imageAlt: 'La familia Forger en Spy x Family: Código Blanco',
    featured: false,
    readingTime: 3,
  },
  {
    slug: 'oshi-no-ko-temporada-3',
    title: 'Oshi no Ko Temporada 3 confirma fecha de estreno con nuevo avance',
    excerpt:
      'El fenómeno de Doga Kobo continúa. La tercera temporada de Oshi no Ko se estrenará en enero de 2027 y adaptará uno de los arcos más impactantes del manga.',
    category: 'noticias',
    tags: ['Oshi no Ko', 'Doga Kobo', 'Estreno'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-05',
    image: IMG.oshiNoKo,
    imageAlt: 'Ai Hoshino y Aqua en Oshi no Ko',
    featured: false,
    readingTime: 3,
  },
  {
    slug: 'ofertas-figuras-julio-2026',
    title: 'Las mejores ofertas en figuras de anime — Julio 2026',
    excerpt:
      'Recopilamos las mejores ofertas en figuras, nendoroids y estatuas de tus animes favoritos. Hasta 40% de descuento en Amazon, AmiAmi y CDJapan.',
    category: 'noticias',
    tags: ['Ofertas', 'Figuras', 'Coleccionismo'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-02',
    image: IMG.demonSlayer,
    imageAlt: 'Colección de figuras de anime',
    featured: false,
    readingTime: 5,
    affiliateProducts: [
      { name: 'Nendoroid Tanjiro', link: '#', price: '$49.99', platform: 'amazon' },
      { name: 'Figura Goku Ultra Instinct', link: '#', price: '$34.99', platform: 'amazon' },
    ],
  },
];

// ============================================
// 💡 CURIOSIDADES
// ============================================
export const CURIOSIDADES: Article[] = [
  {
    slug: 'curiosidades-dragon-ball',
    title: '15 curiosidades de Dragon Ball que probablemente no conocías',
    excerpt:
      '¿Sabías que originalmente Goku iba a ser un mono literal? Descubre datos fascinantes sobre la obra maestra de Akira Toriyama que sorprenderán hasta a los fans más veteranos.',
    category: 'curiosidades',
    tags: ['Dragon Ball', 'Curiosidades', 'Akira Toriyama'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-07',
    image: IMG.dragonBall,
    imageAlt: 'Goku en modo Super Saiyan — Dragon Ball Super',
    featured: false,
    readingTime: 8,
  },
  {
    slug: 'secretos-estudio-ghibli',
    title: '10 secretos del Studio Ghibli que te harán ver sus películas con otros ojos',
    excerpt:
      'Desde mensajes ocultos en El Viaje de Chihiro hasta el verdadero significado de Mi Vecino Totoro. Secretos que Hayao Miyazaki escondió en sus obras maestras.',
    category: 'curiosidades',
    tags: ['Studio Ghibli', 'Hayao Miyazaki', 'Curiosidades', 'Cine'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-05',
    image: IMG.frieren, // Ghibli image not in our set, using another atmospheric image
    imageAlt: 'Escena emblemática del Studio Ghibli',
    featured: false,
    readingTime: 7,
  },
  {
    slug: 'simbolos-ocultos-evangelion',
    title: 'Neon Genesis Evangelion: El significado oculto detrás de sus símbolos religiosos',
    excerpt:
      'Cruces, ángeles, árboles de la vida... Hideaki Anno llenó Evangelion de simbolismo judeocristiano. Te explicamos qué significa realmente cada símbolo.',
    category: 'curiosidades',
    tags: ['Evangelion', 'Hideaki Anno', 'Simbolismo', 'Mecha'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-03',
    image: IMG.evangelion,
    imageAlt: 'Shinji y el EVA-01 en Neon Genesis Evangelion',
    featured: false,
    readingTime: 9,
  },
  {
    slug: 'origen-nombre-attack-on-titan',
    title: '¿Por qué se llama Attack on Titan? El origen del nombre y otros datos de la obra de Isayama',
    excerpt:
      'El título es solo la punta del iceberg. Descubre las inspiraciones históricas, los nombres con doble sentido y las referencias culturales que esconde Shingeki no Kyojin.',
    category: 'curiosidades',
    tags: ['Attack on Titan', 'Hajime Isayama', 'Curiosidades'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-07-01',
    image: IMG.aot,
    imageAlt: 'Eren Jaeger y el Titán de Ataque',
    featured: false,
    readingTime: 6,
  },
  {
    slug: 'death-note-datos-reales',
    title: 'Death Note: 12 reglas de la Death Note que los fans olvidaron y datos increíbles',
    excerpt:
      '¿Recuerdas todas las reglas de la libreta? Repasamos las más olvidadas y los datos más sorprendentes sobre la obra maestra de Tsugumi Ohba y Takeshi Obata.',
    category: 'curiosidades',
    tags: ['Death Note', 'Curiosidades', 'Tsugumi Ohba'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-06-29',
    image: IMG.deathNote,
    imageAlt: 'Light Yagami y Ryuk en Death Note',
    featured: false,
    readingTime: 7,
  },
  {
    slug: 'hunter-x-hunter-hiatus',
    title: 'Hunter x Hunter: La historia detrás del hiatus más famoso del manga',
    excerpt:
      'Los problemas de salud de Yoshihiro Togashi, su lucha por continuar y el amor incondicional de los fans. La verdadera razón por la que HxH sigue en pausa.',
    category: 'curiosidades',
    tags: ['Hunter x Hunter', 'Yoshihiro Togashi', 'Manga', 'Hiatus'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-06-27',
    image: IMG.hunterXHunter,
    imageAlt: 'Gon y Killua en Hunter x Hunter',
    featured: false,
    readingTime: 6,
  },
  {
    slug: 'naruto-inspiraciones-mitologicas',
    title: 'Naruto: Las criaturas mitológicas japonesas que inspiraron a los Bijuus y más',
    excerpt:
      'El Kyubi, Shukaku, Susanoo... Kishimoto se inspiró profundamente en la mitología japonesa. Te contamos las historias reales detrás de cada bestia con cola.',
    category: 'curiosidades',
    tags: ['Naruto', 'Masashi Kishimoto', 'Mitología', 'Bijuu'],
    author: { name: 'Andrea Ledesma' },
    date: '2026-06-25',
    image: IMG.naruto,
    imageAlt: 'Naruto Uzumaki en modo Sabio',
    featured: false,
    readingTime: 8,
  },
];

// ============================================
// 📚 UTILIDADES
// ============================================
export function getAllArticles(): Article[] {
  return [...FEATURED_ARTICLES, ...LATEST_ARTICLES, ...CURIOSIDADES];
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string, limit = 4): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  return getAllArticles()
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
      const aTags = a.tags.filter((t) => current.tags.includes(t)).length;
      const bTags = b.tags.filter((t) => current.tags.includes(t)).length;
      return bMatch + bTags - (aMatch + aTags);
    })
    .slice(0, limit);
}

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
