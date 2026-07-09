'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Article } from '@/lib/types';
import { Badge } from '@/components/ui/primitives';

interface HeroCarouselProps {
  slides: Article[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <section
      className="relative w-full h-[500px] sm:h-[550px] lg:h-[620px] overflow-hidden rounded-[var(--radius-xl)] mb-12 group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.imageAlt}
            className="w-full h-full object-cover"
            loading={current === 0 ? 'eager' : 'lazy'}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl"
        >
          {/* Category badge */}
          <Badge variant="primary" size="md" href={`/${slide.category}`} className="mb-4">
            {slide.category.charAt(0).toUpperCase() + slide.category.slice(1)}
          </Badge>

          {/* Title */}
          <Link href={`/noticias/${slide.slug}`}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-extrabold text-white leading-tight mb-4 hover:text-[var(--color-primary-light)] transition-colors">
              {slide.title}
            </h1>
          </Link>

          {/* Excerpt */}
          <p className="text-sm sm:text-base text-gray-300 line-clamp-2 mb-6 max-w-xl leading-relaxed">
            {slide.excerpt}
          </p>

          {/* Meta + CTA */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href={`/noticias/${slide.slug}`}
              className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-xl transition-all hover:shadow-[var(--shadow-glow)] text-sm"
            >
              Leer artículo →
            </Link>
            <span className="text-xs text-gray-400">
              {slide.readingTime} min de lectura · {new Date(slide.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-[var(--color-primary)] transition-all opacity-0 group-hover:opacity-100"
        aria-label="Anterior"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-[var(--color-primary)] transition-all opacity-0 group-hover:opacity-100"
        aria-label="Siguiente"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 right-6 sm:right-10 lg:right-14 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current
                ? 'bg-[var(--color-primary)] w-8'
                : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
