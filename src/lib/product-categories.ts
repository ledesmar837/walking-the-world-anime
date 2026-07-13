// ============================================
// 🏷️  Categorías de Productos AliExpress — Optimizado para clics
// Prioridad + personajes + tipos de producto
// ============================================
export interface ProductCategory {
  slug: string;
  name: string;
  icon: string;
  color: string;
  priority: number; // 1-5 estrellas
  description: string;
  // Búsquedas múltiples — se combinan los resultados
  searchQueries: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'dragon-ball',
    name: 'Dragon Ball',
    icon: '🐉',
    color: 'from-orange-500 to-yellow-500',
    priority: 5,
    description: 'Goku, Vegeta, Broly, Gogeta y más',
    searchQueries: [
      'Dragon Ball Goku figure LED',
      'Dragon Ball Vegeta figure GK',
      'Dragon Ball Broly figure statue',
      'Dragon Ball Gogeta articulated figure',
      'Dragon Ball diorama set',
    ],
  },
  {
    slug: 'one-piece',
    name: 'One Piece',
    icon: '🏴‍☠️',
    color: 'from-red-500 to-amber-500',
    priority: 5,
    description: 'Luffy Gear 5, Zoro, Shanks, Ace',
    searchQueries: [
      'One Piece Luffy Gear 5 figure',
      'One Piece Zoro figure GK',
      'One Piece Shanks statue figure',
      'One Piece Ace figure collectible',
    ],
  },
  {
    slug: 'solo-leveling',
    name: 'Solo Leveling',
    icon: '🗡️',
    color: 'from-purple-700 to-indigo-600',
    priority: 5,
    description: 'Sung Jinwoo, Beru, Igris, Cha Hae-In',
    searchQueries: [
      'Solo Leveling Sung Jinwoo figure LED',
      'Solo Leveling Beru figure statue',
      'Solo Leveling Igris figure GK',
      'Solo Leveling diorama figure',
    ],
  },
  {
    slug: 'naruto',
    name: 'Naruto',
    icon: '🍥',
    color: 'from-orange-600 to-yellow-400',
    priority: 5,
    description: 'Naruto Sabio, Sasuke, Itachi, Kakashi, Madara',
    searchQueries: [
      'Naruto figure LED Sasuke',
      'Naruto Itachi figure statue GK',
      'Naruto Kakashi figure articulated',
      'Naruto Madara figure collectible',
      'Naruto diorama set figure',
    ],
  },
  {
    slug: 'demon-slayer',
    name: 'Demon Slayer',
    icon: '⚔️',
    color: 'from-cyan-500 to-teal-600',
    priority: 5,
    description: 'Tanjiro, Nezuko, Rengoku, Muichiro, Tengen',
    searchQueries: [
      'Demon Slayer Tanjiro figure LED',
      'Demon Slayer Rengoku figure GK',
      'Demon Slayer Nezuko figure statue',
      'Demon Slayer Tengen figure articulated',
      'Demon Slayer diorama set',
    ],
  },
  {
    slug: 'jujutsu-kaisen',
    name: 'Jujutsu Kaisen',
    icon: '👁️',
    color: 'from-blue-700 to-indigo-800',
    priority: 4,
    description: 'Gojo, Sukuna, Toji, Yuji, Yuta',
    searchQueries: [
      'Jujutsu Kaisen Gojo figure LED',
      'Jujutsu Kaisen Sukuna figure GK',
      'Jujutsu Kaisen Toji figure statue',
      'Jujutsu Kaisen Yuji figure articulated',
    ],
  },
  {
    slug: 'chainsaw-man',
    name: 'Chainsaw Man',
    icon: '⛓️',
    color: 'from-red-600 to-orange-600',
    priority: 4,
    description: 'Makima, Power, Denji',
    searchQueries: [
      'Chainsaw Man Makima figure',
      'Chainsaw Man Power figure GK',
      'Chainsaw Man Denji figure statue',
    ],
  },
  {
    slug: 'frieren',
    name: 'Frieren',
    icon: '✨',
    color: 'from-sky-400 to-blue-600',
    priority: 4,
    description: 'Frieren, Fern, Stark',
    searchQueries: [
      'Frieren anime figure collectible',
      'Frieren Fern figure statue',
      'Frieren Stark figure GK',
    ],
  },
  {
    slug: 'attack-on-titan',
    name: 'Attack on Titan',
    icon: '🦅',
    color: 'from-stone-600 to-amber-800',
    priority: 4,
    description: 'Levi, Eren Titán, Mikasa',
    searchQueries: [
      'Attack on Titan Levi figure GK',
      'Attack on Titan Eren titan figure statue',
      'Attack on Titan Mikasa figure articulated',
    ],
  },
  {
    slug: 'bleach',
    name: 'Bleach',
    icon: '💀',
    color: 'from-gray-700 to-black',
    priority: 4,
    description: 'Ichigo Bankai, Aizen, Rukia, Ulquiorra',
    searchQueries: [
      'Bleach Ichigo Bankai figure',
      'Bleach Aizen figure statue GK',
      'Bleach Rukia figure collectible',
      'Bleach Ulquiorra figure GK',
    ],
  },
  {
    slug: 'my-hero-academia',
    name: 'My Hero Academia',
    icon: '💥',
    color: 'from-green-500 to-emerald-600',
    priority: 4,
    description: 'Deku, Bakugo, Todoroki',
    searchQueries: [
      'My Hero Academia Deku figure LED',
      'My Hero Academia Bakugo figure GK',
      'My Hero Academia Todoroki figure statue',
    ],
  },
  {
    slug: 'spy-x-family',
    name: 'Spy x Family',
    icon: '🥜',
    color: 'from-pink-400 to-rose-500',
    priority: 4,
    description: 'Anya, Yor, Loid',
    searchQueries: [
      'Spy x Family Anya figure cute',
      'Spy x Family Yor figure GK',
      'Spy x Family Loid figure collectible',
    ],
  },
];

// Bloques temáticos del Shop
export const SHOP_BLOCKS = [
  { id: 'trending', title: '🔥 Tendencias de la Semana', sort: 'volume_desc', limit: 8 },
  { id: 'under50', title: '💰 Menos de $50 USD', sort: 'volume_desc', maxPrice: 50, limit: 8 },
  { id: 'best-rated', title: '⭐ Mejor Valoradas', sort: 'evaluate_rate_desc', limit: 8 },
  { id: 'gifts', title: '🎁 Ideas para Regalo', keywords: 'anime figure gift box set', limit: 8 },
  { id: 'premium', title: '✨ Figuras Premium', keywords: 'anime GK figure statue premium resin', limit: 8 },
  { id: 'gamer', title: '💡 Decoración Gamer', keywords: 'anime mouse pad XL gamer mat poster metal', limit: 8 },
  { id: 'otaku-room', title: '🏠 Habitación Otaku', keywords: 'anime decor room lamp tapestry poster wall', limit: 8 },
];

// Top 5 para Home
export const TOP_FEATURED_SLUGS = ['dragon-ball', 'one-piece', 'solo-leveling', 'naruto', 'demon-slayer'];

export function getCategory(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}
export function getAllCategories(): ProductCategory[] {
  return [...PRODUCT_CATEGORIES].sort((a, b) => b.priority - a.priority);
}
export function getTopCategories(): ProductCategory[] {
  return PRODUCT_CATEGORIES.filter((c) => c.priority === 5);
}

export const PRODUCT_CONFIG = {
  maxPrice: '100000',
  productsPerCategory: 12,
  apiPageSize: 15,
  cacheTTL: 24 * 60 * 60 * 1000,
};
