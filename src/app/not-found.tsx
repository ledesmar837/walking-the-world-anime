import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/primitives';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 py-20">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[var(--color-text-primary)] mb-4">
            404
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
            Esta página se perdió en un isekai. No encontramos lo que buscas.
          </p>
          <Button variant="primary" size="lg" href="/">
            ← Volver al Inicio
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
