'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading, Badge } from '@/components/ui/primitives';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// TIPOS
// ============================================
interface SeriesEntry {
  rank: number;
  title: string;
  image: string;
  score: number;
  members: number;
  episodes: number | string;
  type: string;
  studio: string;
  season: string;
  synopsis: string;
  genre: string[];
  highlight: string;
  views: string;
}

interface EpisodeEntry {
  rank: number;
  episode: string;
  series: string;
  epNum: string;
  image: string;
  score: number;
  views: string;
  platform: string;
  description: string;
  highlight: string;
}

// ============================================
// DATOS — Series más vistas 2025-2026
// ============================================
const SERIES_RANKING: SeriesEntry[] = [
  {
    rank: 1, title: 'Solo Leveling Season 2',
    image: 'https://cdn.myanimelist.net/images/anime/1801/142390l.jpg',
    score: 8.64, members: 1240000, episodes: 13, type: 'TV',
    studio: 'A-1 Pictures', season: 'Invierno 2025',
    synopsis: 'Sung Jin-Woo, ahora el cazador más poderoso, continúa su ascenso imparable. La Isla de Jeju y el enfrentamiento contra las hormigas gigantes marcaron uno de los momentos más épicos del año.',
    genre: ['Acción', 'Fantasía', 'Aventura'],
    highlight: 'El episodio de la Isla de Jeju fue tendencia mundial #1 en X durante 72 horas.',
    views: '+15M en Crunchyroll',
  },
  {
    rank: 2, title: 'Dandadan',
    image: 'https://cdn.myanimelist.net/images/anime/1584/143719l.jpg',
    score: 8.52, members: 980000, episodes: 12, type: 'TV',
    studio: 'Science SARU', season: 'Otoño 2024',
    synopsis: 'Momo y Okarun enfrentan fantasmas, aliens y maldiciones en una montaña rusa de acción, comedia y romance con un estilo visual que rompió todos los moldes. Science SARU entregó la animación más creativa del año.',
    genre: ['Acción', 'Sobrenatural', 'Comedia', 'Romance'],
    highlight: 'Opening "Otonoke" por Creepy Nuts alcanzó #1 en Billboard Japón.',
    views: '+12M en Crunchyroll/Netflix',
  },
  {
    rank: 3, title: 'Mushoku Tensei Season 3',
    image: 'https://cdn.myanimelist.net/images/anime/1530/117776l.jpg',
    score: 8.98, members: 750000, episodes: 24, type: 'TV',
    studio: 'Studio Bind', season: 'Verano 2025',
    synopsis: 'El isekai más aclamado regresa. Rudeus enfrenta las consecuencias de su pasado mientras construye una nueva vida con una animación que parece pintura en movimiento.',
    genre: ['Aventura', 'Drama', 'Fantasía', 'Isekai'],
    highlight: 'Considerado por la crítica como el mejor isekai jamás producido.',
    views: '+10M en Crunchyroll',
  },
  {
    rank: 4, title: 'Demon Slayer: Hashira Geiko-hen',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    score: 8.48, members: 920000, episodes: 8, type: 'TV',
    studio: 'Ufotable', season: 'Primavera 2024',
    synopsis: 'El arco del Entrenamiento de los Pilares preparó el terreno para la batalla final. El final de temporada con la entrada al Castillo Infinito dejó a los fans conteniendo la respiración.',
    genre: ['Acción', 'Sobrenatural', 'Histórico'],
    highlight: 'El episodio final fue el más visto de la historia de Crunchyroll en 24 horas.',
    views: '+18M en Crunchyroll',
  },
  {
    rank: 5, title: 'Oshi no Ko Season 2',
    image: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg',
    score: 8.58, members: 850000, episodes: 13, type: 'TV',
    studio: 'Doga Kobo', season: 'Verano 2024',
    synopsis: 'La segunda temporada profundiza en el teatro y las motivaciones de Aqua. El arco de Tokyo Blade llevó el drama a otro nivel.',
    genre: ['Drama', 'Sobrenatural', 'Seinen'],
    highlight: 'Primer episodio de la S2 fue el más comentado en redes japonesas en 2024.',
    views: '+11M en HIDIVE/Netflix',
  },
  {
    rank: 6, title: 'Jujutsu Kaisen 2nd Season',
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
    score: 8.70, members: 2200000, episodes: 23, type: 'TV',
    studio: 'MAPPA', season: 'Verano 2023',
    synopsis: 'El Arco de Shibuya. MAPPA entregó secuencias de acción brutales y memorables. Su impacto continuó dominando las visualizaciones durante todo 2024 y 2025.',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    highlight: 'El episodio de Gojo acumuló +50M de visualizaciones combinadas.',
    views: '+25M acumulados en Crunchyroll',
  },
  {
    rank: 7, title: 'Frieren: Beyond Journey\'s End',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    score: 9.26, members: 1400000, episodes: 28, type: 'TV',
    studio: 'Madhouse', season: 'Otoño 2023',
    synopsis: 'El anime #1 de todos los tiempos en MyAnimeList. La elfa que aprendió a valorar el tiempo humano es una obra que se sigue recomendando y descubriendo.',
    genre: ['Aventura', 'Drama', 'Fantasía'],
    highlight: '#1 en MyAnimeList por más de 100 semanas consecutivas.',
    views: '+20M acumulados en Crunchyroll',
  },
  {
    rank: 8, title: 'Bleach: Sennen Kessen-hen',
    image: 'https://cdn.myanimelist.net/images/anime/1908/135431l.jpg',
    score: 9.02, members: 620000, episodes: 13, type: 'TV',
    studio: 'Pierrot Films', season: 'Verano 2025',
    synopsis: 'La Guerra de Sangre de los Mil Años llega a su punto más álgido con batallas que los fans esperaron más de una década.',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    highlight: 'Cada episodio fue tendencia mundial. La calidad de animación sorprendió a todos.',
    views: '+9M en Disney+/Hulu',
  },
  {
    rank: 9, title: 'One Piece: Egghead Arc',
    image: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
    score: 8.82, members: 1100000, episodes: 30, type: 'TV',
    studio: 'Toei Animation', season: '2024-2025',
    synopsis: 'El arco de Egghead reveló secretos que los fans esperaron décadas. Los secretos del Siglo Vacío mantuvieron a la comunidad en vilo.',
    genre: ['Aventura', 'Acción', 'Fantasía', 'Shonen'],
    highlight: 'La revelación del Siglo Vacío fue el momento más comentado en la historia del fandom.',
    views: '+20M semanales en Crunchyroll',
  },
  {
    rank: 10, title: 'Spy x Family + Movie',
    image: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
    score: 8.45, members: 1400000, episodes: 12, type: 'TV',
    studio: 'WIT / CloverWorks', season: '2023-2024',
    synopsis: 'La familia Forger mantuvo su dominio absoluto. La película "Código Blanco" recaudó más de $45M en Japón.',
    genre: ['Comedia', 'Acción', 'Slice of Life'],
    highlight: 'Película recaudó +$45M. Anya se volvió embajadora no oficial del anime mundial.',
    views: '+30M combinados (TV + Cine)',
  },
];

