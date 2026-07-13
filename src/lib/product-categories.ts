// ============================================
// 🏷️  Categorías de Productos — AliExpress Affiliate
// ============================================
export interface ProductCategory {
  slug: string;
  name: string;
  searchQuery: string;
  icon: string;
  color: string;
  description: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { slug: 'dragon-ball', name: 'Dragon Ball', searchQuery: 'Dragon Ball figura anime', icon: '🐉', color: 'from-orange-500 to-yellow-500', description: 'Figuras, camisetas y coleccionables de Goku, Vegeta y toda la saga' },
  { slug: 'one-piece', name: 'One Piece', searchQuery: 'One Piece figura anime Luffy', icon: '🏴‍☠️', color: 'from-red-500 to-amber-500', description: 'Merchandising de Luffy, Zoro y los Sombrero de Paja' },
  { slug: 'naruto', name: 'Naruto', searchQuery: 'Naruto figura anime Kakashi', icon: '🍥', color: 'from-orange-600 to-yellow-400', description: 'Figuras, accesorios y ropa de Naruto, Sasuke y la Aldea Oculta' },
  { slug: 'solo-leveling', name: 'Solo Leveling', searchQuery: 'Solo Leveling figura anime Sung Jin Woo', icon: '🗡️', color: 'from-purple-700 to-indigo-600', description: 'Figuras del Cazador de las Sombras y artículos de Solo Leveling' },
  { slug: 'frieren', name: 'Frieren', searchQuery: 'Frieren anime figura elfa', icon: '✨', color: 'from-sky-400 to-blue-600', description: 'Coleccionables de Frieren, Fern y Stark — el anime #1' },
  { slug: 'demon-slayer', name: 'Demon Slayer', searchQuery: 'Demon Slayer Kimetsu no Yaiba figura Tanjiro', icon: '⚔️', color: 'from-cyan-500 to-teal-600', description: 'Figuras de Tanjiro, Nezuko y los Pilares de Kimetsu no Yaiba' },
  { slug: 'jujutsu-kaisen', name: 'Jujutsu Kaisen', searchQuery: 'Jujutsu Kaisen figura anime Gojo', icon: '👁️', color: 'from-blue-700 to-indigo-800', description: 'Merchandising de Gojo, Yuji, Megumi y el mundo de la hechicería' },
  { slug: 'chainsaw-man', name: 'Chainsaw Man', searchQuery: 'Chainsaw Man figura anime Denji', icon: '⛓️', color: 'from-red-600 to-orange-600', description: 'Figuras de Denji, Power, Makima y los Demonios de la Motosierra' },
  { slug: 'attack-on-titan', name: 'Attack on Titan', searchQuery: 'Attack on Titan figura anime Eren', icon: '🦅', color: 'from-stone-600 to-amber-800', description: 'Coleccionables del Cuerpo de Exploración y los Titanes' },
  { slug: 'spy-x-family', name: 'Spy x Family', searchQuery: 'Spy x Family figura anime Anya', icon: '🥜', color: 'from-pink-400 to-rose-500', description: 'Figuras adorables de Anya, Loid y Yor Forger' },
  { slug: 'bleach', name: 'Bleach', searchQuery: 'Bleach figura anime Ichigo Kurosaki', icon: '💀', color: 'from-gray-700 to-black', description: 'Merchandising de Ichigo, Rukia y los capitanes de la Sociedad de Almas' },
  { slug: 'my-hero-academia', name: 'My Hero Academia', searchQuery: 'My Hero Academia figura anime Deku', icon: '💥', color: 'from-green-500 to-emerald-600', description: 'Figuras de Deku, All Might, Bakugo y los héroes de la UA' },
];

export function getCategory(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategories(): ProductCategory[] {
  return PRODUCT_CATEGORIES;
}

// Configuración de búsqueda
export const PRODUCT_CONFIG = {
  maxPrice: '100000',       // COP
  productsPerCategory: 12,
  apiPageSize: 20,
  cacheTTL: 24 * 60 * 60 * 1000, // 24 horas
};
