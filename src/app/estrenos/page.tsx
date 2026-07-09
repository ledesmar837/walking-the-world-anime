import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading, Badge } from '@/components/ui/primitives';

export const metadata: Metadata = {
  title: 'Estrenos de Anime — Verano 2026',
  description: 'Calendario de estrenos de anime de la temporada Verano 2026. Descubre qué animes se estrenan, sus estudios, géneros y fechas.',
  openGraph: {
    title: 'Estrenos de Anime — Verano 2026 | Walking The World Anime',
    description: 'Todos los estrenos de la temporada de Verano 2026 con imágenes, sinopsis y fechas.',
  },
};

interface AnimeEstreno {
  title: string;
  image: string;
  studio: string;
  genre: string[];
  date: string;
  type: 'TV' | 'Película' | 'OVA' | 'ONA';
  episodes: number | string;
  synopsis: string;
  status: 'Estrenándose' | 'Próximamente' | 'Finalizado';
}

const ESTRENOS: AnimeEstreno[] = [
  {
    title: 'Jujutsu Kaisen Temporada 3',
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
    studio: 'MAPPA',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    date: 'Octubre 2026',
    type: 'TV',
    episodes: '24',
    synopsis: 'El arco del Juego de la Matanza comienza. Yuji Itadori y sus aliados enfrentan a los jugadores malditos en una batalla que decidirá el destino de la humanidad.',
    status: 'Próximamente',
  },
  {
    title: 'Oshi no Ko Temporada 3',
    image: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg',
    studio: 'Doga Kobo',
    genre: ['Drama', 'Sobrenatural', 'Seinen'],
    date: 'Enero 2027',
    type: 'TV',
    episodes: '13',
    synopsis: 'Aqua continúa su búsqueda de venganza mientras Ruby brilla en el escenario. Los secretos del mundo del entretenimiento se revelan en la temporada más oscura hasta ahora.',
    status: 'Próximamente',
  },
  {
    title: 'Spy x Family Temporada 3',
    image: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
    studio: 'WIT Studio / CloverWorks',
    genre: ['Comedia', 'Acción', 'Slice of Life'],
    date: 'Octubre 2026',
    type: 'TV',
    episodes: '25',
    synopsis: 'La familia Forger regresa con más misiones secretas, momentos familiares entrañables y las ocurrencias de Anya que nos robarán el corazón una vez más.',
    status: 'Próximamente',
  },
  {
    title: 'My Hero Academia Temporada 8',
    image: 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg',
    studio: 'Bones',
    genre: ['Acción', 'Superhéroes', 'Shonen'],
    date: 'Octubre 2026',
    type: 'TV',
    episodes: '25',
    synopsis: 'La guerra final entre héroes y villanos alcanza su clímax. Deku y sus compañeros de la UA se preparan para el enfrentamiento definitivo contra All For One y Shigaraki.',
    status: 'Próximamente',
  },
  {
    title: 'Dandadan Temporada 2',
    image: 'https://cdn.myanimelist.net/images/anime/1584/143719l.jpg',
    studio: 'Science SARU',
    genre: ['Acción', 'Sobrenatural', 'Comedia', 'Romance'],
    date: 'Enero 2027',
    type: 'TV',
    episodes: '12',
    synopsis: 'Momo y Okarun enfrentan nuevas amenazas sobrenaturales. El Hombre Malvado y otros yokai pondrán a prueba el valor de nuestros protagonistas en esta segunda temporada.',
    status: 'Próximamente',
  },
  {
    title: 'Mushoku Tensei Temporada 3',
    image: 'https://cdn.myanimelist.net/images/anime/1530/117776l.jpg',
    studio: 'Studio Bind',
    genre: ['Aventura', 'Drama', 'Fantasía', 'Isekai'],
    date: 'Julio 2026',
    type: 'TV',
    episodes: '24',
    synopsis: 'Rudeus Greyrat continúa su viaje en un mundo de espada y magia. Nuevos aliados, enemigos poderosos y decisiones que cambiarán el curso de su segunda vida.',
    status: 'Estrenándose',
  },
  {
    title: 'Chainsaw Man: El Arco de Reze',
    image: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
    studio: 'MAPPA',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    date: 'Diciembre 2026',
    type: 'Película',
    episodes: '1',
    synopsis: 'Denji conoce a Reze, una misteriosa chica que trabaja en una cafetería. Lo que comienza como un romance de verano se convierte en una batalla explosiva entre Cazadores de Demonios.',
    status: 'Próximamente',
  },
  {
    title: 'Solo Leveling Temporada 2',
    image: 'https://cdn.myanimelist.net/images/anime/1801/142390l.jpg',
    studio: 'A-1 Pictures',
    genre: ['Acción', 'Fantasía', 'Aventura'],
    date: 'Julio 2026',
    type: 'TV',
    episodes: '13',
    synopsis: 'Sung Jin-Woo, ahora más poderoso que nunca, explora mazmorras de rango S mientras descubre los secretos detrás de su habilidad para subir de nivel.',
    status: 'Estrenándose',
  },
  {
    title: 'Demon Slayer: Castillo Infinito (Parte 1)',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    studio: 'Ufotable',
    genre: ['Acción', 'Sobrenatural', 'Histórico'],
    date: 'Agosto 2026',
    type: 'Película',
    episodes: '1',
    synopsis: 'La trilogía del Castillo Infinito comienza. Tanjiro y los Pilares se adentran en la fortaleza de Muzan para la batalla final contra los demonios.',
    status: 'Próximamente',
  },
  {
    title: 'Attack on Titan: The Last Attack',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    studio: 'MAPPA',
    genre: ['Acción', 'Drama', 'Militar'],
    date: 'Julio 2026',
    type: 'Película',
    episodes: '1',
    synopsis: 'La épica conclusión de Shingeki no Kyojin llega a cines de Latinoamérica. El destino de la humanidad se decide en la batalla final entre Eren y la Alianza.',
    status: 'Estrenándose',
  },
  {
    title: 'Frieren Temporada 2',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    studio: 'Madhouse',
    genre: ['Aventura', 'Drama', 'Fantasía'],
    date: 'Enero 2027',
    type: 'TV',
    episodes: '28',
    synopsis: 'Frieren continúa su viaje hacia el norte con Fern y Stark. Nuevos encuentros, antiguas promesas y la magia de los recuerdos en la secuela del anime mejor valorado de la historia.',
    status: 'Próximamente',
  },
  {
    title: 'One Punch Man Temporada 3',
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
    studio: 'J.C.Staff',
    genre: ['Acción', 'Comedia', 'Parodia'],
    date: 'Octubre 2026',
    type: 'TV',
    episodes: '12',
    synopsis: 'Saitama regresa. La Asociación de Monstruos amenaza la Tierra y ni siquiera los héroes de Clase S parecen suficientes. ¿Podrá el héroe más fuerte salvar el día sin despeinarse?',
    status: 'Próximamente',
  },
];