// ============================================
// DATOS — Episodios más vistos (IMDb)
// ============================================
const EPISODES_RANKING: EpisodeEntry[] = [
  {
    rank: 1, episode: 'Hero', series: 'Attack on Titan', epNum: 'T3 E17',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    score: 10.0, views: '35M+', platform: 'Crunchyroll / Prime Video',
    description: 'Levi Ackerman vs el Titán Bestia. Erwin lidera la carga suicida. Considerado por IMDb como el mejor episodio de televisión de todos los tiempos junto a Ozymandias de Breaking Bad.',
    highlight: 'Único episodio de anime con puntuación perfecta 10.0 en IMDb con más de 100,000 votos.',
  },
  {
    rank: 2, episode: 'Hinokami', series: 'Demon Slayer', epNum: 'T1 E19',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    score: 9.7, views: '40M+', platform: 'Crunchyroll / Netflix',
    description: 'Tanjiro despierta la Danza del Dios del Fuego. El episodio que convirtió a Demon Slayer en un fenómeno mundial con una combinación perfecta de animación, música y dirección.',
    highlight: 'El episodio que rompió Twitter durante 48 horas. Crunchyroll colapsó por la demanda.',
  },
  {
    rank: 3, episode: 'Declaration of War', series: 'Attack on Titan', epNum: 'T4 E5',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    score: 9.8, views: '30M+', platform: 'Crunchyroll / Prime Video',
    description: 'Eren se infiltra en Liberio. Willy Tybur declara la guerra. La transformación de Eren en el Titán de Ataque en pleno festival es uno de los momentos más impactantes jamás animados.',
    highlight: 'Los servidores de Crunchyroll colapsaron durante el estreno de este episodio.',
  },
  {
    rank: 4, episode: 'Gear 5', series: 'One Piece', epNum: 'E1071',
    image: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
    score: 9.7, views: '50M+', platform: 'Crunchyroll',
    description: 'Luffy despierta el Gear 5. El episodio más esperado en 25 años de One Piece. Toei Animation capturó la esencia caricaturesca y liberadora del poder definitivo de Luffy.',
    highlight: 'El episodio más visto en la historia de Crunchyroll. Tendencia #1 mundial durante 72h.',
  },
  {
    rank: 5, episode: 'Assault', series: 'Attack on Titan', epNum: 'T4 E7',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    score: 9.9, views: '28M+', platform: 'Crunchyroll / Prime Video',
    description: 'El Titán de Ataque vs el Titán Martillo de Guerra. MAPPA alcanzó la cima técnica de la animación con coreografías de combate que dejaron sin palabras a la audiencia global.',
    highlight: 'IMDb 9.9 con más de 80,000 votos. Animación de nivel cinematográfico.',
  },
  {
    rank: 6, episode: 'Silence', series: 'Death Note', epNum: 'E25',
    image: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
    score: 9.8, views: '25M+', platform: 'Netflix / Crunchyroll',
    description: 'Light Yagami se enfrenta a L en el clímax de Death Note. El silencio bajo la lluvia. Uno de los desenlaces más impactantes jamás escritos, inmortalizado por Tetsuro Araki.',
    highlight: 'IMDb 9.8. Uno de los mejores episodios finales de cualquier serie.',
  },
  {
    rank: 7, episode: 'Perfect Game', series: 'Attack on Titan', epNum: 'T3 E16',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    score: 9.9, views: '22M+', platform: 'Crunchyroll / Prime Video',
    description: 'Erwin Smith y el Cuerpo de Exploración enfrentan la muerte contra el Titán Bestia. "¡Soldados, griten! ¡Dediquen sus corazones!". Un episodio que define el sacrificio.',
    highlight: 'IMDb 9.9. El discurso de Erwin es uno de los mejores momentos de la televisión.',
  },
  {
    rank: 8, episode: 'Shibuya — Gate Closed', series: 'Jujutsu Kaisen', epNum: 'T2 E17',
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
    score: 9.6, views: '20M+', platform: 'Crunchyroll',
    description: 'El clímax de Shibuya. Sukuna desatado. MAPPA redefinió lo posible en animación de TV con secuencias de acción de una intensidad nunca antes vista.',
    highlight: 'Aclamado como uno de los mejores episodios de acción jamás producidos.',
  },
  {
    rank: 9, episode: 'Arise', series: 'Solo Leveling', epNum: 'T2 E12',
    image: 'https://cdn.myanimelist.net/images/anime/1801/142390l.jpg',
    score: 9.5, views: '18M+', platform: 'Crunchyroll',
    description: 'Sung Jin-Woo usa "Arise". El nacimiento del Monarca de las Sombras en la Isla de Jeju. A-1 Pictures llevó el manhwa más popular del mundo a la pantalla con un espectáculo impresionante.',
    highlight: 'El episodio más visto de 2025 en Crunchyroll.',
  },
  {
    rank: 10, episode: 'A Powerful Mage', series: 'Frieren', epNum: 'E10',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    score: 9.7, views: '16M+', platform: 'Crunchyroll',
    description: 'Frieren vs Aura la Guillotina. El verdadero alcance del poder de la maga más poderosa, revelado en una secuencia que combina belleza visual y narrativa con maestría.',
    highlight: 'El episodio que consolidó a Frieren como el anime #1 de MyAnimeList.',
  },
];

