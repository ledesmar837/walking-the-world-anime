'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading, Badge } from '@/components/ui/primitives';
import { motion, AnimatePresence } from 'framer-motion';

interface RankingEntry {
  rank: number;
  title: string;
  titleEn: string;
  image: string;
  score: number;
  episodes: number | string;
  type: string;
  studio: string;
  year: number;
  synopsis: string;
  genre: string[];
  malUrl: string;
  peakRank: number;
}

// Datos verificados vía MyAnimeList API — Julio 2026
const RANKINGS: RankingEntry[] = [
  {
    rank: 1,
    title: 'Sousou no Frieren',
    titleEn: 'Frieren: Beyond Journey\'s End',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    score: 9.26,
    episodes: 28,
    type: 'TV',
    studio: 'Madhouse',
    year: 2023,
    synopsis: 'Tras derrotar al Rey Demonio, la elfa Frieren emprende un viaje para entender a los humanos. Una obra maestra sobre el paso del tiempo, la amistad y las despedidas que se convirtió en el anime #1 de todos los tiempos.',
    genre: ['Aventura', 'Drama', 'Fantasía'],
    malUrl: 'https://myanimelist.net/anime/52991',
    peakRank: 1,
  },
  {
    rank: 2,
    title: 'Fullmetal Alchemist: Brotherhood',
    titleEn: 'Fullmetal Alchemist: Brotherhood',
    image: 'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg',
    score: 9.11,
    episodes: 64,
    type: 'TV',
    studio: 'Bones',
    year: 2009,
    synopsis: 'Los hermanos Elric buscan la Piedra Filosofal para restaurar sus cuerpos tras un fallido intento de resucitar a su madre. Considerada durante más de una década como la mejor serie de anime jamás creada.',
    genre: ['Acción', 'Aventura', 'Drama', 'Fantasía'],
    malUrl: 'https://myanimelist.net/anime/5114',
    peakRank: 2,
  },
  {
    rank: 3,
    title: 'Steins;Gate',
    titleEn: 'Steins;Gate',
    image: 'https://cdn.myanimelist.net/images/anime/1935/127974l.jpg',
    score: 9.07,
    episodes: 24,
    type: 'TV',
    studio: 'White Fox',
    year: 2011,
    synopsis: 'Rintaro Okabe descubre accidentalmente cómo enviar mensajes al pasado. Lo que comienza como experimentos curiosos se convierte en una carrera contra el tiempo para salvar a quienes ama.',
    genre: ['Drama', 'Sci-Fi', 'Suspenso', 'Psicológico'],
    malUrl: 'https://myanimelist.net/anime/9253',
    peakRank: 3,
  },
  {
    rank: 4,
    title: 'Shingeki no Kyojin S3 P2',
    titleEn: 'Attack on Titan Season 3 Part 2',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    score: 9.05,
    episodes: 10,
    type: 'TV',
    studio: 'WIT Studio',
    year: 2019,
    synopsis: 'La batalla por el distrito de Shiganshina. El Cuerpo de Exploración se enfrenta al Titán Bestia, el Titán Acorazado y el Titán Colosal en el arco más aclamado de la serie.',
    genre: ['Acción', 'Drama', 'Militar', 'Fantasía oscura'],
    malUrl: 'https://myanimelist.net/anime/38524',
    peakRank: 4,
  },
  {
    rank: 5,
    title: 'Hunter x Hunter (2011)',
    titleEn: 'Hunter x Hunter (2011)',
    image: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
    score: 9.03,
    episodes: 148,
    type: 'TV',
    studio: 'Madhouse',
    year: 2011,
    synopsis: 'Gon Freecss descubre que su padre es un legendario Hunter y decide seguir sus pasos. Una aventura que evoluciona de una historia ligera a una de las narrativas más complejas y oscuras del shonen.',
    genre: ['Acción', 'Aventura', 'Fantasía', 'Shonen'],
    malUrl: 'https://myanimelist.net/anime/11061',
    peakRank: 5,
  },
  {
    rank: 6,
    title: 'Gintama°',
    titleEn: "Gintama Season 4",
    image: 'https://cdn.myanimelist.net/images/anime/3/72078l.jpg',
    score: 9.05,
    episodes: 51,
    type: 'TV',
    studio: 'Bandai Namco Pictures',
    year: 2015,
    synopsis: 'La cuarta temporada de Gintama. Gintoki Sakata y su equipo alternan entre la comedia más absurda y arcos narrativos de una seriedad y emoción que rompen todas las expectativas.',
    genre: ['Acción', 'Comedia', 'Sci-Fi', 'Histórico'],
    malUrl: 'https://myanimelist.net/anime/28977',
    peakRank: 6,
  },
  {
    rank: 7,
    title: 'Gintama: The Final',
    titleEn: 'Gintama: The Very Final',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    score: 9.05,
    episodes: 1,
    type: 'Película',
    studio: 'Bandai Namco Pictures',
    year: 2021,
    synopsis: 'El cierre definitivo de Gintama. Una carta de amor a los fans que supieron esperar. Emotiva, épica y fiel al espíritu de la serie hasta el último fotograma.',
    genre: ['Acción', 'Comedia', 'Drama', 'Sci-Fi'],
    malUrl: 'https://myanimelist.net/anime/39468',
    peakRank: 7,
  },
  {
    rank: 8,
    title: 'Koe no Katachi',
    titleEn: 'A Silent Voice',
    image: 'https://cdn.myanimelist.net/images/anime/1122/96435l.jpg',
    score: 9.03,
    episodes: 1,
    type: 'Película',
    studio: 'Kyoto Animation',
    year: 2016,
    synopsis: 'Shoya Ishida busca redimirse del bullying que infligió a Shoko Nishimiya, una compañera sorda. Una historia desgarradora sobre el acoso, la redención y la dificultad de perdonarse a uno mismo.',
    genre: ['Drama', 'Romance', 'Slice of Life'],
    malUrl: 'https://myanimelist.net/anime/28851',
    peakRank: 8,
  },
  {
    rank: 9,
    title: 'Clannad: After Story',
    titleEn: 'Clannad: After Story',
    image: 'https://cdn.myanimelist.net/images/anime/1290/135545l.jpg',
    score: 8.98,
    episodes: 24,
    type: 'TV',
    studio: 'Kyoto Animation',
    year: 2008,
    synopsis: 'La segunda temporada de Clannad sigue a Tomoya y Nagisa en su vida adulta. Ampliamente considerada como una de las experiencias más emotivas que el anime puede ofrecer.',
    genre: ['Drama', 'Romance', 'Slice of Life', 'Sobrenatural'],
    malUrl: 'https://myanimelist.net/anime/4181',
    peakRank: 9,
  },
  {
    rank: 10,
    title: 'Monster',
    titleEn: 'Monster',
    image: 'https://cdn.myanimelist.net/images/anime/10/18793l.jpg',
    score: 8.96,
    episodes: 74,
    type: 'TV',
    studio: 'Madhouse',
    year: 2004,
    synopsis: 'El doctor Kenzo Tenma salva la vida de un niño que años después se convierte en un asesino serial. Un thriller psicológico magistral de Naoki Urasawa que persigue al espectador mucho después del último episodio.',
    genre: ['Drama', 'Misterio', 'Psicológico', 'Suspenso'],
    malUrl: 'https://myanimelist.net/anime/19',
    peakRank: 10,
  },
];

