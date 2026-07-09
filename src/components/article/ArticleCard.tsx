import Link from 'next/link';
import type { Article } from '@/lib/types';
import { Badge, Card } from '@/components/ui/primitives';

// ============================================
// Standard Article Card (grid)
// ============================================
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card hover padding="none" className="flex flex-col h-full group">
      {/* Image */}
      <Link href={`/noticias/${article.slug}`} className="block aspect-[16/9] overflow-hidden">
        <img
          src={article.image}
          alt={article.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category */}
        <div className="mb-2.5">
          <Badge
            variant="primary"
            size="sm"
            href={`/${article.category}`}
          >
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </Badge>
        </div>

        {/* Title */}
        <Link href={`/noticias/${article.slug}`} className="flex-1">
          <h3 className="font-display font-bold text-base lg:text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-[var(--color-text-tertiary)] pt-3 border-t border-[var(--color-border)]">
          <span>
            {new Date(article.date).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span>{article.readingTime} min lectura</span>
        </div>
      </div>
    </Card>
  );
}

// ============================================
// Horizontal Card (sidebar / list)
// ============================================
export function ArticleCardHorizontal({ article }: { article: Article }) {
  return (
    <Link
      href={`/noticias/${article.slug}`}
      className="flex gap-3 p-2 -mx-2 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors group"
    >
      <img
        src={article.image}
        alt={article.imageAlt}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shrink-0"
        loading="lazy"
      />
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="font-display font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2 mb-1">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
          <Badge variant="primary" size="sm">
            {article.category}
          </Badge>
          <span>
            {new Date(article.date).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ============================================
// Featured Horizontal Card (larger)
// ============================================
export function ArticleCardFeaturedHorizontal({ article }: { article: Article }) {
  return (
    <Link
      href={`/noticias/${article.slug}`}
      className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-accent)] transition-all group"
    >
      <img
        src={article.image}
        alt={article.imageAlt}
        className="w-full sm:w-64 h-40 object-cover rounded-xl shrink-0"
        loading="lazy"
      />
      <div className="flex flex-col justify-center min-w-0">
        <Badge variant="primary" size="sm" className="mb-2 w-fit">
          {article.category}
        </Badge>
        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
          <span>
            {new Date(article.date).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span>·</span>
          <span>{article.readingTime} min lectura</span>
        </div>
      </div>
    </Link>
  );
}