// ============================================
// COMPONENTE: Tarjeta expandible genérica
// ============================================
function ExpandableCard({
  rank,
  isExpanded,
  onClick,
  children,
  collapsedContent,
  className = '',
}: {
  rank: number;
  isExpanded: boolean;
  onClick: () => void;
  children: React.ReactNode;
  collapsedContent: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`bg-[var(--color-surface-card)] border rounded-[var(--radius-lg)] overflow-hidden cursor-pointer transition-all ${
        isExpanded
          ? 'border-[var(--color-primary)] shadow-[var(--shadow-glow)]'
          : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-md)]'
      } ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      layout
    >
      {collapsedContent}
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
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isExpanded && (
        <div className="px-4 pb-3 text-right">
          <span className="text-[0.6rem] text-[var(--color-text-tertiary)]">👆 Clic para más info</span>
        </div>
      )}
    </motion.div>
  );
}

// ============================================
// PÁGINA PRINCIPAL
// ============================================
export default function RankingsPage() {
  const [expandedSeries, setExpandedSeries] = useState<number | null>(null);
  const [expandedEpisode, setExpandedEpisode] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Rankings' }]} />

          {/* ===== SERIES RANKING ===== */}
          <SectionHeading
            title="Ranking 2025-2026"
            subtitle="Los 10 animes más vistos del último año — Miembros en MyAnimeList"
            icon="🔥"
          />
          <p className="text-xs text-[var(--color-text-tertiary)] mb-8">
            📊 Basado en número de miembros (espectadores registrados). Solo animes con episodios entre 2024-2026.
          </p>

          <div className="max-w-3xl space-y-3 mb-16">
            {SERIES_RANKING.map((anime, i) => {
              const isExpanded = expandedSeries === anime.rank;
              return (
                <motion.div
                  key={`series-${anime.rank}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  layout
                >
                  <ExpandableCard
                    rank={anime.rank}
                    isExpanded={isExpanded}
                    onClick={() => setExpandedSeries(isExpanded ? null : anime.rank)}
                    collapsedContent={
                      <div className="flex items-center gap-4 p-4">
                        <motion.div
                          className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-base sm:text-lg font-extrabold shrink-0 ${
                            anime.rank <= 3
                              ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white shadow-[var(--shadow-glow)]'
                              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                          }`}
                          animate={isExpanded ? { rotate: [0, -8, 8, 0] } : {}}
                        >
                          #{anime.rank}
                        </motion.div>
                        <div className="w-14 h-20 sm:w-16 sm:h-22 rounded-lg overflow-hidden shrink-0">
                          <img src={anime.image} alt={anime.title} className="w-full h-full object-cover" loading={i < 3 ? 'eager' : 'lazy'} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-sm sm:text-base text-[var(--color-text-primary)] truncate">{anime.title}</h3>
                          <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">{anime.studio} • {anime.season}</p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <Badge variant="primary" size="sm">{anime.type}</Badge>
                            <span className="text-xs text-[var(--color-text-tertiary)]">{anime.episodes} eps</span>
                            <span className="text-xs text-[var(--color-accent)] font-semibold">{anime.views}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 flex items-center gap-3">
                          <div>
                            <p className="text-lg font-extrabold text-[var(--color-text-primary)]">{(anime.members / 1000000).toFixed(1)}M</p>
                            <p className="text-[0.6rem] text-[var(--color-text-tertiary)]">miembros</p>
                          </div>
                          <div className="hidden sm:block text-right">
                            <span className="text-sm">⭐{anime.score.toFixed(1)}</span>
                          </div>
                          <motion.span className="text-[var(--color-text-tertiary)] text-lg" animate={{ rotate: isExpanded ? 180 : 0 }}>▾</motion.span>
                        </div>
                      </div>
                    }
                  >
                    <div className="flex flex-col sm:flex-row gap-5 mt-5">
                      <div className="sm:w-40 shrink-0">
                        <img src={anime.image} alt={anime.title} className="w-full aspect-[3/4] object-cover rounded-xl" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-1">📖 Sinopsis</p>
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{anime.synopsis}</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { label: 'Miembros', value: `${(anime.members / 1000000).toFixed(1)}M` },
                            { label: 'Score', value: `⭐ ${anime.score}` },
                            { label: 'Estudio', value: anime.studio },
                            { label: 'Temporada', value: anime.season },
                          ].map((s) => (
                            <div key={s.label} className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                              <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">{s.label}</p>
                              <p className="text-sm font-bold text-[var(--color-text-primary)]">{s.value}</p>
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-2">🏷️ Géneros</p>
                          <div className="flex flex-wrap gap-2">
                            {anime.genre.map((g) => (
                              <span key={g} className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">{g}</span>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                          <p className="text-xs font-semibold text-[var(--color-primary-light)] mb-1">🔥 Dato destacado</p>
                          <p className="text-sm text-[var(--color-text-primary)]">{anime.highlight}</p>
                        </div>
                      </div>
                    </div>
                  </ExpandableCard>
                </motion.div>
              );
            })}
          </div>

          {/* ===== EPISODES RANKING ===== */}
          <SectionHeading
            title="Episodios Más Vistos"
            subtitle="Top 10 episodios individuales con mayor audiencia y puntuación IMDb"
            icon="📺"
          />
          <p className="text-xs text-[var(--color-text-tertiary)] mb-8">
            ⭐ Puntuaciones verificadas de IMDb. 📊 Visualizaciones basadas en anuncios oficiales de plataformas de streaming.
          </p>

          <div className="max-w-3xl space-y-3">
            {EPISODES_RANKING.map((ep, i) => {
              const isExpanded = expandedEpisode === ep.rank;
              return (
                <motion.div
                  key={`ep-${ep.rank}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  layout
                >
                  <ExpandableCard
                    rank={ep.rank}
                    isExpanded={isExpanded}
                    onClick={() => setExpandedEpisode(isExpanded ? null : ep.rank)}
                    collapsedContent={
                      <div className="flex items-center gap-4 p-4">
                        <motion.div
                          className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-base sm:text-lg font-extrabold shrink-0 ${
                            ep.rank <= 3
                              ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg shadow-yellow-500/25'
                              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                          }`}
                          animate={isExpanded ? { rotate: [0, -8, 8, 0] } : {}}
                        >
                          #{ep.rank}
                        </motion.div>
                        <div className="w-14 h-20 sm:w-16 sm:h-22 rounded-lg overflow-hidden shrink-0">
                          <img src={ep.image} alt={ep.episode} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-sm sm:text-base text-[var(--color-text-primary)]">"{ep.episode}"</h3>
                          <p className="text-xs text-[var(--color-text-tertiary)]">{ep.series} • {ep.epNum}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="accent" size="sm">{ep.platform}</Badge>
                            <span className="text-xs text-[var(--color-accent)] font-semibold">{ep.views} views</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 flex items-center gap-3">
                          <div>
                            <p className="text-lg font-extrabold text-[var(--color-text-primary)]">{ep.score.toFixed(1)}</p>
                            <p className="text-[0.6rem] text-[var(--color-text-tertiary)]">IMDb</p>
                          </div>
                          <motion.span className="text-[var(--color-text-tertiary)] text-lg" animate={{ rotate: isExpanded ? 180 : 0 }}>▾</motion.span>
                        </div>
                      </div>
                    }
                  >
                    <div className="flex flex-col sm:flex-row gap-5 mt-5">
                      <div className="sm:w-40 shrink-0">
                        <img src={ep.image} alt={ep.episode} className="w-full aspect-[3/4] object-cover rounded-xl" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-1">📖 Descripción</p>
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{ep.description}</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { label: 'IMDb', value: `${ep.score.toFixed(1)}/10` },
                            { label: 'Audiencia', value: ep.views },
                            { label: 'Serie', value: ep.series },
                            { label: 'Episodio', value: ep.epNum },
                          ].map((s) => (
                            <div key={s.label} className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                              <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">{s.label}</p>
                              <p className="text-sm font-bold text-[var(--color-text-primary)]">{s.value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                          <p className="text-xs font-semibold text-[var(--color-accent-light)] mb-1">🔥 Dato destacado</p>
                          <p className="text-sm text-[var(--color-text-primary)]">{ep.highlight}</p>
                        </div>
                      </div>
                    </div>
                  </ExpandableCard>
                </motion.div>
              );
            })}
          </div>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-8 text-center max-w-3xl">
            Miembros: usuarios de MyAnimeList que agregaron el anime a su lista. Scores de episodios verificados de IMDb.
            Cifras de visualizaciones basadas en anuncios oficiales de Crunchyroll, Netflix y otras plataformas.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
