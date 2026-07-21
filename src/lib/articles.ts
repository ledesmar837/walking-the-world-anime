// ============================================
// 📰  Walking The World Anime — Noticias actualizadas
//     Julio 2026 | Fuentes: ANN, RamenParaDos, AnmoSugoi, AnimeCorner
// ============================================
import type { Article } from '@/lib/types';

const IMG = {
  // Imágenes CORRECTAS de cada anime en MyAnimeList
  jjk: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
  naruto: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
  // The Angel Next Door Spoils Me Rotten
  angel: 'https://cdn.myanimelist.net/images/anime/1530/117776l.jpg',
  // Frieren (imagen genérica para villainess mientras)
  villainess: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
  // Demon Slayer (imagen genérica para manga)
  manga: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
  // BANANA FISH
  banana: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
  // Spy x Family (PUBG x Naruto)
  pubg: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
  // Oshi no Ko (seiyuu debate)
  seiyuu: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg',
  // Rent-a-Girlfriend
  romance: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
  // Solo Leveling (Tetsuryo Meet)
  tet: 'https://cdn.myanimelist.net/images/anime/1801/142390l.jpg',
  // Dandadan (How to Grill Our Love)
  grill: 'https://cdn.myanimelist.net/images/anime/1584/143719l.jpg',
  // Studio Ghibli - El Viaje de Chihiro
  ghibli: 'https://cdn.myanimelist.net/images/anime/6/79597l.jpg',
  // Attack on Titan
  aot: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
  // Dragon Ball Super
  dbz: 'https://cdn.myanimelist.net/images/anime/7/74606l.jpg',
  // Evangelion
  eva: 'https://cdn.myanimelist.net/images/anime/1314/108941l.jpg',
  // Death Note
  deathnote: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
  // Hunter x Hunter
  hxh: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
};

// 🌟 FEATURED
export const FEATURED_ARTICLES: Article[] = [
  {
    slug: 'pubg-mobile-naruto-shippuden',
    title: 'PUBG MOBILE x Naruto Shippuden: todo lo que incluye la actualización 4.5, ninjutsu, skins y más',
    excerpt: 'La colaboración más esperada del battle royale ya está aquí. Descubre todas las skins exclusivas de Naruto, Sasuke, Sakura y Kakashi, los nuevos modos de juego temáticos y cómo conseguir los objetos gratuitos del evento.',
    category: 'noticias',
    tags: ['PUBG', 'Naruto', 'Gaming', 'Colaboración'],
    author: { name: 'Walking The World Anime' },
    date: '2026-07-11',
    image: IMG.pubg,
    imageAlt: 'PUBG Mobile x Naruto Shippuden colaboración',
    featured: true, featuredOrder: 1, readingTime: 5,
    seo: { keywords: ['PUBG Mobile', 'Naruto Shippuden', 'colaboración anime', 'skins'] },
  },
  {
    slug: 'angel-next-door-anime-dub',
    title: 'The Angel Next Door Spoils Me Rotten recibe doblaje oficial al inglés',
    excerpt: 'El anime romántico más dulce de los últimos años finalmente tendrá versión doblada al inglés. La noticia fue confirmada por Crunchyroll junto con el anuncio de la fecha de estreno del dub.',
    category: 'noticias',
    tags: ['The Angel Next Door', 'Doblaje', 'Crunchyroll', 'Romance'],
    author: { name: 'Anime News Network' },
    date: '2026-07-11',
    image: IMG.angel,
    imageAlt: 'The Angel Next Door Spoils Me Rotten',
    featured: true, featuredOrder: 2, readingTime: 3,
    seo: { keywords: ['The Angel Next Door', 'doblaje inglés', 'anime romance'] },
  },
  {
    slug: 'debate-seiyuu-color-cabello',
    title: 'El debate viral en Japón sobre el color de cabello de las seiyuus: ¿por qué algunos fans lo consideran inapropiado?',
    excerpt: 'Una polémica sacude las redes japonesas. Fans conservadores critican a actrices de voz por teñirse el cabello de colores llamativos, mientras otros defienden su libertad de expresión. Analizamos el debate.',
    category: 'curiosidades',
    tags: ['Seiyuu', 'Japón', 'Debate', 'Cultura'],
    author: { name: 'Anmo Sugoi' },
    date: '2026-07-10',
    image: IMG.seiyuu,
    imageAlt: 'Seiyuus japonesas en evento de anime',
    featured: true, featuredOrder: 3, readingTime: 6,
    seo: { keywords: ['seiyuu', 'color cabello', 'polémica Japón', 'actrices voz'] },
  },
  {
    slug: 'lanzamientos-manga-agosto-2026',
    title: 'Lanzamientos de manga en España: todas las novedades de Panini, Devir y Arechi para agosto 2026',
    excerpt: 'Agosto viene cargado de lanzamientos. Panini trae nuevos tomos de Jujutsu Kaisen y Chainsaw Man, Devir apuesta por BL y Arechi sorprende con licencias inesperadas. Calendario completo.',
    category: 'noticias',
    tags: ['Manga', 'Lanzamientos', 'Panini', 'Devir', 'España'],
    author: { name: 'Ramen Para Dos' },
    date: '2026-07-10',
    image: IMG.manga,
    imageAlt: 'Estantería con tomos de manga',
    featured: true, featuredOrder: 4, readingTime: 4,
    seo: { keywords: ['lanzamientos manga', 'agosto 2026', 'Panini', 'Devir'] },
  },
];

