// ============================================
// 🛍️  /shop/[categoria] — Página de categoría
// ============================================
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/primitives';
import { ProductCard, ProductCardSkeleton } from '@/components/shop/ProductCard';
import { getCategory, getAllCategories } from '@/lib/product-categories';
import { getProductsByCategory } from '@/lib/product-store';
import type { AliExpressProduct } from '@/lib/aliexpress';

export const revalidate = 3600;
export const dynamicParams = true;

// Generar rutas estáticas para todas las categorías
export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ categoria: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) return { title: 'Categoría no encontrada' };

  return {
    title: `${cat.name} — Merchandising de Anime`,
    description: `Las mejores ofertas en figuras, camisetas y coleccionables de ${cat.name}. ${cat.description}`,
    openGraph: {
      title: `Merchandising de ${cat.name} | Walking The World Anime`,
      description: cat.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) notFound();

  let products: AliExpressProduct[] = [];
  try {
    products = await getProductsByCategory(categoria);
  } catch { /* vacío */ }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: category.name },
            ]}
          />

          <SectionHeading
            title={`${category.icon} ${category.name}`}
            subtitle={category.description}
          />

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {products.map((p) => (
                <ProductCard key={p.productId} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-2">
                Cargando productos...
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Estamos buscando las mejores ofertas de {category.name}. Si no ves productos, vuelve en unos minutos.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          )}

          {/* Navegación entre categorías */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <p className="text-xs font-semibold text-[var(--color-text-tertiary)] mb-3 uppercase tracking-wider">
              Más categorías
            </p>
            <div className="flex flex-wrap gap-2">
              {getAllCategories()
                .filter((c) => c.slug !== categoria)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop/${c.slug}`}
                    className="px-4 py-2 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
                  >
                    {c.icon} {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
