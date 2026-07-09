import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guías de Anime',
  description: 'Guías completas para disfrutar al máximo del anime. Órdenes de visionado, explicaciones y más.',
};

export { default } from '@/app/curiosidades/page';

// Re-exporting with different metadata — this is a workaround.
// In production, each page should have its own implementation.
