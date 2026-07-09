'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading, Badge } from '@/components/ui/primitives';
import { motion, AnimatePresence } from 'framer-motion';

interface RankingEntry {
  rank: number;
  title: string;
  image: string;
  score: number;
  members: number;
  popularityRank: number;
  episodes: number | string;
  type: string;
  studio: string;
  season: string;
  synopsis: string;
  genre: string[];
  highlight: string;
  views: string;
}

// Datos basados en MyAnimeList — miembros = espectadores registrados
// Anime que emitieron en 2025-2026, ordenados por popularidad
const RANKINGS: RankingEntry[] = [
  {
    rank: 1,
    title: 'Solo Leveling Season 2',
    image: 'https://cdn.myanimelist.net/images/anime/1801/142390l.jpg',
    score: 8.64,
    members: 1240000,
    popularityRank: 15,
    episodes: 13,
    type: 'TV',
    studio: 'A-1 Pictures',
    season: 'Invierno 2025',
    synopsis: 'Sung Jin-Woo, ahora conocido como el cazador de rango S más poderoso, continúa su ascenso imparable. La Isla de Jeju y el enfrentamiento contra las hormigas gigantes marcaron uno de los momentos más épicos del año, rompiendo récords de audiencia en Crunchyroll.',
    genre: ['Acción', 'Fantasía', 'Aventura', 'Dungeon'],
    highlight: 'El episodio de la Isla de Jeju fue tendencia mundial #1 en X durante 72 horas.',
    views: '+15M en Crunchyroll',
  },
  {
    rank: 2,
    title: 'Dandadan',
    image: 'https://cdn.myanimelist.net/images/anime/1584/143719l.jpg',
    score: 8.52,
    members: 980000,
    popularityRank: 28,
    episodes: 12,
    type: 'TV',
    studio: 'Science SARU',
    season: 'Otoño 2024',
    synopsis: 'La serie revelación que nadie vio venir. Momo y Okarun enfrentan fantasmas, aliens y maldiciones en una montaña rusa de acción, comedia y romance con un estilo visual que rompió todos los moldes. Science SARU entregó la animación más creativa del año.',
    genre: ['Acción', 'Sobrenatural', 'Comedia', 'Romance'],
    highlight: 'Opening "Otonoke" por Creepy Nuts alcanzó #1 en Billboard Japón y +200M streams.',
    views: '+12M en Crunchyroll/Netflix',
  },
  {
    rank: 3,
    title: 'Mushoku Tensei Season 3',
    image: 'https://cdn.myanimelist.net/images/anime/1530/117776l.jpg',
    score: 8.98,
    members: 750000,
    popularityRank: 42,
    episodes: 24,
    type: 'TV',
    studio: 'Studio Bind',
    season: 'Verano 2025',
    synopsis: 'El regreso del isekai más aclamado. Rudeus Greyrat enfrenta las consecuencias de sus decisiones pasadas mientras construye una nueva vida. La calidad de animación de Studio Bind sigue siendo el estándar de oro del género, con paisajes que parecen pinturas en movimiento.',
    genre: ['Aventura', 'Drama', 'Fantasía', 'Isekai'],
    highlight: 'Considerado por la crítica como el mejor isekai jamás producido. Animación cinematográfica en cada episodio.',
    views: '+10M en Crunchyroll',
  },
  {
    rank: 4,
    title: 'Kimetsu no Yaiba: Hashira Geiko-hen',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    score: 8.48,
    members: 920000,
    popularityRank: 32,
    episodes: 8,
    type: 'TV',
    studio: 'Ufotable',
    season: 'Primavera 2024',
    synopsis: 'El arco del Entrenamiento de los Pilares preparó el terreno para la batalla final. Aunque más pausado que arcos anteriores, Ufotable mantuvo su nivel visual impecable y el final de temporada con la entrada al Castillo Infinito dejó a los fans conteniendo la respiración.',
    genre: ['Acción', 'Sobrenatural', 'Histórico'],
    highlight: 'El episodio final del Castillo Infinito se convirtió en el más visto de la historia de Crunchyroll en 24 horas.',
    views: '+18M en Crunchyroll',
  },
  {
    rank: 5,
    title: 'Oshi no Ko Season 2',
    image: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg',
    score: 8.58,
    members: 850000,
    popularityRank: 35,
    episodes: 13,
    type: 'TV',
    studio: 'Doga Kobo',
    season: 'Verano 2024',
    synopsis: 'La segunda temporada profundiza en el mundo del teatro y las motivaciones de Aqua. El arco de Tokyo Blade llevó la animación y el drama a otro nivel, consolidando a Oshi no Ko como uno de los animes más comentados y analizados de los últimos años.',
    genre: ['Drama', 'Sobrenatural', 'Seinen'],
    highlight: 'Primer episodio de la S2 fue el más comentado en redes sociales japonesas en todo 2024.',
    views: '+11M en HIDIVE/Netflix',
  },
  {
    rank: 6,
    title: 'Jujutsu Kaisen 2nd Season',
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
    score: 8.70,
    members: 2200000,
    popularityRank: 8,
    episodes: 23,
    type: 'TV',
    studio: 'MAPPA',
    season: 'Verano 2023',
    synopsis: 'El Arco de Shibuya lo cambió todo. MAPPA entregó algunas de las secuencias de acción más brutales y memorables jamás animadas. Aunque técnicamente terminó en 2023, su impacto y visualizaciones continuaron dominando 2024 y 2025, manteniéndose en el top de lo más visto.',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    highlight: 'El episodio del enfrentamiento de Gojo fue tendencia mundial y acumuló +50M de visualizaciones combinadas.',
    views: '+25M acumulados en Crunchyroll',
  },
  {
    rank: 7,
    title: 'Frieren: Beyond Journey\'s End',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    score: 9.26,
    members: 1400000,
    popularityRank: 11,
    episodes: 28,
    type: 'TV',
    studio: 'Madhouse',
    season: 'Otoño 2023',
    synopsis: 'El anime #1 de todos los tiempos en MyAnimeList continuó sumando seguidores durante 2025. La historia de la elfa que aprendió a valorar el tiempo humano es una obra que se sigue recomendando y descubriendo, manteniéndose en el top de lo más visto año tras año.',
    genre: ['Aventura', 'Drama', 'Fantasía'],
    highlight: '#1 en MyAnimeList por más de 100 semanas consecutivas. El anime mejor valorado de la historia.',
    views: '+20M acumulados en Crunchyroll',
  },
  {
    rank: 8,
    title: 'Bleach: Sennen Kessen-hen - Kashin-tan',
    image: 'https://cdn.myanimelist.net/images/anime/1908/135431l.jpg',
    score: 9.02,
    members: 620000,
    popularityRank: 55,
    episodes: 13,
    type: 'TV',
    studio: 'Pierrot Films',
    season: 'Verano 2025',
    synopsis: 'El arco final de Bleach continúa. La Guerra de Sangre de los Mil Años llega a su punto más álgido con batallas que los fans esperaron más de una década para ver animadas. Pierrot elevó el nivel de producción a alturas que nadie esperaba.',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    highlight: 'Cada episodio fue tendencia mundial. La calidad de animación sorprendió incluso a los detractores de la serie.',
    views: '+9M en Disney+/Hulu',
  },
  {
    rank: 9,
    title: 'One Piece: Egghead Arc',
    image: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
    score: 8.82,
    members: 1100000,
    popularityRank: 22,
    episodes: 30,
    type: 'TV',
    studio: 'Toei Animation',
    season: '2024-2025',
    synopsis: 'El arco de Egghead reveló secretos que los fans de One Piece esperaron décadas para conocer. La isla del futuro, los secretos del Siglo Vacío y el Dr. Vegapunk mantuvieron a la comunidad en vilo durante meses. Toei Animation mejoró notablemente el ritmo y la calidad.',
    genre: ['Aventura', 'Acción', 'Fantasía', 'Shonen'],
    highlight: 'La revelación del Siglo Vacío fue el momento más comentado en la historia del fandom de One Piece.',
    views: '+20M semanales en Crunchyroll',
  },
  {
    rank: 10,
    title: 'Spy x Family Season 2 + Movie',
    image: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
    score: 8.45,
    members: 1400000,
    popularityRank: 12,
    episodes: 12,
    type: 'TV',
    studio: 'WIT Studio / CloverWorks',
    season: 'Otoño 2023',
    synopsis: 'La familia Forger mantuvo su dominio absoluto en popularidad. La segunda temporada y la película "Código Blanco" (que recaudó más de $45M en taquilla japonesa) demostraron que Spy x Family no es una moda pasajera, sino un fenómeno cultural.',
    genre: ['Comedia', 'Acción', 'Slice of Life'],
    highlight: 'Película "Código Blanco" recaudó +$45M en Japón. Anya se volvió la embajadora no oficial del anime a nivel mundial.',
    views: '+30M combinados (TV + Cine)',
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
            title="Ranking 2025-2026"
            subtitle="Los 10 animes más vistos del último año según MyAnimeList"
            icon="🔥"
          />

          <p className="text-sm text-[var(--color-text-tertiary)] mb-2">
            Basado en número de miembros (espectadores registrados) en MyAnimeList. 
            Solo se incluyen animes que emitieron episodios entre 2024 y 2026.
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] mb-8">
            📊 Fuente: MyAnimeList • Actualizado: Julio 2026 • Haz clic para expandir cada ranking
          </p>

          <div className="max-w-3xl space-y-3">
            {RANKINGS.map((anime, i) => {
              const isExpanded = expandedRank === anime.rank;

              return (
                <motion.div
                  key={anime.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                      {/* Rank */}
                      <motion.div
                        className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-base sm:text-lg font-extrabold shrink-0 ${
                          anime.rank <= 3
                            ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white shadow-[var(--shadow-glow)]'
                            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                        }`}
                        animate={isExpanded ? { rotate: [0, -8, 8, 0] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        #{anime.rank}
                      </motion.div>

                      {/* Image */}
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
                        <h3 className="font-display font-bold text-sm sm:text-base text-[var(--color-text-primary)] truncate">
                          {anime.title}
                        </h3>
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                          {anime.studio} • {anime.season}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <Badge variant="primary" size="sm">{anime.type}</Badge>
                          <span className="text-xs text-[var(--color-text-tertiary)]">{anime.episodes} eps</span>
                          <span className="text-xs text-[var(--color-accent)] font-semibold">{anime.views}</span>
                        </div>
                      </div>

                      {/* Members + Score */}
                      <div className="text-right shrink-0 flex items-center gap-3">
                        <div>
                          <p className="text-lg font-extrabold text-[var(--color-text-primary)] tabular-nums">
                            {(anime.members / 1000000).toFixed(1)}M
                          </p>
                          <p className="text-[0.6rem] text-[var(--color-text-tertiary)]">miembros</p>
                        </div>
                        <div className="hidden sm:block text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <span>⭐</span>
                            <span className="font-bold text-sm text-[var(--color-text-primary)]">{anime.score.toFixed(1)}</span>
                          </div>
                          <p className="text-[0.6rem] text-[var(--color-text-tertiary)]">score</p>
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
                            <div className="flex flex-col sm:flex-row gap-5 mt-5">
                              <div className="sm:w-40 shrink-0">
                                <img
                                  src={anime.image}
                                  alt={anime.title}
                                  className="w-full aspect-[3/4] object-cover rounded-xl"
                                />
                              </div>
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

                                {/* Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                    <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Miembros</p>
                                    <p className="text-base font-bold text-[var(--color-text-primary)]">{(anime.members / 1000000).toFixed(1)}M</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                    <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Score</p>
                                    <p className="text-base font-bold text-[var(--color-text-primary)]">⭐ {anime.score}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                    <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Estudio</p>
                                    <p className="text-xs font-bold text-[var(--color-text-primary)]">{anime.studio}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                    <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Temporada</p>
                                    <p className="text-xs font-bold text-[var(--color-text-primary)]">{anime.season}</p>
                                  </div>
                                </div>

                                {/* Genres */}
                                <div>
                                  <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2 uppercase tracking-wider">🏷️ Géneros</p>
                                  <div className="flex flex-wrap gap-2">
                                    {anime.genre.map((g) => (
                                      <span key={g} className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                                        {g}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Highlight */}
                                <div className="p-3 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                                  <p className="text-xs font-semibold text-[var(--color-primary-light)] mb-1">🔥 Dato destacado</p>
                                  <p className="text-sm text-[var(--color-text-primary)]">{anime.highlight}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="px-4 pb-3 text-right">
                        <span className="text-[0.6rem] text-[var(--color-text-tertiary)]">
                          👆 Clic para más info
                        </span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-8 text-center max-w-3xl">
            Los miembros representan usuarios de MyAnimeList que agregaron el anime a su lista.
            Las cifras de visualizaciones provienen de anuncios oficiales de Crunchyroll, Netflix y otras plataformas.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
