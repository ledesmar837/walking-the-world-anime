'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/primitives';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimeEstreno {
  id: string;
  title: string;
  image: string;
  studio: string;
  genre: string[];
  premiereDate: string;
  episodes: number;
  type: 'TV' | 'Película' | 'OVA' | 'ONA';
  synopsis: string;
  streaming: { name: string; url?: string }[];
  rating: string;
  duration: string;
}

const ESTRENOS: AnimeEstreno[] = [
  {
    id: 'jujutsu-kaisen-s2',
    title: 'Jujutsu Kaisen 2nd Season',
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
    studio: 'MAPPA',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    premiereDate: '6 de julio, 2023',
    episodes: 23,
    type: 'TV',
    synopsis: 'El Arco de Shibuya. Sellos rotos, maldiciones desatadas y la batalla que cambió todo. La segunda temporada adapta uno de los arcos más aclamados del manga de Gege Akutami, llevando la animación a un nuevo nivel con algunas de las escenas de acción más impresionantes de la historia del anime.',
    streaming: [
      { name: 'Crunchyroll' },
      { name: 'Netflix' },
    ],
    rating: '8.8/10',
    duration: '23 min por episodio',
  },
  {
    id: 'oshi-no-ko',
    title: 'Oshi no Ko',
    image: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg',
    studio: 'Doga Kobo',
    genre: ['Drama', 'Sobrenatural', 'Seinen'],
    premiereDate: '12 de abril, 2023',
    episodes: 11,
    type: 'TV',
    synopsis: 'Un ginecólogo y una idol. Dos almas renacen como los hijos de su estrella favorita. Una historia que comienza como un drama de idols y se transforma en una crítica feroz a la industria del entretenimiento japonés. El primer episodio de 90 minutos rompió récords de audiencia.',
    streaming: [
      { name: 'HIDIVE' },
      { name: 'Netflix' },
    ],
    rating: '8.7/10',
    duration: '24 min por episodio',
  },
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    image: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
    studio: 'WIT Studio / CloverWorks',
    genre: ['Comedia', 'Acción', 'Slice of Life'],
    premiereDate: '9 de abril, 2022',
    episodes: 25,
    type: 'TV',
    synopsis: 'Un espía, una asesina y una telépata fingen ser una familia por una misión secreta. Lo que empieza como una fachada se convierte en una de las familias más queridas del anime. La química entre Loid, Yor y Anya conquistó al mundo entero.',
    streaming: [
      { name: 'Crunchyroll' },
      { name: 'Netflix' },
    ],
    rating: '8.5/10',
    duration: '24 min por episodio',
  },
  {
    id: 'mushoku-tensei',
    title: 'Mushoku Tensei',
    image: 'https://cdn.myanimelist.net/images/anime/1530/117776l.jpg',
    studio: 'Studio Bind',
    genre: ['Aventura', 'Drama', 'Fantasía', 'Isekai'],
    premiereDate: '11 de enero, 2021',
    episodes: 23,
    type: 'TV',
    synopsis: 'Considerado el padre del isekai moderno. Un hombre de 34 años renace en un mundo de espada y magia decidido a vivir sin arrepentimientos. La animación, la construcción de mundo y el desarrollo de personajes redefinieron lo que el género podía lograr.',
    streaming: [
      { name: 'Crunchyroll' },
    ],
    rating: '8.4/10',
    duration: '24 min por episodio',
  },
  {
    id: 'dandadan',
    title: 'Dandadan',
    image: 'https://cdn.myanimelist.net/images/anime/1584/143719l.jpg',
    studio: 'Science SARU',
    genre: ['Acción', 'Sobrenatural', 'Comedia', 'Romance'],
    premiereDate: '4 de octubre, 2024',
    episodes: 12,
    type: 'TV',
    synopsis: '¿Crees en los ovnis? ¿Y en los fantasmas? Dos adolescentes con creencias opuestas —ella cree en fantasmas pero no en aliens, él al revés— unen fuerzas para enfrentar amenazas sobrenaturales. Una de las series más frescas y visualmente impactantes de los últimos años.',
    streaming: [
      { name: 'Crunchyroll' },
      { name: 'Netflix' },
    ],
    rating: '8.3/10',
    duration: '24 min por episodio',
  },
  {
    id: 'chainsaw-man',
    title: 'Chainsaw Man',
    image: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
    studio: 'MAPPA',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    premiereDate: '12 de octubre, 2022',
    episodes: 12,
    type: 'TV',
    synopsis: 'Denji se fusiona con Pochita, el demonio de la motosierra, y es reclutado por una organización gubernamental para cazar demonios a cambio de una vida mejor. Violenta, emotiva y con una animación cinematográfica en cada episodio. MAPPA entregó una adaptación que hizo historia.',
    streaming: [
      { name: 'Crunchyroll' },
      { name: 'Amazon Prime Video' },
    ],
    rating: '8.5/10',
    duration: '24 min por episodio',
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    image: 'https://cdn.myanimelist.net/images/anime/1801/142390l.jpg',
    studio: 'A-1 Pictures',
    genre: ['Acción', 'Fantasía', 'Aventura'],
    premiereDate: '7 de enero, 2024',
    episodes: 12,
    type: 'TV',
    synopsis: 'En un mundo donde aparecen portales a mazmorras llenas de monstruos, Sung Jin-Woo pasa de ser el cazador más débil —apodado "el más débil de la humanidad"— al más fuerte gracias a un misterioso "Sistema" que solo él puede ver. Acción pura con producción de altísimo nivel.',
    streaming: [
      { name: 'Crunchyroll' },
    ],
    rating: '8.4/10',
    duration: '24 min por episodio',
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    studio: 'Ufotable',
    genre: ['Acción', 'Sobrenatural', 'Histórico'],
    premiereDate: '6 de abril, 2019',
    episodes: 26,
    type: 'TV',
    synopsis: 'Tanjiro Kamado encuentra a su familia masacrada por demonios. Su hermana Nezuko ha sido transformada en uno de ellos. Juntos emprenden un viaje para vengarse y encontrar una cura. La animación de Ufotable —especialmente el episodio 19— marcó una nueva era para el anime.',
    streaming: [
      { name: 'Crunchyroll' },
      { name: 'Netflix' },
    ],
    rating: '8.5/10',
    duration: '24 min por episodio',
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    studio: 'WIT Studio / MAPPA',
    genre: ['Acción', 'Drama', 'Militar', 'Fantasía oscura'],
    premiereDate: '7 de abril, 2013',
    episodes: 25,
    type: 'TV',
    synopsis: 'La humanidad vive dentro de murallas gigantes para protegerse de los Titanes, criaturas humanoides que devoran personas. Cuando el Titán Colosal derriba la puerta, Eren Jaeger jura exterminarlos a todos. Una obra que redefinió lo que el anime puede ser como medio narrativo.',
    streaming: [
      { name: 'Crunchyroll' },
      { name: 'Amazon Prime Video' },
    ],
    rating: '9.0/10',
    duration: '24 min por episodio',
  },
  {
    id: 'frieren',
    title: 'Frieren: Beyond Journey\'s End',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    studio: 'Madhouse',
    genre: ['Aventura', 'Drama', 'Fantasía'],
    premiereDate: '29 de septiembre, 2023',
    episodes: 28,
    type: 'TV',
    synopsis: 'Después de derrotar al Rey Demonio junto a su grupo de héroes, la elfa Frieren emprende un viaje para entender a los humanos, cuyo tiempo de vida es apenas un suspiro comparado con el suyo. El anime #1 en MyAnimeList. Una meditación profunda sobre el tiempo, la pérdida y lo que dejamos atrás.',
    streaming: [
      { name: 'Crunchyroll' },
    ],
    rating: '9.3/10',
    duration: '24 min por episodio',
  },
  {
    id: 'one-punch-man',
    title: 'One Punch Man',
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
    studio: 'Madhouse / J.C.Staff',
    genre: ['Acción', 'Comedia', 'Parodia', 'Superhéroes'],
    premiereDate: '5 de octubre, 2015',
    episodes: 12,
    type: 'TV',
    synopsis: 'Saitama es un héroe tan poderoso que derrota a cualquier enemigo de un solo golpe. Pero la vida del héroe más fuerte del mundo es sorprendentemente aburrida: las ofertas del supermercado le preocupan más que los monstruos gigantes. Una sátira brillante del género de superhéroes.',
    streaming: [
      { name: 'Crunchyroll' },
      { name: 'Netflix' },
    ],
    rating: '8.5/10',
    duration: '24 min por episodio',
  },
  {
    id: 'cyberpunk-edgerunners',
    title: 'Cyberpunk: Edgerunners',
    image: 'https://cdn.myanimelist.net/images/anime/1818/126435l.jpg',
    studio: 'Trigger',
    genre: ['Cyberpunk', 'Acción', 'Drama', 'Sci-Fi'],
    premiereDate: '13 de septiembre, 2022',
    episodes: 10,
    type: 'ONA',
    synopsis: 'David Martinez sobrevive en las calles de Night City con un implante militar experimental que le permite ralentizar el tiempo. Una historia desgarradora sobre hasta dónde llegarías por un sueño en un mundo que te devora sin piedad. Producida por el legendario Studio Trigger para Netflix.',
    streaming: [
      { name: 'Netflix' },
    ],
    rating: '8.6/10',
    duration: '24 min por episodio',
  },
];

