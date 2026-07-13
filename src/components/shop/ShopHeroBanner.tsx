// ============================================
// 🛒 ShopHeroBanner — Banner promocional del Shop
// ============================================
import Link from 'next/link';

export default function ShopHeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-[var(--radius-xl)] mb-12 bg-gradient-to-br from-[var(--color-bg-secondary)] via-[var(--color-surface)] to-[var(--color-bg-secondary)] border border-[var(--color-border)]">
      {/* Fondo translúcido con imagen wk */}
      <div
        className="absolute inset-0 opacity-[0.06] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/wk.png)' }}
      />

      {/* Gradiente decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 p-6 sm:p-8 lg:p-10">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-xs font-semibold text-[var(--color-primary-light)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
            Novedad
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--color-text-primary)] mb-3">
            🛒 Shop Anime
          </h2>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-xl leading-relaxed mb-6">
            Descubre figuras, coleccionables y merchandising de tus animes favoritos.
            Compra de forma segura desde vendedores verificados de AliExpress y apoya
            el crecimiento de Walking The World Anime, <strong className="text-[var(--color-text-primary)]">sin ningún costo adicional para ti</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold rounded-xl transition-all hover:shadow-[var(--shadow-glow)] text-sm"
            >
              Explorar la tienda
              <span className="text-lg">→</span>
            </Link>
            <Link
              href="/shop?sort=discount"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] font-semibold rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all text-sm"
            >
              Ver ofertas
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-4 mt-4 justify-center lg:justify-start text-[0.65rem] text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-1">✅ Vendedores verificados</span>
            <span className="flex items-center gap-1">🔒 Compra segura</span>
            <span className="flex items-center gap-1">🚚 Envío internacional</span>
          </div>
        </div>

        {/* Collage visual */}
        <div className="hidden lg:grid grid-cols-2 gap-2 w-64 h-48 shrink-0">
          {[
            { emoji: '🐉', label: 'Dragon Ball', color: 'bg-orange-500/10' },
            { emoji: '🍥', label: 'Naruto', color: 'bg-orange-600/10' },
            { emoji: '⚔️', label: 'Demon Slayer', color: 'bg-cyan-500/10' },
            { emoji: '🗡️', label: 'Solo Leveling', color: 'bg-purple-500/10' },
          ].map((item) => (
            <div
              key={item.label}
              className={`${item.color} rounded-xl flex flex-col items-center justify-center border border-[var(--color-border)]`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-[0.55rem] text-[var(--color-text-tertiary)] mt-1 font-semibold">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
