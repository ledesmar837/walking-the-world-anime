import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading, Pagination } from '@/components/ui/primitives';
import { getAllArticlesWithNews } from '@/lib/news-service';
import { ITEMS_PER_PAGE } from '@/content/config/site';

export const revalidate = 3600; // ISR: revalidar cada hora

export const metadata: Metadata = {
  title: 'Noticias de Anime y Manga',
  description:
    'Últimas noticias del mundo del anime, manga y cultura otaku. Cobertura diaria con las noticias más relevantes.',
  openGraph: {
    title: 'Noticias de Anime y Manga | Walking The World Anime',
    description: 'Cobertura diaria del mundo del anime con las noticias más relevantes.',
  },
};

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const allArticles = await getAllArticlesWithNews();
  const totalPages = Math.ceil(allArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = allArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const popularArticles = allArticles.slice(0, 6);
  const allTags = [...new Set(allArticles.flatMap((a) => a.tags))].slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Noticias' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            <div>
              <SectionHeading
                title="Noticias"
                subtitle="Toda la actualidad del anime y manga"
                icon="📰"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {paginatedArticles.map((article, i) => (
                  <div
                    key={article.slug}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/noticias"
              />
            </div>

            <Sidebar popularArticles={popularArticles} tags={allTags} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
