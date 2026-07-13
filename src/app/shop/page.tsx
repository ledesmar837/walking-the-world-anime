// ============================================
// 🛍️  /shop — Tienda principal AliExpress Affiliate
// ============================================
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/primitives';
import { ProductCard, ProductCardSkeleton } from '@/components/shop/ProductCard';
import {
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from '@/lib/product-categories';
import { getProductsByCategory, getTopSellingProducts } from '@/lib/product-store';
import type { AliExpressProduct } from '@/lib/aliexpress';

export const metadata: Metadata = {
  title: 'Shop — Merchandising de Anime',
  description:
    'Las mejores ofertas en figuras, camisetas y coleccionables de anime. Productos oficiales con envío a Colombia desde AliExpress.',
  openGraph: {
    title: 'Shop de Anime | Walking The World Anime',
    description:
      'Figuras, camisetas y coleccionables de tus animes favoritos con los mejores precios.',
  },
};

export const revalidate = 3600; // ISR: 1 hora

// ============================================
// BLOQUE DE CATEGORÍA (para reutilizar)
// ============================================
async function CategoryBlock({ category }: { category: ProductCategory }) {
  let products: AliExpressProduct[] = [];
  try {
    products = await getProductsByCategory(category.slug);
  } catch {
    // Silencioso — se muestra vacío si falla
  }

  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)]">
              {category.name}
            </h2>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              {category.description}
            </p>
          </div>
        </div>
        <Link
          href={`/shop/${category.slug}`}
          className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors whitespace-nowrap"
        >
          Ver todo →
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.productId} product={p} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
    </section>
  );
}

// ============================================
// PÁGINA PRINCIPAL
// ============================================
export default async function ShopPage() {
  let topProducts: AliExpressProduct[] = [];
  try {
    topProducts = await getTopSellingProducts(12);
  } catch { /* vacío */ }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <SectionHeading
            title="Shop de Anime"
            subtitle="Merchandising oficial con los mejores precios y envío a Colombia"
            icon="🛒"
          />

          {/* Grid de categorías */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="p-4 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:-translate-y-1 transition-all text-center group"
              >
                <span className="text-3xl block mb-2">{cat.icon}</span>
                <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>

          {/* 🔥 Más Vendidos */}
          {topProducts.length > 0 && (
            <section className="mb-12">
              <SectionHeading
                title="🔥 Más Vendidos"
                subtitle="Los productos más populares entre fans del anime"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {topProducts.map((p) => (
                  <ProductCard key={p.productId} product={p} />
                ))}
              </div>
            </section>
          )}

          {/* Bloques por categoría */}
          {PRODUCT_CATEGORIES.slice(0, 4).map((cat) => (
            <CategoryBlock key={cat.slug} category={cat} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
