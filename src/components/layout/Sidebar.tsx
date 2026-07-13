import Link from 'next/link';
import type { Article } from '@/lib/types';
import { CATEGORIES, getAllCategories } from '@/content/config/categories';
import { ArticleCardHorizontal } from '@/components/article/ArticleCard';
import { Badge } from '@/components/ui/primitives';

interface SidebarProps {
  popularArticles: Article[];
  tags: string[];
}

export default function Sidebar({ popularArticles, tags }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5">
        <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <span>📂</span> Categorías
        </h3>
        <div className="flex flex-wrap gap-2">
          {getAllCategories().map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--color-radius-lg)] p-5">
        <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <span>🔥</span> Más Populares
        </h3>
        <div className="space-y-1">
          {popularArticles.slice(0, 5).map((article) => (
            <ArticleCardHorizontal key={article.slug} article={article} />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5">
        <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <span>🏷️</span> Tags Populares
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/buscar?q=${encodeURIComponent(tag)}`}
              className="px-2.5 py-1 rounded-md bg-[var(--color-surface)] text-[0.7rem] font-semibold text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Space (reserved) */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5">
        <div className="h-64 border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-md)]"></div>
      </div>

      {/* Social / Community */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5">
        <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <span>💬</span> Comunidad
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed">
          Únete a nuestra comunidad de fans del anime. Noticias, debates y mucho más.
        </p>
        <div className="space-y-2">
          {[
            { label: 'Telegram', href: '#', icon: '✈️', color: 'hover:bg-blue-500/10 hover:text-blue-400' },
            { label: 'Discord', href: '#', icon: '💬', color: 'hover:bg-indigo-500/10 hover:text-indigo-400' },
            { label: 'Twitter/X', href: '#', icon: '𝕏', color: 'hover:bg-gray-500/10 hover:text-gray-300' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border)] ${s.color} transition-all`}
            >
              <span>{s.icon}</span> {s.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
