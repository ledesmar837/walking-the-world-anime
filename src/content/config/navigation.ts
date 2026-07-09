// ============================================
// 🧭  Navegación principal
// ============================================
import type { NavItem } from '@/lib/types';

export const MAIN_NAV: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Estrenos', href: '/estrenos' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Curiosidades', href: '/curiosidades' },
  { label: 'Guías', href: '/guias' },
  { label: 'Reseñas', href: '/resenas' },
  { label: 'Personajes', href: '/personajes' },
  { label: 'Wallpapers', href: '/wallpapers' },
];

export const SECONDARY_NAV: NavItem[] = [
  { label: 'Ofertas Anime', href: '/ofertas' },
  { label: 'Acerca de', href: '/acerca-de' },
];

export const FOOTER_NAV = {
  contenido: [
    { label: 'Noticias', href: '/noticias' },
    { label: 'Estrenos', href: '/estrenos' },
    { label: 'Rankings', href: '/rankings' },
    { label: 'Curiosidades', href: '/curiosidades' },
    { label: 'Guías', href: '/guias' },
    { label: 'Reseñas', href: '/resenas' },
  ],
  multimedia: [
    { label: 'Wallpapers', href: '/wallpapers' },
    { label: 'Personajes', href: '/personajes' },
    { label: 'Ofertas Anime', href: '/ofertas' },
  ],
  sitio: [
    { label: 'Acerca de', href: '/acerca-de' },
    { label: 'Contacto', href: '/acerca-de#contacto' },
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Términos', href: '/terminos' },
  ],
};