export default function EstrenosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-main py-8">
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Estrenos' }]} />

          <SectionHeading
            title="Estrenos de Temporada"
            subtitle="Verano 2026 — Los animes más esperados"
            icon="🆕"
          />

          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {['Todos', 'TV', 'Película', 'Estrenándose', 'Próximamente'].map((filtro) => (
              <button
                key={filtro}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filtro === 'Todos'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {filtro}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ESTRENOS.map((anime, i) => (
              <div
                key={anime.title}
                className="group bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--color-primary)]/30 transition-all hover:shadow-[var(--shadow-lg)] animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                  {/* Type badge */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[0.65rem] font-bold bg-black/70 text-white backdrop-blur-sm">
                    {anime.type}
                  </span>
                  {/* Status */}
                  <span
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[0.65rem] font-bold backdrop-blur-sm ${
                      anime.status === 'Estrenándose'
                        ? 'bg-emerald-600/80 text-white'
                        : 'bg-blue-600/80 text-white'
                    }`}
                  >
                    {anime.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Studio */}
                  <p className="text-xs text-[var(--color-accent)] font-semibold mb-1">
                    {anime.studio}
                  </p>

                  {/* Title */}
                  <h3 className="font-display font-bold text-sm lg:text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-2 line-clamp-2">
                    {anime.title}
                  </h3>

                  {/* Synopsis */}
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed mb-3">
                    {anime.synopsis}
                  </p>

                  {/* Genre tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {anime.genre.slice(0, 3).map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded-md text-[0.65rem] font-semibold bg-[var(--color-surface)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Meta footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-tertiary)]">
                    <span>📅 {anime.date}</span>
                    <span>📺 {anime.episodes} {anime.type === 'Película' ? 'película' : 'eps'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
