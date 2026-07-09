import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/primitives';

export const metadata: Metadata = {
  title: 'Rankings de Anime',
  description: 'Los mejores animes según la comunidad. Rankings semanales, mensuales y de todos los tiempos.',
};

export default function RankingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Rankings' }]} />
          <SectionHeading title="Rankings" subtitle="Mejor valorados por la comunidad" icon="🏆" />
          <div className="space-y-3 max-w-2xl">
            {[
              { rank: 1, title: 'Frieren: Beyond Journey\'s End', score: 9.38, studio: 'Madhouse' },
              { rank: 2, title: 'Fullmetal Alchemist: Brotherhood', score: 9.09, studio: 'Bones' },
              { rank: 3, title: 'Steins;Gate', score: 9.07, studio: 'White Fox' },
              { rank: 4, title: 'Attack on Titan S3 P2', score: 9.05, studio: 'WIT' },
              { rank: 5, title: 'Jujutsu Kaisen S2', score: 8.91, studio: 'MAPPA' },
            ].map((item) => (
              <div key={item.rank} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)]">
                <span className={`w-10 h-10 flex items-center justify-center rounded-xl text-lg font-bold ${item.rank <= 3 ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'}`}>
                  {item.rank}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-tertiary)]">{item.studio}</p>
                </div>
                <div className="text-right">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-bold text-lg ml-1 text-[var(--color-text-primary)]">{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