// 📰 NOTICIAS — ordenadas de más nueva a más antigua
export const LATEST_ARTICLES: Article[] = [
  {
    slug: 'banana-fish-netflix-agosto',
    title: 'BANANA FISH llega a Netflix Estados Unidos en agosto con nuevo doblaje en inglés y francés',
    excerpt: 'El clásico de culto de Akimi Yoshida regresa. Netflix prepara el estreno de BANANA FISH con doblajes exclusivos en inglés y francés para conquistar una nueva generación de fans.',
    category: 'noticias',
    tags: ['Banana Fish', 'Netflix', 'Doblaje', 'Clásico'],
    author: { name: 'Anime Corner' },
    date: '2026-07-12',
    image: IMG.banana,
    imageAlt: 'Ash Lynx y Eiji Okumura en Banana Fish',
    featured: false, readingTime: 3,
  },
  {
    slug: 'villainess-inept-interview',
    title: 'Though I Am an Inept Villainess: entrevista con Hana Hishikawa y reseña del panel en Anime Expo',
    excerpt: 'La actriz de voz Hana Hishikawa habla sobre su papel como la villana torpe que conquistó a los fans. Detalles exclusivos desde la Anime Expo 2026.',
    category: 'noticias',
    tags: ['Villainess', 'Entrevista', 'Hana Hishikawa', 'Anime Expo'],
    author: { name: 'Anime Corner' },
    date: '2026-07-12',
    image: IMG.villainess,
    imageAlt: 'Though I Am an Inept Villainess key visual',
    featured: false, readingTime: 4,
  },
  {
    slug: 'tetsuryo-meet-anime',
    title: 'Tetsuryo Meet With Tetsudou Musume revela visual, tráiler y fecha de estreno para octubre 2026',
    excerpt: 'El esperado anime de chicas ferroviarias presenta su primer tráiler completo. El arte visual combina el diseño de personajes moe con trenes japoneses reales.',
    category: 'noticias',
    tags: ['Tetsuryo', 'Tráiler', 'Estreno', 'Slice of Life'],
    author: { name: 'Anime Corner' },
    date: '2026-07-11',
    image: IMG.tet,
    imageAlt: 'Tetsuryo Meet With Tetsudou Musume visual',
    featured: false, readingTime: 3,
  },
  {
    slug: 'rent-girlfriend-recurso-narrativo',
    title: 'El recurso narrativo más odiado del anime de romance en 2026 — y Rent-a-Girlfriend es el culpable',
    excerpt: 'La comunidad anime está harta del "malentendido que dura 12 episodios". Analizamos por qué Rent-a-Girlfriend se ha convertido en el símbolo de este tropo y qué animes de romance lo están haciendo bien.',
    category: 'curiosidades',
    tags: ['Romance', 'Rent-a-Girlfriend', 'Tropos', 'Análisis'],
    author: { name: 'Anmo Sugoi' },
    date: '2026-07-11',
    image: IMG.romance,
    imageAlt: 'Chizuru y Kazuya en Rent-a-Girlfriend',
    featured: false, readingTime: 5,
  },
  {
    slug: 'how-to-grill-love-manga-ends',
    title: 'How to Grill Our Love: el manga de cocina y romance llega a su final',
    excerpt: 'El manga que combinaba recetas de barbacoa con una dulce historia de amor anuncia su capítulo final. Los fans se despiden de Kenta y Chihiro tras 8 volúmenes.',
    category: 'noticias',
    tags: ['Manga', 'Final', 'Cocina', 'Romance'],
    author: { name: 'Anime News Network' },
    date: '2026-07-10',
    image: IMG.grill,
    imageAlt: 'How to Grill Our Love portada manga',
    featured: false, readingTime: 2,
  },
  {
    slug: 'milky-subway-short-anime',
    title: 'Milky☆Subway: The Galactic Limited Express tendrá nuevo anime corto',
    excerpt: 'El peculiar anime sobre un tren espacial interestelar anuncia una nueva entrega. La serie corta promete más aventuras surrealistas a bordo de la línea galáctica.',
    category: 'noticias',
    tags: ['Milky Subway', 'Corto', 'Original', 'Sci-Fi'],
    author: { name: 'Anime News Network' },
    date: '2026-07-10',
    image: 'https://cdn.myanimelist.net/images/anime/1986/157126l.jpg',
    imageAlt: 'Milky Subway anime visual',
    featured: false, readingTime: 2,
  },
  {
    slug: 'jujutsu-kaisen-panini-agosto',
    title: 'Jujutsu Kaisen y Chainsaw Man lideran los lanzamientos de Panini Manga para agosto 2026',
    excerpt: 'Panini revela su catálogo de agosto. Nuevos tomos de Jujutsu Kaisen, Chainsaw Man y Spy x Family encabezan un mes cargado de novedades para los mangalovers españoles.',
    category: 'noticias',
    tags: ['Jujutsu Kaisen', 'Chainsaw Man', 'Panini', 'Manga'],
    author: { name: 'Walking The World Anime' },
    date: '2026-07-09',
    image: IMG.jjk,
    imageAlt: 'Tomos de Jujutsu Kaisen y Chainsaw Man',
    featured: false, readingTime: 3,
  },
  {
    slug: 'naruto-pubg-ninjutsu-skins',
    title: 'Todas las skins del evento Naruto Shippuden x PUBG Mobile: cómo conseguirlas gratis',
    excerpt: 'Guía completa del evento de colaboración. Te explicamos cómo desbloquear las skins de Naruto, Sasuke, Sakura y Kakashi sin gastar dinero real en PUBG Mobile.',
    category: 'noticias',
    tags: ['Naruto', 'PUBG Mobile', 'Guía', 'Gratis'],
    author: { name: 'Walking The World Anime' },
    date: '2026-07-09',
    image: IMG.naruto,
    imageAlt: 'Naruto y equipo 7 en estilo PUBG',
    featured: false, readingTime: 6,
  },
  {
    slug: 'arechi-manga-sorpresas-agosto',
    title: 'Arechi Manga sorprende con nuevas licencias para agosto 2026',
    excerpt: 'La editorial independiente Arechi anuncia tres nuevas licencias que nadie esperaba. Desde un seinen psicológico hasta un slice of life rural, repasamos las apuestas más arriesgadas del mes.',
    category: 'noticias',
    tags: ['Arechi', 'Manga', 'Licencias', 'España'],
    author: { name: 'Walking The World Anime' },
    date: '2026-07-08',
    image: IMG.manga,
    imageAlt: 'Logotipo de Arechi Manga',
    featured: false, readingTime: 3,
  },
];

