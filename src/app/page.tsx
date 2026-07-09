import Link from 'next/link';
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
                  { title: 'Jujutsu Kaisen S2', date: 'Jul 2023', img: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg' },
                  { title: 'Oshi no Ko', date: 'Abr 2023', img: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg' },
                  { title: 'Spy x Family', date: 'Abr 2022', img: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg' },
                  { title: 'Mushoku Tensei', date: 'Ene 2021', img: 'https://cdn.myanimelist.net/images/anime/1530/117776l.jpg' },
                ].map((anime) => (
                  <Link
                    key={anime.title}
                    href="/estrenos"
                    className="rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all overflow-hidden group block"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={anime.img} alt={anime.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-display font-semibold text-sm text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary-light)] transition-colors">{anime.title}</h4>
                      <p className="text-xs text-[var(--color-text-tertiary)]">📅 {anime.date}</p>
                    </div>
                  </Link>
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
                  { rank: 1, title: 'Frieren: Beyond Journey\'s End', score: '9.26' },
                  { rank: 2, title: 'Fullmetal Alchemist: Brotherhood', score: '9.11' },
                  { rank: 3, title: 'Steins;Gate', score: '9.07' },
                  { rank: 4, title: 'Attack on Titan S3 P2', score: '9.05' },
                  { rank: 5, title: 'Hunter x Hunter (2011)', score: '9.03' },
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

              {/* Curiosidades */}
              <SectionHeading
                title="Curiosidades"
                subtitle="Descubre el lado oculto del anime"
                icon="💡"
                href="/curiosidades"
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
