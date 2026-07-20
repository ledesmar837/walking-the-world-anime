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
    id: 'mushoku-tensei-3',
    title: 'Mushoku Tensei III: Isekai Ittara Honki Dasu',
    image: 'https://cdn.myanimelist.net/images/anime/1527/158340l.jpg',
    studio: 'Studio Bind',
    genre: ['Aventura', 'Drama', 'Fantasía', 'Isekai'],
    premiereDate: '6 de julio, 2026',
    episodes: 14,
    type: 'TV',
    synopsis: 'La tercera temporada de Mushoku Tensei continúa el viaje de Rudeus Greyrat en un mundo de espada y magia. Tras los eventos del Arco de la Escuela de Magia, nuevas amenazas y descubrimientos aguardan. La animación de Studio Bind mantiene el nivel que hizo historia en el género isekai.',
    streaming: [
      { name: 'Crunchyroll' },
    ],
    rating: '8.8/10',
    duration: '23 min por episodio',
  },
  {
    id: 'youjo-senki-2',
    title: 'Youjo Senki II',
    image: 'https://cdn.myanimelist.net/images/anime/1917/158371l.jpg',
    studio: 'NUT',
    genre: ['Acción', 'Fantasía', 'Militar'],
    premiereDate: '8 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'La esperadísima segunda temporada de Youjo Senki. Tanya von Degurechaff continúa su sangriento ascenso en el ejército del Imperio, enfrentando batallas cada vez más brutales mientras desafía a Being X. Una crítica mordaz a la guerra, la burocracia y el fanatismo religioso.',
    streaming: [
      { name: 'Crunchyroll' },
    ],
    rating: '8.4/10',
    duration: '23 min por episodio',
  },
  {
    id: 'bleach-kashin-tan',
    title: 'Bleach: Sennen Kessen-hen - Kashin-tan',
    image: 'https://cdn.myanimelist.net/images/anime/1275/158595l.jpg',
    studio: 'Pierrot',
    genre: ['Acción', 'Aventura', 'Sobrenatural', 'Shonen'],
    premiereDate: '25 de julio, 2026',
    episodes: 13,
    type: 'TV',
    synopsis: 'La parte final de Bleach: Thousand-Year Blood War. Ichigo Kurosaki y sus aliados se preparan para el enfrentamiento definitivo contra Yhwach y los Sternritter. El arco que cierra una de las sagas más épicas del shonen, con una animación espectacular de Pierrot.',
    streaming: [
      { name: 'Disney+', url: 'https://disneyplus.com' },
      { name: 'Hulu' },
    ],
    rating: '9.0/10',
    duration: '23 min por episodio',
  },
  {
    id: 'grand-blue-3',
    title: 'Grand Blue Season 3',
    image: 'https://cdn.myanimelist.net/images/anime/1615/158194l.jpg',
    studio: 'Zero-G',
    genre: ['Comedia', 'Slice of Life', 'Deportes'],
    premiereDate: '7 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'Tercera temporada de Grand Blue. Iori Kitahara y el Club de Buceo de la universidad regresan con más locuras, más cerveza y más momentos épicos. Si te gustó el humor absurdo y las expresiones faciales exageradas, esta temporada promete superar todo lo anterior.',
    streaming: [
      { name: 'Amazon Prime Video' },
    ],
    rating: '8.4/10',
    duration: '24 min por episodio',
  },
  {
    id: 'koukaku-kidoutai',
    title: 'Ghost in the Shell (TV)',
    image: 'https://cdn.myanimelist.net/images/anime/1474/158937l.jpg',
    studio: 'Science SARU',
    genre: ['Acción', 'Misterio', 'Sci-Fi', 'Suspenso'],
    premiereDate: '7 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'Una nueva adaptación televisiva del legendario manga de Masamune Shirow. En el año 2029, la Sección 9 de Seguridad Pública combate el cibercrimen en un mundo donde la línea entre humanos y máquinas se ha difuminado. Producida por Science SARU con un enfoque visual innovador.',
    streaming: [],
    rating: '8.0/10',
    duration: '23 min por episodio',
  },
  {
    id: 'black-torch',
    title: 'Black Torch',
    image: 'https://cdn.myanimelist.net/images/anime/1965/158363l.jpg',
    studio: 'Studio Kokoro',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    premiereDate: '4 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'Jirou Azuma, descendiente de una larga estirpe de shinobi, posee la habilidad de comunicarse con los animales. Al salvar a un misterioso gato negro, se fusiona con él y obtiene poderes inimaginables. Una batalla entre humanos, mononoke y demonios comienza.',
    streaming: [
      { name: 'Crunchyroll' },
    ],
    rating: '7.3/10',
    duration: '23 min por episodio',
  },
  {
    id: 'kimi-ga-shinu-made',
    title: 'Kimi ga Shinu made Koi wo Shitai',
    image: 'https://cdn.myanimelist.net/images/anime/1096/158712l.jpg',
    studio: 'LIDENFILMS',
    genre: ['Fantasía', 'Girls Love', 'Drama'],
    premiereDate: '7 de julio, 2026',
    episodes: 13,
    type: 'TV',
    synopsis: 'En un orfanato que cría niños como soldados, la muerte es parte de la rutina. Sheena Totsuki, marcada como potencial explosivo humano, conoce a una chica que parece incapaz de morir. Una historia desgarradora sobre el amor en tiempos de guerra, donde cada día podría ser el último.',
    streaming: [],
    rating: '7.8/10',
    duration: '23 min por episodio',
  },
  {
    id: '100-kanojo-3',
    title: '100 Girlfriends 3rd Season',
    image: 'https://cdn.myanimelist.net/images/anime/1106/157174l.jpg',
    studio: 'Bibury Animation Studios',
    genre: ['Comedia', 'Romance', 'Harem'],
    premiereDate: '5 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'Rentarou Aijou y sus 100 novias están de vuelta en la tercera temporada. Cuando el dios del amor le revela que encontrará a 100 almas gemelas, Rentarou decide amarlas a todas por igual. Más caos, más momentos adorables y más referencias meta-humorísticas que nunca.',
    streaming: [
      { name: 'Crunchyroll' },
    ],
    rating: '8.2/10',
    duration: '23 min por episodio',
  },
  {
    id: 'eureka-evrika',
    title: 'Nijusseiki Denki Mokuroku: Eureka Evrika',
    image: 'https://cdn.myanimelist.net/images/anime/1068/158475l.jpg',
    studio: 'Kyoto Animation',
    genre: ['Drama', 'Steampunk', 'Histórico'],
    premiereDate: '5 de julio, 2026',
    episodes: 13,
    type: 'TV',
    synopsis: 'En una versión alternativa de principios del siglo XX, Kioto está cubierta por un humo constante. Un joven endurecido por la pérdida de su hermano se vuelve desconfiado, pero un encuentro fortuito con una misteriosa chica cambiará su destino. Una obra con la calidad artística característica de Kyoto Animation.',
    streaming: [],
    rating: '7.8/10',
    duration: '23 min por episodio',
  },
  {
    id: 'seihantai-2',
    title: 'Seihantai na Kimi to Boku 2',
    image: 'https://cdn.myanimelist.net/images/anime/1143/158409l.jpg',
    studio: 'feel.',
    genre: ['Comedia', 'Romance', 'Slice of Life'],
    premiereDate: '5 de julio, 2026',
    episodes: 13,
    type: 'TV',
    synopsis: 'Segunda temporada de esta adorable comedia romántica. Chicos callados y chicas extrovertidas, opuestos que se atraen. La vida escolar nunca fue tan divertida. Una serie ligera y cálida perfecta para desconectar.',
    streaming: [],
    rating: '8.4/10',
    duration: '24 min por episodio',
  },
  {
    id: 'tenmaku-jadugar',
    title: 'Tenmaku no Jaadugar',
    image: 'https://cdn.myanimelist.net/images/anime/1098/158891l.jpg',
    studio: 'MADHOUSE',
    genre: ['Drama', 'Histórico', 'Fantasía'],
    premiereDate: '4 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'En el harén del Khan, la sabiduría es belleza. Siglo XIII, Yenise Mongol Ulus, el imperio más grande que el mundo ha conocido. Fatima, una mujer de Persia, posee conocimientos de medicina y ciencia. Su inteligencia la lleva a moverse entre el peligro y el poder en la corte.',
    streaming: [],
    rating: '8.4/10',
    duration: '23 min por episodio',
  },
  {
    id: 'sayonara-lara',
    title: 'Sayonara Lara',
    image: 'https://cdn.myanimelist.net/images/anime/1411/156343l.jpg',
    studio: 'CloverWorks',
    genre: ['Fantasía', 'Romance', 'Drama'],
    premiereDate: '6 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'Hace mucho tiempo, existía una princesa sirena llamada Lara. Criada con amor por su padre, el rey del mar, y sus hermanas, todo cambió cuando se enamoró de un príncipe humano. Un amor prohibido que desafía las barreras entre dos mundos. Una historia visualmente impresionante sobre el sacrificio y el amor verdadero.',
    streaming: [
      { name: 'Netflix' },
    ],
    rating: '7.8/10',
    duration: '24 min por episodio',
  },
  {
    id: 'ossan-kensei-2',
    title: 'Katainaka no Ossan, Kensei ni Naru II',
    image: 'https://cdn.myanimelist.net/images/anime/1100/157173l.jpg',
    studio: 'Felix Film',
    genre: ['Acción', 'Fantasía', 'Aventura'],
    premiereDate: '8 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'Segunda temporada de la historia de Beryl, el legendario espadachín retirado que vive una vida tranquila en el campo. Pero cuando el mundo vuelve a necesitarlo, su vieja hoja despierta. Una combinación perfecta de acción espectacular y slice of life rural.',
    streaming: [],
    rating: '7.4/10',
    duration: '23 min por episodio',
  },
  {
    id: 'nige-jouzu-2',
    title: 'Nige Jouzu no Wakagimi 2nd Season',
    image: 'https://cdn.myanimelist.net/images/anime/1289/156329l.jpg',
    studio: 'CloverWorks',
    genre: ['Aventura', 'Comedia', 'Histórico'],
    premiereDate: '17 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'Segunda temporada de The Elusive Samurai. Tokiyuki Hojo continúa su entrenamiento como el samurái más escurridizo de la historia. Entre batallas imposibles y escapes milagrosos, la serie combina acción trepidante con el carisma visual característico de CloverWorks.',
    streaming: [
      { name: 'Crunchyroll' },
    ],
    rating: '7.6/10',
    duration: '23 min por episodio',
  },
  {
    id: 'carameliser',
    title: 'Otome Kaijuu Caraméliser',
    image: 'https://cdn.myanimelist.net/images/anime/1981/156340l.jpg',
    studio: 'C2C',
    genre: ['Romance', 'Sobrenatural', 'Comedia'],
    premiereDate: '3 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'Kuroe Akaishi es una chica de secundaria introvertida y aparentemente normal. Todo cambia cuando conoce a Arata Minami, el chico popular de la clase. Pero Kuroe guarda un secreto monstruoso que amenaza con salir a la luz. Una comedia romántica con un toque sobrenatural adorable.',
    streaming: [],
    rating: '7.7/10',
    duration: '24 min por episodio',
  },
  {
    id: 'toumei-na-yoru',
    title: 'Toumei na Yoru ni Kakeru Kimi to',
    image: 'https://cdn.myanimelist.net/images/anime/1145/158339l.jpg',
    studio: 'A-1 Pictures',
    genre: ['Drama', 'Romance', 'Recuentos de la vida'],
    premiereDate: '6 de julio, 2026',
    episodes: 12,
    type: 'TV',
    synopsis: 'Una noche de abril en Tokio, con los cerezos en flor. Koharu Fuyutsuki, una estudiante universitaria invidente, pasa tiempo con el hombre que ama, Kakeru Sorano. En los tres años desde que empezaron a salir, él le ha demostrado cuánto la valora. Una historia de amor conmovedora sobre la conexión más allá de lo visible.',
    streaming: [],
    rating: '7.9/10',
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
            subtitle="Los estrenos más esperados del Verano 2026 (julio-septiembre). Fechas, sinopsis y dónde verlos."
            icon="🆕"
          />

          <p className="text-sm text-[var(--color-text-tertiary)] mb-8">
            Mostrando los 16 animes más esperados del Verano 2026 (julio-septiembre) con sus fechas de estreno en Japón.
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
