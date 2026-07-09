'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading, Skeleton } from '@/components/ui/primitives';
import { searchArticles } from '@/lib/articles';
import type { Article } from '@/lib/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate async search
    const timer = setTimeout(() => {
      if (query.trim()) {
        setResults(searchArticles(query));
      } else {
        setResults([]);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <SectionHeading
        title={query ? `Resultados para "${query}"` : 'Buscar'}
        subtitle={query && !loading ? `${results.length} resultados encontrados` : undefined}
        icon="🔍"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton variant="card" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {results.map((article, i) => (
            <div
              key={article.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-2">
            Sin resultados
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm">
            No encontramos artículos para "{query}". Intenta con otros términos.
          </p>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⌨️</div>
          <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-2">
            ¿Qué quieres buscar?
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Escribe un término de búsqueda o presiona "/" en cualquier parte del sitio.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Suspense fallback={<Skeleton variant="card" />}>
            <SearchContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
