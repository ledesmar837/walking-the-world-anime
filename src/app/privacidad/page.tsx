import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Walking The World Anime. Cómo recopilamos, usamos y protegemos tu información.',
  robots: { index: true, follow: false },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8 max-w-3xl">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-6">
            Política de Privacidad
          </h1>
          <p className="text-sm text-[var(--color-text-tertiary)] mb-8">
            Última actualización: Julio 2026
          </p>

          <div className="prose prose-sm text-[var(--color-text-secondary)] space-y-6 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">1. Información que recopilamos</h2>
              <p>
                En <strong>Walking The World Anime</strong>, accesible desde walkingtheworldanime.com, la privacidad de nuestros visitantes es una prioridad. Podemos recopilar información no personal como tipo de navegador, páginas visitadas, tiempo en el sitio y datos de uso agregados a través de herramientas de análisis como Google Analytics.
              </p>
              <p className="mt-2">
                No recopilamos información personal identificable a menos que voluntariamente nos la proporciones mediante nuestro formulario de contacto o suscripción al newsletter.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">2. Cookies y tecnologías similares</h2>
              <p>
                Utilizamos cookies propias y de terceros para mejorar la experiencia de navegación, analizar el tráfico y mostrar publicidad personalizada. Puedes gestionar tus preferencias de cookies en cualquier momento.
              </p>
              <p className="mt-2">
                Los terceros, incluido Google, utilizan cookies para mostrar anuncios basados en visitas previas a nuestro sitio u otros sitios web. Puedes optar por desactivar la publicidad personalizada en{' '}
                <a href="https://adssettings.google.com" className="text-[var(--color-primary)] underline" target="_blank" rel="noopener noreferrer">
                  Configuración de Anuncios de Google
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">3. Google AdSense</h2>
              <p>
                Este sitio utiliza Google AdSense para mostrar anuncios. Google utiliza cookies para publicar anuncios basados en los intereses de los usuarios. Puedes obtener más información sobre cómo Google utiliza los datos en{' '}
                <a href="https://policies.google.com/technologies/partner-sites" className="text-[var(--color-primary)] underline" target="_blank" rel="noopener noreferrer">
                  Política de Privacidad de Google
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">4. Enlaces de afiliados</h2>
              <p>
                Algunos enlaces en nuestro sitio son enlaces de afiliado. Esto significa que podemos recibir una comisión si realizas una compra a través de ellos, sin costo adicional para ti. Solo recomendamos productos que consideramos relevantes para nuestra audiencia.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">5. Enlaces a terceros</h2>
              <p>
                Nuestro sitio puede contener enlaces a sitios externos. No somos responsables de las políticas de privacidad de esos sitios. Te recomendamos leer sus políticas antes de proporcionar información personal.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">6. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta política, contáctanos en:{' '}
                <a href="mailto:contacto@walkingtheworldanime.com" className="text-[var(--color-primary)] underline">
                  contacto@walkingtheworldanime.com
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