export default function EstrenosPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Estrenos' }]} />

          <SectionHeading
            title="Estrenos de Anime"
            subtitle="Fechas reales de estreno, sinopsis y dónde ver cada anime. Haz clic para expandir."
            icon="🆕"
          />

          <p className="text-sm text-[var(--color-text-tertiary)] mb-8">
            Mostrando los animes más populares con sus fechas originales de estreno en Japón.
            Haz clic en cualquier tarjeta para ver la información completa.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ESTRENOS.map((anime, i) => {
              const isExpanded = expandedId === anime.id;

              return (
                <motion.div
                  key={anime.id}
                  layout
                  className={`bg-[var(--color-surface-card)] border rounded-[var(--radius-lg)] overflow-hidden transition-all cursor-pointer ${
                    isExpanded
                      ? 'border-[var(--color-primary)] shadow-[var(--shadow-glow)] sm:col-span-2 lg:col-span-2 xl:col-span-2'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1'
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => setExpandedId(isExpanded ? null : anime.id)}
                >
                  <div className={`${isExpanded ? 'flex flex-col sm:flex-row' : ''}`}>
                    {/* Image */}
                    <div className={`overflow-hidden relative ${isExpanded ? 'sm:w-72 shrink-0' : 'aspect-[16/9]'}`}>
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading={i < 4 ? 'eager' : 'lazy'}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[0.65rem] font-bold bg-black/70 text-white backdrop-blur-sm">
                        {anime.type}
                      </span>
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[0.65rem] font-bold bg-black/70 text-white backdrop-blur-sm">
                        {anime.episodes} eps
                      </span>
                    </div>

                    {/* Content */}
                    <div className={`${isExpanded ? 'flex-1 p-5' : 'p-4'}`}>
                      {/* Header info */}
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs text-[var(--color-accent)] font-semibold">
                          {anime.studio}
                        </p>
                        <p className="text-xs text-[var(--color-text-tertiary)]">
                          📅 {anime.premiereDate}
                        </p>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-sm lg:text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-2 line-clamp-2">
                        {anime.title}
                      </h3>

                      {/* Synopsis */}
                      <p className={`text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3 ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {anime.synopsis}
                      </p>

                      {/* Genre tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {anime.genre.slice(0, isExpanded ? 6 : 3).map((g) => (
                          <span
                            key={g}
                            className="px-2 py-0.5 rounded-md text-[0.65rem] font-semibold bg-[var(--color-surface)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]"
                          >
                            {g}
                          </span>
                        ))}
                      </div>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden"
                          >
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3">
                              <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Rating</p>
                                <p className="text-sm font-bold text-[var(--color-text-primary)]">{anime.rating}</p>
                              </div>
                              <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Duración</p>
                                <p className="text-sm font-bold text-[var(--color-text-primary)]">{anime.duration}</p>
                              </div>
                              <div className="p-3 rounded-lg bg-[var(--color-surface)] text-center">
                                <p className="text-[0.6rem] text-[var(--color-text-tertiary)] uppercase mb-1">Estudio</p>
                                <p className="text-xs font-bold text-[var(--color-text-primary)]">{anime.studio}</p>
                              </div>
                            </div>

                            {/* Streaming */}
                            <div>
                              <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">
                                📺 Disponible en:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {anime.streaming.map((s) => (
                                  <span
                                    key={s.name}
                                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] border border-[var(--color-accent)]/20"
                                  >
                                    {s.name}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Full synopsis */}
                            <div>
                              <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                                📖 Sinopsis completa:
                              </p>
                              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                {anime.synopsis}
                              </p>
                            </div>

                            <p className="text-[0.6rem] text-[var(--color-text-tertiary)] pt-2 border-t border-[var(--color-border)]">
                              Haz clic nuevamente para cerrar • Las fechas corresponden al estreno original en Japón
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand hint */}
                      {!isExpanded && (
                        <div className="pt-3 border-t border-[var(--color-border)]">
                          <p className="text-[0.65rem] text-[var(--color-text-tertiary)]">
                            👆 Haz clic para ver más información
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
