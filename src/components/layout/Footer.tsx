'use client';

import Link from 'next/link';
import { SITE_CONFIG } from '@/content/config/site';
import { FOOTER_NAV } from '@/content/config/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] mt-auto">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center text-white font-bold text-lg">
                W
              </div>
              <div>
                <span className="font-display font-bold text-lg text-[var(--color-text-primary)]">
                  Walking The World
                </span>
                <span className="block text-[0.6rem] text-[var(--color-primary)] font-semibold tracking-[0.2em] uppercase -mt-1">
                  Anime
                </span>
              </div>
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
              {SITE_CONFIG.description.substring(0, 120)}...
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { label: 'X', href: SITE_CONFIG.social.twitter || '#', icon: '𝕏' },
                { label: 'YouTube', href: SITE_CONFIG.social.youtube || '#', icon: '▶' },
                { label: 'Discord', href: SITE_CONFIG.social.discord || '#', icon: '💬' },
                { label: 'Telegram', href: SITE_CONFIG.social.telegram || '#', icon: '✈' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-border)] transition-all text-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contenido */}
          <div>
            <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-4 uppercase tracking-wider">
              Contenido
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_NAV.contenido.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Multimedia */}
          <div>
            <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-4 uppercase tracking-wider">
              Multimedia
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_NAV.multimedia.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter placeholder */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                📬 Newsletter
              </h4>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 h-9 px-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 h-9 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  OK
                </button>
              </form>
            </div>
          </div>

          {/* Sitio */}
          <div>
            <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-4 uppercase tracking-wider">
              Sitio
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_NAV.sitio.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-tertiary)]">
            © {year} {SITE_CONFIG.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1">
            Hecho con <span className="text-[var(--color-primary)]">❤️</span> por la comunidad otaku
          </p>
        </div>
      </div>
    </footer>
  );
}
