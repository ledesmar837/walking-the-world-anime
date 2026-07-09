import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading, Button } from '@/components/ui/primitives';

export const metadata: Metadata = {
  title: 'Acerca de Walking The World Anime',
  description: 'Conoce al equipo detrás de Walking The World Anime, nuestra misión y cómo contactarnos.',
};

export default function AcercaDePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Acerca de' }]} />
          <SectionHeading title="Acerca de" subtitle="Nuestra misión y equipo" icon="ℹ️" />

          <div className="max-w-3xl space-y-8">
            <div className="p-6 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)]">
              <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-4">
                🌍 Walking The World Anime
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                Somos un portal premium dedicado a cubrir el mundo del anime con profundidad, pasión y rigor periodístico.
                Nuestra misión es ser el puente entre la industria del anime japonés y la comunidad hispanohablante,
                ofreciendo noticias verificadas, análisis profundos y contenido de calidad.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Fundado en 2026, Walking The World Anime nace de la necesidad de un espacio donde los fans
                del anime puedan informarse, descubrir nuevas series y conectar con una comunidad que comparte su pasión.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)]">
              <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-4">
                📬 Contacto
              </h2>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                ¿Tienes sugerencias, quieres colaborar o simplemente saludar? Escríbenos.
              </p>
              <form action="#" className="space-y-4">
                <input type="text" name="nombre" placeholder="Nombre" className="w-full h-12 px-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-primary)]" />
                <input type="email" name="email" placeholder="Email" className="w-full h-12 px-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-primary)]" />
                <textarea name="mensaje" placeholder="Mensaje" rows={4} className="w-full p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-primary)] resize-none" />
                <Button type="submit" variant="primary">Enviar mensaje</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
