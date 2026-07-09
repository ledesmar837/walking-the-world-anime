import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeading } from '@/components/ui/primitives';
import { getArticlesByCategory, getAllArticles } from '@/lib/articles';

// Generic listing page factory for content types
function ContentListingPage({
  title,
  subtitle,
  icon,
  category,
  description,
}: {
  title: string;
  subtitle: string;
  icon: string;
  category: string;
  description: string;
}) {
  const articles = getArticlesByCategory(category);
  const popularArticles = getAllArticles().slice(0, 6);
  const allTags = [...new Set(getAllArticles().flatMap((a) => a.tags))].slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: title }]} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            <div>
              <SectionHeading title={title} subtitle={subtitle} icon={icon} />
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {articles.map((article, i) => (
                    <div key={article.slug} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">{icon}</div>
                  <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-2">Próximamente</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm">{description}</p>
                </div>
              )}
            </div>
            <Sidebar popularArticles={popularArticles} tags={allTags} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Curiosidades de Anime',
  description: 'Descubre datos fascinantes, secretos y curiosidades del mundo del anime que probablemente no conocías.',
};

export default function CuriosidadesPage() {
  return ContentListingPage({
    title: 'Curiosidades',
    subtitle: 'Datos fascinantes del mundo anime',
    icon: '💡',
    category: 'curiosidades',
    description: 'Estamos preparando contenido fascinante sobre el mundo del anime. ¡Vuelve pronto!',
  });
}
