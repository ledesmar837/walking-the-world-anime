import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading, Badge } from '@/components/ui/primitives';

export const metadata: Metadata = {
  title: 'Ofertas Anime',
  description: 'Las mejores ofertas en figuras, mangas y productos de anime. Enlaces de afiliado a Amazon, CDJapan y más.',
};

export default function OfertasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Ofertas Anime' }]} />
          <SectionHeading title="Ofertas Anime" subtitle="Productos recomendados con descuento" icon="🛒" />
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Productos seleccionados de nuestros afiliados. Como Afiliado de Amazon y otros programas, recibimos una comisión por compras elegibles.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Figura Tanjiro Kamado', price: '$49.99', platform: 'Amazon', discount: '-30%' },
              { name: 'Nendoroid Gojo Satoru', price: '$59.99', platform: 'CDJapan', discount: '-20%' },
              { name: 'Manga Jujutsu Kaisen Vol. 1', price: '$9.99', platform: 'Amazon', discount: '-15%' },
              { name: 'Estatua Levi Ackerman', price: '$199.99', platform: 'AmiAmi', discount: '-10%' },
              { name: 'Poster Demon Slayer', price: '$14.99', platform: 'Amazon', discount: '-25%' },
              { name: 'Llavero Chainsaw Man', price: '$12.99', platform: 'CDJapan', discount: '-5%' },
            ].map((product, i) => (
              <a
                key={i}
                href="#"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="p-4 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all group"
              >
                <div className="aspect-square rounded-lg bg-[var(--color-surface)] mb-3 flex items-center justify-center text-6xl">📦</div>
                <Badge variant="primary" size="sm" className="mb-2">{product.discount}</Badge>
                <h4 className="font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-1">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--color-accent)]">{product.price}</span>
                  <span className="text-xs text-[var(--color-text-tertiary)]">{product.platform}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
