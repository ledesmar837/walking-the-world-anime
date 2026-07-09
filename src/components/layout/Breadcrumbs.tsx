import Link from 'next/link';
import type { Article } from '@/lib/types';
import { Badge } from '@/components/ui/primitives';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `https://walkingtheworldanime.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumbs">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-[var(--color-text-tertiary)]">/</span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--color-text-primary)] font-medium truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
