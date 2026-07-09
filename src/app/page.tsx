import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import HeroCarousel from '@/components/home/HeroCarousel';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading } from '@/components/ui/primitives';
import { FEATURED_ARTICLES } from '@/lib/articles';
import { getAllArticlesWithNews } from '@/lib/news-service';

export const revalidate = 1800; // ISR: revalidar cada 30 min

export default async function HomePage() {
  const allArticles = await getAllArticlesWithNews();
  const latestArticles = allArticles.filter((a) => !FEATURED_ARTICLES.find((f) => f.slug === a.slug)).slice(0, 9);

  // Populate sidebar data
  const popularArticles = allArticles.slice(0, 6);
  const allTags = [...new Set(allArticles.flatMap((a) => a.tags))].slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container-main py-8">
          {/* ===== HERO CAROUSEL ===== */}
          <HeroCarousel slides={FEATURED_ARTICLES} />

          {/* ===== AD BANNER (reserved) ===== */}
          <div className="mb-12 h-24 flex items-center justify-center border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] text-sm text-[var(--color-text-tertiary)] bg-[var(--color-surface-card)]">
            📢 Google AdSense — Banner 728×90 — Espacio Reservado
          </div>

          {/* ===== CONTENT + SIDEBAR ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* Main Content */}
            <div>
              {/* Últimas Noticias */}
              <SectionHeading
                title="Últimas Noticias"
                subtitle="Lo más reciente del mundo anime — actualizado cada hora"
                icon="📰"
                href="/noticias"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                {latestArticles.slice(0, 6).map((article, i) => (
                  <div
                    key={article.slug}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>

              {/* Estrenos de la Temporada */}
              <SectionHeading
                title="Estrenos de Temporada"
                subtitle="Verano 2026"
                icon="🆕"
                href="/estrenos"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
                {[
                  { title: 'Jujutsu Kaisen S3', studio: 'MAPPA', genre: 'Acción' },
                  { title: 'Oshi no Ko S3', studio: 'Doga Kobo', genre: 'Drama' },
                  { title: 'Spy x Family S3', studio: 'WIT/CloverWorks', genre: 'Comedia' },
                  { title: 'My Hero Academia S8', studio: 'Bones', genre: 'Acción' },
                ].map((anime) => (
                  <div
                    key={anime.title}
                    className="p-4 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all text-center"
                  >
                    <div className="w-full aspect-[3/4] rounded-lg bg-[var(--color-surface)] mb-3 flex items-center justify-center text-4xl">
                      🎬
                    </div>
                    <h4 className="font-display font-semibold text-sm text-[var(--color-text-primary)] mb-1">
                      {anime.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                      {anime.studio}
                    </p>
                  </div>
                ))}
              </div>

              {/* Rankings Preview */}
              <SectionHeading
                title="Rankings"
                subtitle="Mejor valorados por la comunidad"
                icon="🏆"
                href="/rankings"
              />
              <div className="space-y-3 mb-12">
                {[
                  { rank: 1, title: "Frieren: Beyond Journey's End", score: 9.38 },
                  { rank: 2, title: 'Fullmetal Alchemist: Brotherhood', score: 9.09 },
                  { rank: 3, title: 'Steins;Gate', score: 9.07 },
                  { rank: 4, title: 'Attack on Titan S3 P2', score: 9.05 },
                  { rank: 5, title: 'Jujutsu Kaisen S2', score: 8.91 },
                ].map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all"
                  >
                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${
                      item.rank <= 3
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                    }`}>
                      {item.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-[var(--color-text-primary)] truncate">
                        {item.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="font-bold text-sm text-[var(--color-text-primary)]">
                        {item.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* More articles from different categories */}
              <SectionHeading
                title="Descubre Más"
                subtitle="Contenido variado del mundo anime"
                icon="🌟"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {latestArticles.slice(6, 9).map((article) => (
                  <div key={article.slug} className="animate-fade-in-up">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <Sidebar popularArticles={popularArticles} tags={allTags} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
