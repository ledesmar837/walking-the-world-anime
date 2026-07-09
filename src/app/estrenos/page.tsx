import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/primitives';

export const metadata: Metadata = {
  title: 'Estrenos de Anime',
  description: 'Calendario de estrenos de anime por temporada. Descubre qué animes se estrenan esta temporada.',
};

export default function EstrenosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Estrenos' }]} />
          <SectionHeading title="Estrenos de Temporada" subtitle="Verano 2026" icon="🆕" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="p-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all">
                <div className="aspect-[3/4] rounded-lg bg-[var(--color-surface)] mb-3 flex items-center justify-center text-5xl">🎬</div>
                <h4 className="font-display font-semibold text-sm text-[var(--color-text-primary)] mb-1">Anime {i + 1}</h4>
                <p className="text-xs text-[var(--color-text-tertiary)]">Estreno próximamente</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
