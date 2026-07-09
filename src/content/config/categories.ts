// ============================================
// 🏷️  Categorías del sitio
// ============================================
import type { Category, CategorySlug } from '@/lib/types';

export const CATEGORIES: Record<CategorySlug, Category> = {
  noticias: {
    slug: 'noticias',
    name: 'Noticias',
    description: 'Últimas noticias del mundo del anime y manga',
    color: 'bg-red-600',
    icon: '📰',
  },
  estrenos: {
    slug: 'estrenos',
    name: 'Estrenos',
    description: 'Calendario de estrenos de anime por temporada',
    color: 'bg-blue-600',
    icon: '🆕',
  },
  rankings: {
    slug: 'rankings',
    name: 'Rankings',
    description: 'Los animes mejor valorados por la comunidad',
    color: 'bg-yellow-600',
    icon: '🏆',
  },
  curiosidades: {
    slug: 'curiosidades',
    name: 'Curiosidades',
    description: 'Datos fascinantes y secretos del anime',
    color: 'bg-purple-600',
    icon: '💡',
  },
  guias: {
    slug: 'guias',
    name: 'Guías',
    description: 'Guías completas para disfrutar al máximo',
    color: 'bg-green-600',
    icon: '📚',
  },
  resenas: {
    slug: 'resenas',
    name: 'Reseñas',
    description: 'Análisis y críticas de tus animes favoritos',
    color: 'bg-orange-600',
    icon: '⭐',
  },
  personajes: {
    slug: 'personajes',
    name: 'Personajes',
    description: 'Conoce a fondo los personajes más icónicos',
    color: 'bg-pink-600',
    icon: '🎭',
  },
  wallpapers: {
    slug: 'wallpapers',
    name: 'Wallpapers',
    description: 'Los mejores fondos de pantalla de anime',
    color: 'bg-indigo-600',
    icon: '🖼️',
  },
};

export function getCategory(slug: CategorySlug): Category {
  return CATEGORIES[slug];
}

export function getAllCategories(): Category[] {
  return Object.values(CATEGORIES);
}