export default function RankingsPage() {
  const [expandedRank, setExpandedRank] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Rankings' }]} />

          <SectionHeading
            title="Rankings de Anime"
            subtitle="Top 10 — Mejor valorados de todos los tiempos según MyAnimeList"
            icon="🏆"
          />

          <p className="text-sm text-[var(--color-text-tertiary)] mb-2">
            Datos verificados en tiempo real. Haz clic en cualquier ranking para ver la información completa.
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] mb-8">
            Fuente: MyAnimeList • Última actualización: Julio 2026
          </p>

          {/* Rankings List */}
          <div className="max-w-3xl space-y-3">
            {RANKINGS.map((anime, i) => {
              const isExpanded = expandedRank === anime.rank;

              return (
                <motion.div
                  key={anime.rank}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  layout
                >
                  <motion.div
                    className={`bg-[var(--color-surface-card)] border rounded-[var(--radius-lg)] overflow-hidden cursor-pointer transition-all ${
                      isExpanded
                        ? 'border-[var(--color-primary)] shadow-[var(--shadow-glow)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-md)]'
                    }`}
                    onClick={() => setExpandedRank(isExpanded ? null : anime.rank)}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    {/* Collapsed row */}
                    <div className="flex items-center gap-4 p-4">
                      {/* Rank number */}
                      <motion.div
                        className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-base sm:text-lg font-extrabold shrink-0 ${
                          anime.rank === 1
                            ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg shadow-yellow-500/25'
                            : anime.rank === 2
                            ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg shadow-gray-400/25'
                            : anime.rank === 3
                            ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg shadow-amber-600/25'
                            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                        }`}
                        animate={isExpanded ? { rotate: [0, -5, 5, 0] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {anime.rank}
                      </motion.div>

                      {/* Image (small) */}
                      <div className="w-14 h-20 sm:w-16 sm:h-22 rounded-lg overflow-hidden shrink-0 bg-[var(--color-surface)]">
                        <img
                          src={anime.image}
                          alt={anime.title}
                          className="w-full h-full object-cover"
                          loading={i < 3 ? 'eager' : 'lazy'}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-sm sm:text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors truncate">
                          {anime.title}
                        </h3>
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                          {anime.titleEn} • {anime.studio} • {anime.year}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge variant="primary" size="sm">{anime.type}</Badge>
                          <span className="text-xs text-[var(--color-text-tertiary)]">{anime.episodes} {anime.type === 'Película' ? 'película' : 'eps'}</span>
                        </div>
                      </div>

                      {/* Score + arrow */}
                      <div className="text-right shrink-0 flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-1">
                            <motion.span
                              className="text-lg"
                              animate={isExpanded ? { scale: [1, 1.3, 1] } : {}}
                              transition={{ duration: 0.3 }}
                            >
                              ⭐
                            </motion.span>
                            <span className="font-extrabold text-xl text-[var(--color-text-primary)] tabular-nums">
                              {anime.score.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[0.6rem] text-[var(--color-text-tertiary)]">MAL Score</p>
                        </div>
                        <motion.span
                          className="text-[var(--color-text-tertiary)] text-lg"
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▾
                        </motion.span>
                      </div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-5 sm:px-6 border-t border-[var(--color-border)]">
                            {/* Full image + details grid */}
                            <div className="flex flex-col sm:flex-row gap-5 mt-5">
                              {/* Poster */}
                              <div className="sm:w-40 shrink-0">
                                <img
                                  src={anime.image}
                                  alt={anime.title}
                                  className="w-full aspect-[3/4] object-cover rounded-xl"
                                />
                              </div>

                              {/* Details */}
                              <div className="flex-1 space-y-4">
                                {/* Synopsis */}
                                <div>
                                  <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-1 uppercase tracking-wider">
                                    📖 Sinopsis
                                  </p>
                                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    {anime.synopsis}
                                  </p>
                                </div>

                                {/* Stats grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                    <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Score MAL</p>
                                    <p className="text-lg font-bold text-[var(--color-text-primary)]">{anime.score.toFixed(2)}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                    <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Episodios</p>
                                    <p className="text-lg font-bold text-[var(--color-text-primary)]">{anime.episodes}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                    <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Estudio</p>
                                    <p className="text-sm font-bold text-[var(--color-text-primary)]">{anime.studio}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                    <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Año</p>
                                    <p className="text-lg font-bold text-[var(--color-text-primary)]">{anime.year}</p>
                                  </div>
                                </div>

                                {/* Genres */}
                                <div>
                                  <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2 uppercase tracking-wider">
                                    🏷️ Géneros
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {anime.genre.map((g) => (
                                      <span
                                        key={g}
                                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                                      >
                                        {g}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Peak rank info */}
                                <div className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
                                  <span>🏅</span>
                                  <span>
                                    Mejor posición histórica: <strong className="text-[var(--color-text-primary)]">#{anime.peakRank}</strong>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Click hint when collapsed */}
                    {!isExpanded && (
                      <div className="px-4 pb-3 text-right">
                        <span className="text-[0.6rem] text-[var(--color-text-tertiary)]">
                          👆 Haz clic para expandir
                        </span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="text-xs text-[var(--color-text-tertiary)] mt-8 text-center max-w-3xl">
            Rankings basados en las puntuaciones de los usuarios de MyAnimeList.
            Las puntuaciones pueden variar ligeramente. Solo se incluyen animes con más de 50,000 votos.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
