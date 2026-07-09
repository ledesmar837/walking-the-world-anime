import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/primitives';

export const metadata: Metadata = {
  title: 'Estrenos de Anime — Temporadas y Fechas Reales',
  description: 'Calendario de estrenos de anime con fechas reales de estreno, estudios, géneros y dónde verlos en streaming.',
  openGraph: {
    title: 'Estrenos de Anime | Walking The World Anime',
    description: 'Todos los estrenos de anime con fechas reales, sinopsis y plataformas de streaming.',
  },
};

interface AnimeEstreno {
  title: string;
  image: string;
  studio: string;
  genre: string[];
  premiereDate: string;       // Fecha real de estreno
  episodes: number;
  type: 'TV' | 'Película' | 'OVA' | 'ONA';
  synopsis: string;
  malUrl: string;
  streaming: { name: string; url: string }[];
}

const ESTRENOS: AnimeEstreno[] = [
  {
    title: 'Jujutsu Kaisen 2nd Season',
    image: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg',
    studio: 'MAPPA',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    premiereDate: '6 de julio, 2023',
    episodes: 23,
    type: 'TV',
    synopsis: 'El Arco de Shibuya. Sellos rotos, maldiciones desatadas y la batalla que cambió todo. La segunda temporada adapta uno de los arcos más aclamados del manga de Gege Akutami.',
    malUrl: 'https://myanimelist.net/anime/51009',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen' },
      { name: 'Netflix', url: 'https://www.netflix.com/title/81278456' },
    ],
  },
  {
    title: 'Oshi no Ko',
    image: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg',
    studio: 'Doga Kobo',
    genre: ['Drama', 'Sobrenatural', 'Seinen'],
    premiereDate: '12 de abril, 2023',
    episodes: 11,
    type: 'TV',
    synopsis: 'Un ginecólogo y una idol. Dos almas renacen como los hijos de su estrella favorita. Una historia sobre el lado oscuro del entretenimiento japonés que rompió récords en su estreno.',
    malUrl: 'https://myanimelist.net/anime/52034',
    streaming: [
      { name: 'HIDIVE', url: 'https://www.hidive.com/tv/oshi-no-ko' },
      { name: 'Netflix', url: 'https://www.netflix.com/title/81677910' },
    ],
  },
  {
    title: 'Spy x Family',
    image: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
    studio: 'WIT Studio / CloverWorks',
    genre: ['Comedia', 'Acción', 'Slice of Life'],
    premiereDate: '9 de abril, 2022',
    episodes: 25,
    type: 'TV',
    synopsis: 'Un espía, una asesina y una telépata fingen ser una familia por una misión secreta. Lo que empieza como una fachada se convierte en una de las familias más queridas del anime.',
    malUrl: 'https://myanimelist.net/anime/50265',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/G4PH0WXVJ/spy-x-family' },
      { name: 'Netflix', url: 'https://www.netflix.com/title/81512274' },
    ],
  },
  {
    title: 'Mushoku Tensei',
    image: 'https://cdn.myanimelist.net/images/anime/1530/117776l.jpg',
    studio: 'Studio Bind',
    genre: ['Aventura', 'Drama', 'Fantasía', 'Isekai'],
    premiereDate: '11 de enero, 2021',
    episodes: 23,
    type: 'TV',
    synopsis: 'El padre del isekai moderno. Un hombre de 34 años renace en un mundo de espada y magia decidido a vivir sin arrepentimientos. La animación y narrativa que redefinieron el género.',
    malUrl: 'https://myanimelist.net/anime/39535',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/G24H1N8MP/mushoku-tensei-jobless-reincarnation' },
    ],
  },
  {
    title: 'Dandadan',
    image: 'https://cdn.myanimelist.net/images/anime/1584/143719l.jpg',
    studio: 'Science SARU',
    genre: ['Acción', 'Sobrenatural', 'Comedia', 'Romance'],
    premiereDate: '4 de octubre, 2024',
    episodes: 12,
    type: 'TV',
    synopsis: '¿Crees en los ovnis? ¿Y en los fantasmas? Dos adolescentes con creencias opuestas unen fuerzas para enfrentar amenazas sobrenaturales en una de las series más frescas y visualmente impactantes del año.',
    malUrl: 'https://myanimelist.net/anime/57334',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/G5PHNM7J2/dandadan' },
      { name: 'Netflix', url: 'https://www.netflix.com/title/81736884' },
    ],
  },
  {
    title: 'Chainsaw Man',
    image: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
    studio: 'MAPPA',
    genre: ['Acción', 'Sobrenatural', 'Shonen'],
    premiereDate: '12 de octubre, 2022',
    episodes: 12,
    type: 'TV',
    synopsis: 'Denji se fusiona con Pochita, el demonio de la motosierra, y es reclutado por una organización gubernamental para cazar demonios. Violenta, emotiva y visualmente impresionante.',
    malUrl: 'https://myanimelist.net/anime/44511',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GVDHX8QNW/chainsaw-man' },
      { name: 'Amazon Prime Video', url: 'https://www.primevideo.com/detail/Chainsaw-Man/0QXK7Y7MUH6KVMHA8LMLY66UQJ' },
    ],
  },
  {
    title: 'Solo Leveling',
    image: 'https://cdn.myanimelist.net/images/anime/1801/142390l.jpg',
    studio: 'A-1 Pictures',
    genre: ['Acción', 'Fantasía', 'Aventura'],
    premiereDate: '7 de enero, 2024',
    episodes: 12,
    type: 'TV',
    synopsis: 'En un mundo donde aparecen portales a mazmorras, Sung Jin-Woo pasa de ser el cazador más débil al más fuerte gracias a un misterioso "Sistema". Acción pura con animación de primer nivel.',
    malUrl: 'https://myanimelist.net/anime/52299',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GDKHZEJ0K/solo-leveling' },
    ],
  },
  {
    title: 'Demon Slayer: Kimetsu no Yaiba',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    studio: 'Ufotable',
    genre: ['Acción', 'Sobrenatural', 'Histórico'],
    premiereDate: '6 de abril, 2019',
    episodes: 26,
    type: 'TV',
    synopsis: 'Tanjiro Kamado encuentra a su familia masacrada por demonios. Su hermana Nezuko ha sido transformada. Juntos emprenden un viaje para vengarse y encontrar una cura. La animación de Ufotable marcó una era.',
    malUrl: 'https://myanimelist.net/anime/38000',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba' },
      { name: 'Netflix', url: 'https://www.netflix.com/title/81091393' },
    ],
  },
  {
    title: 'Attack on Titan',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    studio: 'WIT Studio / MAPPA',
    genre: ['Acción', 'Drama', 'Militar', 'Fantasía oscura'],
    premiereDate: '7 de abril, 2013',
    episodes: 25,
    type: 'TV',
    synopsis: 'La humanidad vive dentro de murallas para protegerse de los Titanes. Cuando el Titán Colosal derriba la puerta, Eren Jaeger jura exterminarlos a todos. Una obra maestra que definió una generación.',
    malUrl: 'https://myanimelist.net/anime/16498',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GR751KNZY/attack-on-titan' },
      { name: 'Amazon Prime Video', url: 'https://www.primevideo.com/detail/Attack-on-Titan/0PHDVXQJHOKBU9GCXPPPUEG9XZ' },
    ],
  },
  {
    title: 'Frieren: Beyond Journey\'s End',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    studio: 'Madhouse',
    genre: ['Aventura', 'Drama', 'Fantasía'],
    premiereDate: '29 de septiembre, 2023',
    episodes: 28,
    type: 'TV',
    synopsis: 'Después de derrotar al Rey Demonio, la elfa Frieren emprende un viaje para entender a los humanos. El anime #1 en MyAnimeList. Una meditación sobre el tiempo, la amistad y lo que dejamos atrás.',
    malUrl: 'https://myanimelist.net/anime/52991',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GG5H5XQX4/frieren-beyond-journeys-end' },
    ],
  },
  {
    title: 'One Punch Man',
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
    studio: 'Madhouse / J.C.Staff',
    genre: ['Acción', 'Comedia', 'Parodia', 'Superhéroes'],
    premiereDate: '5 de octubre, 2015',
    episodes: 12,
    type: 'TV',
    synopsis: 'Saitama es un héroe tan poderoso que derrota a cualquier enemigo de un solo golpe. Pero la vida del héroe más fuerte del mundo es sorprendentemente aburrida. Sátira brillante del género de superhéroes.',
    malUrl: 'https://myanimelist.net/anime/30276',
    streaming: [
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/G63K98PZ6/one-punch-man' },
      { name: 'Netflix', url: 'https://www.netflix.com/title/80117291' },
    ],
  },
  {
    title: 'Cyberpunk: Edgerunners',
    image: 'https://cdn.myanimelist.net/images/anime/1818/126435l.jpg',
    studio: 'Trigger',
    genre: ['Cyberpunk', 'Acción', 'Drama', 'Sci-Fi'],
    premiereDate: '13 de septiembre, 2022',
    episodes: 10,
    type: 'ONA',
    synopsis: 'David Martinez sobrevive en las calles de Night City con un implante militar experimental. Una historia desgarradora sobre hasta dónde llegarías por un sueño en un mundo que te devora.',
    malUrl: 'https://myanimelist.net/anime/42310',
    streaming: [
      { name: 'Netflix', url: 'https://www.netflix.com/title/81054853' },
    ],
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
            title="Estrenos de Anime"
            subtitle="Fechas reales de estreno, sinopsis y dónde ver cada anime en streaming"
            icon="🆕"
          />

          {/* Filter info */}
          <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
            Mostrando los animes más populares con sus fechas originales de estreno en Japón. 
            Haz clic en cualquier tarjeta para ver más información en MyAnimeList.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ESTRENOS.map((anime, i) => (
              <a
                key={anime.title}
                href={anime.malUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--color-primary)]/40 transition-all hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 animate-fade-in-up block"
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
                  {/* Episodes badge */}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[0.65rem] font-bold bg-black/70 text-white backdrop-blur-sm">
                    {anime.episodes} eps
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Studio + Date */}
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

                  {/* Streaming platforms */}
                  <div className="pt-3 border-t border-[var(--color-border)]">
                    <p className="text-[0.65rem] text-[var(--color-text-tertiary)] mb-2 uppercase tracking-wider font-semibold">
                      Disponible en:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {anime.streaming.map((s) => (
                        <span
                          key={s.name}
                          className="px-2 py-0.5 rounded-md text-[0.6rem] font-semibold bg-[var(--color-accent)]/10 text-[var(--color-accent-light)] border border-[var(--color-accent)]/20"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-xs text-[var(--color-text-tertiary)] mt-8 text-center">
            Las fechas corresponden al estreno original en Japón. La disponibilidad en plataformas de streaming puede variar según la región.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
