'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/theme';
import { MAIN_NAV } from '@/content/config/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { theme, toggle: toggleTheme } = useTheme();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Close mobile on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Keyboard shortcut: / to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && !isMobileOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          const input = document.getElementById('search-input');
          input?.focus();
        }, 100);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isSearchOpen, isMobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--color-bg)]/90 backdrop-blur-xl border-b border-[var(--color-border)] shadow-[var(--shadow-md)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main">
          <nav className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center text-white font-bold text-lg shadow-[var(--shadow-glow)]">
                W
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                  Walking The World
                </span>
                <span className="block text-[0.6rem] text-[var(--color-primary)] font-semibold tracking-[0.2em] uppercase -mt-1">
                  Anime
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {MAIN_NAV.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-[var(--color-primary)]/20'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[var(--color-primary)] rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              <Link
                href="/shop"
                className={`relative px-3.5 py-2 text-sm font-bold rounded-lg transition-all duration-200 bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] hover:bg-[var(--color-accent)]/20 ${
                  pathname.startsWith('/shop') ? 'ring-2 ring-[var(--color-accent)]' : ''
                }`}
              >
                🛒 Shop
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              {/* Search toggle */}
              <button
                onClick={() => { setIsSearchOpen(!isSearchOpen); setIsMobileOpen(false); }}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-all duration-200"
                aria-label="Buscar"
                title="Buscar (tecla /)"
              >
                <SearchIcon />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-all duration-200"
                aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => { setIsMobileOpen(!isMobileOpen); setIsSearchOpen(false); }}
                className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-all duration-200"
                aria-label="Menú"
              >
                <motion.span
                  animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[2px] bg-current rounded-full transition-colors"
                />
                <motion.span
                  animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-[2px] bg-current rounded-full transition-colors"
                />
                <motion.span
                  animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[2px] bg-current rounded-full transition-colors"
                />
              </button>
            </div>
          </nav>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden"
            >
              <div className="container-main py-4">
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      id="search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar artículos, anime, personajes..."
                      className="w-full h-12 px-5 pl-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all text-sm"
                      autoComplete="off"
                    />
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                  </div>
                  <button
                    type="submit"
                    className="px-5 h-12 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-xl transition-colors text-sm shrink-0"
                  >
                    Buscar
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-1">
                  {MAIN_NAV.map((item, i) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                            isActive
                              ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary-light)]'
                              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
                  <Link
                    href="/shop"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-semibold text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all mb-2"
                  >
                    🛒 Shop de Anime
                  </Link>
                  <Link
                    href="/acerca-de"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-all"
                  >
                    ℹ️ Acerca de
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-18" />
    </>
  );
}

// --- Icon Components ---
function SearchIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  );
}
