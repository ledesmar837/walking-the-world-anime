import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { ArticleCard, ArticleCardHorizontal } from '@/components/article/ArticleCard';
import { Badge, SectionHeading } from '@/components/ui/primitives';
import { getArticleBySlug, getRelatedArticles, FEATURED_ARTICLES, getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/content/config/categories';
import type { Article } from '@/lib/types';

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Artículo no encontrado' };

  const seo = article.seo;
  const category = CATEGORIES[article.category];

  return {
    title: seo?.metaTitle || article.title,
    description: seo?.metaDescription || article.excerpt,
    keywords: seo?.keywords || article.tags,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.imageAlt }],
      publishedTime: article.date,
      modifiedTime: article.lastModified,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const relatedArticles = getRelatedArticles(slug);
  const popularArticles = getAllArticles().slice(0, 6);
  const category = CATEGORIES[article.category];

  const allTags = [...new Set(getAllArticles().flatMap((a) => a.tags))].slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container-main py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: category.name, href: `/${article.category}` },
              { label: article.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* Main Article Content */}
            <article>
              {/* Article Header */}
              <header className="mb-8">
                {/* Category badge */}
                <Badge variant="primary" size="md" href={`/${article.category}`} className="mb-4">
                  {category.icon} {category.name}
                </Badge>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[var(--color-text-primary)] leading-tight mb-4">
                  {article.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-tertiary)] mb-6">
                  <span className="font-semibold text-[var(--color-text-secondary)]">
                    {article.author.name}
                  </span>
                  <span>·</span>
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <span>{article.readingTime} min de lectura</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Featured Image */}
                <figure className="mb-8">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    className="w-full rounded-[var(--radius-xl)] object-cover aspect-[16/9]"
                  />
                  {article.imageCredit && (
                    <figcaption className="text-xs text-[var(--color-text-tertiary)] mt-2 text-center">
                      Crédito: {article.imageCredit}
                    </figcaption>
                  )}
                </figure>
              </header>

              {/* Article Body (MDX rendered) */}
              <div className="mdx-content">
                <p>{article.excerpt}</p>
                <p>
                  Este es el contenido completo del artículo que se cargará desde archivos MDX. 
                  Por ahora mostramos un placeholder del sistema de renderizado de contenido.
                </p>
                
                {/* Simulated content for demo */}
                <h2>Desarrollo</h2>
                <p>
                  La noticia ha generado un gran revuelo en la comunidad otaku internacional. 
                  Los fans han expresado su entusiasmo en redes sociales, donde el anuncio se 
                  ha vuelto tendencia en X (anteriormente Twitter) en cuestión de horas.
                </p>
                <p>
                  Según fuentes cercanas a la producción, el proyecto lleva más de dos años en 
                  desarrollo y promete superar las expectativas con una calidad de animación 
                  sin precedentes.
                </p>

                {/* Ad In-Content (reserved) */}
                <div className="my-8 h-24 border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-surface-card)]"></div>

                <h2>Reacciones de la comunidad</h2>
                <p>
                  Los seguidores de la franquicia han compartido sus teorías y expectativas. 
                  Muchos coinciden en que esta nueva entrega podría marcar un antes y un después 
                  en la industria del anime.
                </p>
                <blockquote>
                  <p>
                    "Estamos ante uno de los anuncios más importantes del año. La expectativa 
                    es enorme y todo apunta a que cumplirán con creces."
                  </p>
                </blockquote>

                <h2>Conclusión</h2>
                <p>
                  Sin duda, este anuncio posiciona a la franquicia como una de las más relevantes 
                  del panorama actual. Estaremos atentos a nuevas actualizaciones y compartiremos 
                  cada detalle en Walking The World Anime.
                </p>
              </div>

              {/* Affiliate Section */}
              {article.affiliateProducts && article.affiliateProducts.length > 0 && (
                <div className="mt-10 p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] border border-[var(--color-border)]">
                  <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                    <span>🛒</span> Productos Relacionados
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {article.affiliateProducts.map((product, i) => (
                      <a
                        key={i}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all group"
                      >
                        <div className="w-14 h-14 rounded-lg bg-[var(--color-surface-hover)] flex items-center justify-center text-2xl shrink-0">
                          📦
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors truncate">
                            {product.name}
                          </p>
                          <p className="text-sm font-bold text-[var(--color-accent)]">
                            {product.price}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-4">
                    Como Afiliado de Amazon y otros programas, podemos recibir una comisión por compras elegibles. 
                    Esto no afecta el precio que pagas.
                  </p>
                </div>
              )}

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <section className="mt-12">
                  <SectionHeading
                    title="Artículos Relacionados"
                    subtitle="También te puede interesar"
                    icon="📖"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {relatedArticles.slice(0, 4).map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <Sidebar popularArticles={popularArticles} tags={allTags} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