export const CURIOSIDADES: Article[] = [
  {
    slug: 'curiosidades-dragon-ball',
    title: '15 curiosidades de Dragon Ball que probablemente no conocías',
    excerpt: '¿Sabías que originalmente Goku iba a ser un mono literal? Descubre datos fascinantes sobre la obra maestra de Akira Toriyama.',
    category: 'curiosidades',
    tags: ['Dragon Ball', 'Curiosidades', 'Akira Toriyama'],
    author: { name: 'Walking The World Anime' },
    date: '2026-07-07',
    image: IMG.dbz,
    imageAlt: 'Goku en modo Super Saiyan — Dragon Ball Super',
    featured: false, readingTime: 8,
  },
  {
    slug: 'secretos-estudio-ghibli',
    title: '10 secretos del Studio Ghibli que te harán ver sus películas con otros ojos',
    excerpt: 'Desde mensajes ocultos en El Viaje de Chihiro hasta el verdadero significado de Mi Vecino Totoro.',
    category: 'curiosidades',
    tags: ['Studio Ghibli', 'Hayao Miyazaki', 'Curiosidades'],
    author: { name: 'Walking The World Anime' },
    date: '2026-07-05',
    image: IMG.ghibli,
    imageAlt: 'Escena emblemática de El Viaje de Chihiro — Studio Ghibli',
    featured: false, readingTime: 7,
  },
  {
    slug: 'simbolos-ocultos-evangelion',
    title: 'Neon Genesis Evangelion: El significado oculto detrás de sus símbolos religiosos',
    excerpt: 'Cruces, ángeles, árboles de la vida... Hideaki Anno llenó Evangelion de simbolismo judeocristiano.',
    category: 'curiosidades',
    tags: ['Evangelion', 'Hideaki Anno', 'Simbolismo'],
    author: { name: 'Walking The World Anime' },
    date: '2026-07-03',
    image: IMG.eva,
    imageAlt: 'Shinji y el EVA-01 en Neon Genesis Evangelion',
    featured: false, readingTime: 9,
  },
  {
    slug: 'origen-nombre-attack-on-titan',
    title: '¿Por qué se llama Attack on Titan? El origen del nombre y otros datos de la obra de Isayama',
    excerpt: 'Descubre las inspiraciones históricas, los nombres con doble sentido y las referencias culturales.',
    category: 'curiosidades',
    tags: ['Attack on Titan', 'Hajime Isayama', 'Curiosidades'],
    author: { name: 'Walking The World Anime' },
    date: '2026-07-01',
    image: IMG.aot,
    imageAlt: 'Eren Jaeger y el Titán de Ataque',
    featured: false, readingTime: 6,
  },
  {
    slug: 'death-note-datos-reales',
    title: 'Death Note: 12 reglas de la Death Note que los fans olvidaron y datos increíbles',
    excerpt: 'Repasamos las reglas más olvidadas y los datos más sorprendentes sobre la obra de Tsugumi Ohba.',
    category: 'curiosidades',
    tags: ['Death Note', 'Curiosidades', 'Tsugumi Ohba'],
    author: { name: 'Walking The World Anime' },
    date: '2026-06-29',
    image: IMG.deathnote,
    imageAlt: 'Light Yagami y Ryuk en Death Note',
    featured: false, readingTime: 7,
  },
  {
    slug: 'hunter-x-hunter-hiatus',
    title: 'Hunter x Hunter: La historia detrás del hiatus más famoso del manga',
    excerpt: 'Los problemas de salud de Yoshihiro Togashi, su lucha por continuar y el amor incondicional de los fans.',
    category: 'curiosidades',
    tags: ['Hunter x Hunter', 'Yoshihiro Togashi', 'Hiatus'],
    author: { name: 'Walking The World Anime' },
    date: '2026-06-27',
    image: IMG.hxh,
    imageAlt: 'Gon y Killua en Hunter x Hunter',
    featured: false, readingTime: 6,
  },
];

export function getAllArticles(): Article[] {
  return [...FEATURED_ARTICLES, ...LATEST_ARTICLES, ...CURIOSIDADES];
}
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}
export function getArticlesByCategory(cat: string): Article[] {
  return getAllArticles().filter((a) => a.category === cat);
}
export function getRelatedArticles(slug: string, limit = 4): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  return getAllArticles()
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const aM = a.category === current.category ? 1 : 0;
      const bM = b.category === current.category ? 1 : 0;
      return bM - aM;
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
