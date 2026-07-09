# Walking The World Anime 🌍

Portal premium de noticias, estrenos, rankings y curiosidades del anime en español.

## 🚀 Tech Stack

- **Next.js 16** — App Router + ISR
- **React 19** — Server & Client Components
- **Tailwind CSS v4** — Utility-first CSS
- **TypeScript** — Tipado estricto
- **Framer Motion** — Animaciones
- **MDX** — Contenido enriquecido

## 📡 Fuentes de Noticias

El sitio se nutre de fuentes verificadas de noticias anime:

| Fuente | Idioma | Categoría |
|--------|--------|-----------|
| Anime News Network | 🇬🇧 EN | Noticias |
| Crunchyroll News | 🇬🇧 EN | Noticias |
| SomosKudasai | 🇪🇸 ES | Noticias |
| Ramen Para Dos | 🇪🇸 ES | Noticias |
| Anmo Sugoi | 🇪🇸 ES | Noticias |

Las noticias se actualizan cada hora vía ISR (Incremental Static Regeneration).

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start
```

## 📦 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Home (ISR 30min)
│   ├── layout.tsx          # Root layout + SEO
│   ├── noticias/           # Noticias (ISR 1h)
│   ├── estrenos/           # Calendario de estrenos
│   ├── rankings/           # Rankings
│   ├── curiosidades/       # Curiosidades
│   ├── guias/              # Guías
│   ├── resenas/            # Reseñas
│   ├── personajes/         # Personajes
│   ├── wallpapers/         # Wallpapers
│   ├── ofertas/            # Ofertas (afiliados)
│   ├── buscar/             # Buscador
│   ├── acerca-de/          # Acerca de
│   └── api/revalidate/     # Endpoint de revalidación
├── components/             # Componentes React
│   ├── layout/             # Navbar, Footer, Sidebar
│   ├── home/               # HeroCarousel
│   ├── article/            # ArticleCards
│   └── ui/                 # Button, Card, Badge...
├── lib/                    # Lógica
│   ├── rss.ts              # Parser RSS
│   ├── news-sources.ts     # Fuentes configuradas
│   ├── news-service.ts     # Servicio de noticias
│   ├── articles.ts         # Contenido local
│   └── types.ts            # Tipos TypeScript
├── content/                # Datos
│   ├── config/             # Configuración
│   └── data/               # Datos estáticos
└── styles/                 # CSS
```

## 🚀 Deploy en Vercel

1. Sube este repo a GitHub
2. Ve a [vercel.com/new](https://vercel.com/new)
3. Importa el repositorio
4. Vercel detecta Next.js automáticamente
5. Agrega la variable de entorno `REVALIDATE_SECRET` (un string secreto)
6. Haz clic en **Deploy**

### Variables de Entorno Requeridas en Vercel

| Variable | Descripción |
|----------|-------------|
| `REVALIDATE_SECRET` | Secreto para el endpoint de revalidación |

### Cron Job en Vercel

El `vercel.json` incluye un cron job que revalida las noticias cada hora:
```
0 * * * * → POST /api/revalidate
```

## 💰 Monetización

- **Google AdSense**: Espacios reservados (banner, sidebar, in-content)
- **Afiliados**: Secciones de productos en artículos y página /ofertas
- **Shopify**: Preparado para integrar Storefront API

Para activar AdSense, descomenta el script en `src/app/layout.tsx` y reemplaza el `publisherId`.

## 📝 Licencia

© 2026 Walking The World Anime. Todos los derechos reservados.
