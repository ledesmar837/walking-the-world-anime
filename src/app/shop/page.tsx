// ============================================
// 🛍️  /shop — Tienda con bloques temáticos
// ============================================
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/primitives';
import { ProductCard, ProductCardSkeleton } from '@/components/shop/ProductCard';
import { getAllCategories, getTopCategories } from '@/lib/product-categories';
import { getTopSellingProducts, getProductsByCategory } from '@/lib/product-store';
import type { AliExpressProduct } from '@/lib/aliexpress';

export const metadata: Metadata = {
  title: 'Shop Anime — Figuras y Coleccionables',
  description: 'Figuras LED, GK, articuladas, dioramas y merchandising de anime. Envío internacional.',
};
export const revalidate = 3600;

async function ProductGrid({ products, limit = 6 }: { products: AliExpressProduct[]; limit?: number }) {
  if (!products.length) return <SkeletonGrid count={limit} />;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {products.slice(0, limit).map((p) => (
        <ProductCard key={p.productId} product={p} />
      ))}
    </div>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function ShopPage() {
  const topCategories = getTopCategories();
  const allCategories = getAllCategories();

  let topProducts: AliExpressProduct[] = [];
  let topFeatured: { slug: string; name: string; icon: string; products: AliExpressProduct[] }[] = [];
  try {
    topProducts = await getTopSellingProducts(12);
    for (const cat of topCategories) {
      const prods = await getProductsByCategory(cat.slug);
      topFeatured.push({ slug: cat.slug, name: cat.name, icon: cat.icon, products: prods.slice(0, 6) });
    }
  } catch { /* vacío */ }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <SectionHeading title="🛒 Shop Anime" subtitle="Figuras LED, GK, articuladas, dioramas y más" />

          {/* Grid de categorías rápido */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-12">
            {allCategories.map((cat) => (
              <Link key={cat.slug} href={`/shop/${cat.slug}`} className="p-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:-translate-y-1 transition-all text-center group">
                <span className="text-2xl block mb-1">{cat.icon}</span>
                <span className="text-[0.6rem] font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>

          {/* 🔥 Más Vendidos */}
          <section className="mb-12">
            <SectionHeading title="🔥 Más Vendidos" subtitle="Lo que todos están comprando" />
            <ProductGrid products={topProducts} limit={8} />
          </section>

          {/* Bloques por categoría top 5 */}
          {topFeatured.map((cat) => (
            <section key={cat.slug} className="mb-12">
              <div className="flex items-end justify-between mb-4">
                <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.name}
                </h2>
                <Link href={`/shop/${cat.slug}`} className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors whitespace-nowrap">
                  Ver todo →
                </Link>
              </div>
              <ProductGrid products={cat.products} limit={6} />
            </section>
          ))}

          {/* 💰 Menos de $50 */}
          <section className="mb-12">
            <SectionHeading title="💰 Menos de $50 USD" subtitle="Calidad a precio accesible" />
            <ProductGrid products={topProducts.filter((p) => parseFloat(p.salePrice) <= 50)} limit={8} />
          </section>

          {/* ⭐ Mejor Valoradas */}
          <section className="mb-12">
            <SectionHeading title="⭐ Mejor Valoradas" subtitle="Los productos con mejores reseñas" />
            <ProductGrid products={[...topProducts].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))} limit={8} />
          </section>

          {/* Categorías restantes */}
          {allCategories.filter((c) => c.priority < 5).slice(0, 4).map((cat) => (
            <section key={cat.slug} className="mb-12">
              <div className="flex items-end justify-between mb-4">
                <h2 className="font-display font-bold text-lg text-[var(--color-text-primary)] flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.name}
                </h2>
                <Link href={`/shop/${cat.slug}`} className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors whitespace-nowrap">
                  Ver todo →
                </Link>
              </div>
              <ProductGrid products={[]} limit={6} />
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
