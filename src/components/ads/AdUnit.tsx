'use client';

// ============================================
// 💰 Google AdSense — Componente reutilizable
// Solo se activa si NEXT_PUBLIC_ADSENSE_ENABLED=true
// ============================================
import { useEffect, useRef } from 'react';

export type AdFormat = 'auto' | 'horizontal' | 'vertical' | 'rectangle';

interface AdUnitProps {
  slot: string;
  format?: AdFormat;
  style?: 'banner' | 'sidebar' | 'in-content';
  className?: string;
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

const SLOT_IDS: Record<string, string> = {
  banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER || '',
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
  'in-content': process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT || '',
};

const styleClasses: Record<string, string> = {
  banner: 'w-full min-h-[90px] flex items-center justify-center',
  sidebar: 'w-full min-h-[250px] flex items-center justify-center',
  'in-content': 'w-full min-h-[90px] flex items-center justify-center my-4',
};

export function AdUnit({
  slot,
  format = 'auto',
  style = 'banner',
  className = '',
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ADSENSE_ENABLED || !PUBLISHER_ID || !adRef.current) return;

    // Evitar múltiples inserciones
    if (adRef.current.querySelector('ins')) return;

    try {
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', PUBLISHER_ID);
      ins.setAttribute('data-ad-slot', slot || SLOT_IDS[style] || '');
      ins.setAttribute('data-ad-format', format);
      ins.setAttribute('data-full-width-responsive', 'true');
      adRef.current.appendChild(ins);
      (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle?.push?.({});
    } catch {
      // Silencioso — AdSense no crítico
    }
  }, [slot, format, style]);

  // No mostrar nada si AdSense no está activado
  if (!ADSENSE_ENABLED) {
    return (
      <div
        className={`${styleClasses[style]} ${className} border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] text-sm text-[var(--color-text-tertiary)] bg-[var(--color-surface-card)]`}
      >
        📢 Google AdSense — Espacio Reservado
        <br />
        <span className="text-[0.6rem]">Activar con NEXT_PUBLIC_ADSENSE_ENABLED=true</span>
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      className={`${styleClasses[style]} ${className}`}
    />
  );
}
