import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de Walking The World Anime.',
  robots: { index: true, follow: false },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8 max-w-3xl">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-6">
            Términos y Condiciones
          </h1>
          <p className="text-sm text-[var(--color-text-tertiary)] mb-8">
            Última actualización: Julio 2026
          </p>

          <div className="prose prose-sm text-[var(--color-text-secondary)] space-y-6 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">1. Aceptación de los términos</h2>
              <p>
                Al acceder a <strong>Walking The World Anime</strong> (walkingtheworldanime.com), aceptas estos términos de uso. Si no estás de acuerdo, por favor no uses el sitio.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">2. Propiedad intelectual</h2>
              <p>
                Todo el contenido original publicado en este sitio —artículos, análisis, reseñas y gráficos— es propiedad de Walking The World Anime y está protegido por leyes de derechos de autor. Las imágenes de anime son propiedad de sus respectivos dueños y se utilizan con fines informativos.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">3. Uso del contenido</h2>
              <p>Está permitido compartir fragmentos de nuestros artículos siempre que se incluya un enlace claro a la fuente original. No está permitida la reproducción total de artículos sin autorización previa por escrito.</p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">4. Exactitud de la información</h2>
              <p>
                Nos esforzamos por proporcionar información precisa y actualizada. Sin embargo, no garantizamos la exactitud, integridad o actualidad del contenido. Las noticias y fechas de estreno pueden cambiar sin previo aviso.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">5. Limitación de responsabilidad</h2>
              <p>
                Walking The World Anime no será responsable por daños directos, indirectos o consecuentes derivados del uso de este sitio. Los enlaces a sitios externos no constituyen un respaldo de su contenido.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">6. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. El uso continuado del sitio constituye la aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">7. Ley aplicable</h2>
              <p>
                Estos términos se rigen por las leyes del país donde opera el sitio. Cualquier disputa será resuelta en los tribunales competentes de dicha jurisdicción.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">8. Contacto</h2>
              <p>
                Para consultas sobre estos términos:{' '}
                <a href="mailto:legal@walkingtheworldanime.com" className="text-[var(--color-primary)] underline">
                  legal@walkingtheworldanime.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
