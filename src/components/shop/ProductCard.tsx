// ============================================
// 🛍️  ProductCard — Componente de producto AliExpress
// ============================================
import Link from 'next/link';

interface Product {
  productId: string;
  title: string;
  imageUrl: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  rating: string;
  sales: number;
  freeShipping: boolean;
  commissionRate?: string;
  promotionLink: string;
}

function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '$0';
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}k COP`;
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function calcDiscount(original: string, sale: string): number {
  const orig = parseFloat(original);
  const sl = parseFloat(sale);
  if (!orig || !sl || orig <= sl) return 0;
  return Math.round(((orig - sl) / orig) * 100);
}

export function ProductCard({ product }: { product: Product }) {
  const discountPct = calcDiscount(product.originalPrice, product.salePrice);
  const rating = parseFloat(product.rating);

  return (
    <a
      href={product.promotionLink || '#'}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden relative bg-[var(--color-surface)]">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Discount badge */}
        {discountPct > 0 && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[0.6rem] font-extrabold bg-[var(--color-primary)] text-white">
            -{discountPct}%
          </span>
        )}
        {/* Free shipping */}
        {product.freeShipping && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[0.6rem] font-bold bg-emerald-600 text-white">
            Envío Gratis
          </span>
        )}
        {/* Sales count */}
        {product.sales > 0 && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[0.6rem] font-semibold bg-black/60 text-white backdrop-blur-sm">
            {product.sales >= 1000
              ? `${(product.sales / 1000).toFixed(0)}k vendidos`
              : `${product.sales} vendidos`}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xs font-medium text-[var(--color-text-primary)] line-clamp-2 mb-2 leading-relaxed flex-1 group-hover:text-[var(--color-primary-light)] transition-colors">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-base font-extrabold text-[var(--color-text-primary)]">
            {formatPrice(product.salePrice)}
          </span>
          {discountPct > 0 && (
            <span className="text-xs text-[var(--color-text-tertiary)] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Rating + Commission */}
        <div className="flex items-center gap-2 text-[0.6rem] text-[var(--color-text-tertiary)]">
          {rating > 0 && (
            <span className="flex items-center gap-0.5">
              ⭐ {rating.toFixed(1)}
            </span>
          )}
          {product.commissionRate && (
            <span className="text-[var(--color-accent)] font-semibold">
              +{product.commissionRate}% comisión
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-2 pt-2 border-t border-[var(--color-border)]">
          <span className="block w-full text-center py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold transition-colors">
            Ver en AliExpress →
          </span>
        </div>
      </div>
    </a>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden animate-shimmer">
      <div className="aspect-square bg-[var(--color-surface)]" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-[var(--color-surface)] rounded w-3/4" />
        <div className="h-3 bg-[var(--color-surface)] rounded w-1/2" />
        <div className="h-8 bg-[var(--color-surface)] rounded mt-3" />
      </div>
    </div>
  );
}
