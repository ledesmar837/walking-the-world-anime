'use client';

// ============================================
// 🎉 ShopPopup — Popup de bienvenida al Shop
// Muestra solo 1 vez cada 30 días
// ============================================
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'shop_popup_last_shown';
const DAYS_BEFORE_RESHOW = 30;

export default function ShopPopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Verificar si debe mostrarse
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (!lastShown) {
      // Primera visita
      setVisible(true);
      return;
    }
    const lastDate = new Date(parseInt(lastShown));
    const daysSince = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince >= DAYS_BEFORE_RESHOW) {
      setVisible(true);
    }
  }, []);

  const close = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  };

  const goToShop = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-md bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] overflow-hidden"
        >
          {/* Cerrar */}
          <button
            onClick={close}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors z-20"
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Degradado decorativo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          {/* Contenido */}
          <div className="relative p-6 sm:p-8 text-center">
            {/* Emoji grande */}
            <div className="text-5xl mb-4">🎉</div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--color-text-primary)] mb-3">
              ¡Nueva sección Shop Anime!
            </h3>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Ya puedes descubrir figuras, coleccionables y merchandising de tus
              animes favoritos directamente desde nuestra nueva sección Shop.
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed mb-6">
              Todos los productos provienen de vendedores verificados de AliExpress
              y cada compra ayuda a mantener y mejorar Walking The World Anime, sin
              costo adicional para ti.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                onClick={goToShop}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold rounded-xl transition-all hover:shadow-[var(--shadow-glow)] text-sm"
              >
                🛒 Explorar Shop
              </Link>
              <button
                onClick={close}
                className="flex-1 px-5 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] font-semibold rounded-xl border border-[var(--color-border)] transition-all text-sm"
              >
                Ahora no
              </button>
            </div>

            {/* Subtle trust text */}
            <p className="text-[0.6rem] text-[var(--color-text-tertiary)] mt-4">
              No volveremos a mostrarte esto en 30 días
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
