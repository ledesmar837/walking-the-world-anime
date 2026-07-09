# Walking The World Anime — Documento de Arquitectura

> **Versión:** 1.0.0  
> **Fecha:** Julio 2026  
> **Estado:** Esperando aprobación del cliente  
> **Stack:** Next.js 15 · React 18 · Tailwind CSS v4 · TypeScript · MDX · Vercel

---

## 📋 Índice

1. [Análisis de Referencia](#1-análisis-de-referencia)
2. [Identidad Visual y Diseño](#2-identidad-visual-y-diseño)
3. [Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
4. [Estructura de Carpetas](#4-estructura-de-carpetas)
5. [Design System](#5-design-system)
6. [Componentes Reutilizables](#6-componentes-reutilizables)
7. [Sistema de Contenido (MDX)](#7-sistema-de-contenido-mdx)
8. [SEO y Core Web Vitals](#8-seo-y-core-web-vitals)
9. [Monetización](#9-monetización)
10. [Plan de Escalabilidad](#10-plan-de-escalabilidad)
11. [Plan de Implementación](#11-plan-de-implementación)

---

## 1. Análisis de Referencia

### 1.1 SomosKudasai — Lo que aprendimos

**Arquitectura de navegación:**
- Navbar principal: Inicio · Anime · Cultura Otaku · Japón · Live-Action · Manga
- Sidebar: Redes sociales (WhatsApp/Telegram/Discord) · Ads · Categorías · Populares de la semana
- Footer: Términos · Webmasters

**Estructura de homepage:**
1. **Hero Carousel** — 4 artículos destacados con imagen grande, categoría, título, extracto, comentarios, fecha, autor
2. **"Populares del mes"** — Carrusel horizontal de tarjetas medianas
3. **Main Content** — Feed cronológico "Últimas Noticias" con tarjetas estándar
4. **Sidebar** — Widgets sociales, ads, categorías, populares
5. **Footer** — Links legales

**Tarjeta de artículo:** Imagen · Badge de categoría · Título (h2/h3) · Extracto · Metadata (comentarios, fecha, autor)

### 1.2 Lo que NO copiaremos

- Diseño visual genérico de portal de noticias tradicional
- Sidebar sobrecargado que compite con el contenido
- Tipografía y paleta de colores básica
- Falta de identidad de marca fuerte
- Experiencia mobile secundaria

### 1.3 Lo que SÍ adaptaremos (patrones)

- **Hero carousel** como escaparate principal (pero con diseño inmersivo)
- **Categorización por badges** en cada tarjeta
- **Feed cronológico** para noticias
- **Sidebar utilitario** (mejorado, no copiado)
- **Secciones de "popular"** con lógica de engagement

---

## 2. Identidad Visual y Diseño

### 2.1 Inspiración de Referencia

| Portal | Lo que tomamos |
|--------|---------------|
| **Crunchyroll** | Hero inmersivo, gradientes naranja/naranja-oscuro, tipografía bold, sensación cinematográfica |
| **MyAnimeList** | Sistema de puntuación, diseño denso pero legible, dark mode nativo |
| **Anime Corner** | Layout limpio, jerarquía visual clara, espaciado generoso |

### 2.2 Identidad Propia — "Walking The World Anime"

**Concepto:** Un viaje visual a través del mundo del anime. La marca evoca descubrimiento, aventura y calidad premium.

**Paleta de colores (Dark Mode por defecto):**

```
┌─────────────────────────────────────────────────────────────┐
│  BACKGROUND       SURFACE          PRIMARY        ACCENT    │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌───────┐ │
│  │ #0A0A0F  │    │ #13131A  │    │ #FF6B35  │    │#00D4AA │ │
│  │ noir     │    │ charcoal │    │ fire     │    │ mint   │ │
│  └──────────┘    └──────────┘    └──────────┘    └───────┘ │
│                                                             │
│  TEXT PRIMARY     TEXT SECONDARY   BORDER        GRADIENT   │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ #F1F5F9  │    │ #94A3B8  │    │#1E1E2E  │  #FF6B35 →   │
│  │ slate100 │    │ slate400 │    │ subtle   │  #FF8C42     │
│  └──────────┘    └──────────┘    └──────────┘              │
└─────────────────────────────────────────────────────────────┘
```

**Tipografía:**
- **Display/Títulos:** `var(--font-display)` → Inter Tight (Google Fonts) — bold, condensado para headers
- **Body:** `var(--font-body)` → Inter (Google Fonts) — legible, moderno
- **Mono (código/datos):** JetBrains Mono para snippets y badges técnicos

**Elementos visuales clave:**
- Gradientes animados en hover states
- Glassmorphism sutil en navbar (backdrop-blur)
- Bordes redondeados generosos (12px-16px en tarjetas)
- Sombras suaves con color primario en baja opacidad
- Micro-interacciones con Framer Motion
- Líneas decorativas inspiradas en trazos de pincel japonés (sutil)

---

## 3. Arquitectura del Proyecto

### 3.1 Patrón Arquitectónico

```
┌──────────────────────────────────────────────────────────────┐
│                    CLIENTE (Navegador)                        │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              Next.js App Router                       │    │
│  │  ┌─────────┐  ┌──────────┐  ┌───────────────────┐   │    │
│  │  │ Layouts │  │  Pages   │  │ Dynamic Imports   │   │    │
│  │  │ (RSC)   │  │ (SSG/ISR)│  │ (Client Components)│   │    │
│  │  └─────────┘  └──────────┘  └───────────────────┘   │    │
│  └──────────────────────────────────────────────────────┘    │
│                            │                                  │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              Fuentes de Datos                         │    │
│  │  ┌─────────┐  ┌──────────┐  ┌───────────────────┐   │    │
│  │  │  MDX    │  │  JSON    │  │  APIs Externas    │   │    │
│  │  │(artículos)│ │(config) │  │  (futuro Shopify) │   │    │
│  │  └─────────┘  └──────────┘  └───────────────────┘   │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

**Principios:**
- **Static Site Generation (SSG)** para todas las páginas de contenido → rendimiento máximo
- **Incremental Static Regeneration (ISR)** para páginas que cambian frecuentemente → fresco sin rebuild
- **Client Components** solo donde es necesario interactividad → mínimo JavaScript
- **Zero API routes** en fase inicial → todo pre-renderizado

### 3.2 Flujo de Navegación

```
Home (/)
├── Hero Carousel (4 destacados)
├── Sección: Últimas Noticias (paginado)
├── Sección: Estrenos de Temporada
├── Sección: Rankings
├── Sección: Curiosidades
├── Sidebar: Populares · Categorías · Tags
└── Footer: Links · Newsletter · Social

Noticias (/noticias)
├── Listado paginado con filtros por categoría
└── Sidebar

Artículo (/noticias/[slug])
├── Hero image
├── Breadcrumbs
├── Contenido MDX
├── Metadata (autor, fecha, tags, categoría)
├── Sección de Afiliados (espacio reservado)
├── Artículos Relacionados
└── Sección de Comentarios (futuro)

Estrenos (/estrenos)
├── Calendario visual de temporada
├── Filtros: Año · Temporada · Día
└── Grid de anime con sinopsis

Rankings (/rankings)
├── Top 10 semanal/mensual
├── Sistema de puntuación visual
└── Filtros por categoría

Curiosidades (/curiosidades)
├── Artículos en formato magazine
└── Grid destacado

Guías (/guias)
├── Listado de guías por juego/temática
└── formato paso a paso

Reseñas (/resenas)
├── Sistema de puntuación
├── Grid con rating visual
└── Filtros por puntuación

Personajes (/personajes)
├── Galería/Browser de personajes
└── Fichas detalladas

Wallpapers (/wallpapers)
├── Galería con filtros (resolución, serie)
└── Descarga directa

Ofertas Anime (/ofertas)
├── Grid de productos afiliados
└── Preparado para Shopify

Buscar (/buscar)
├── Búsqueda full-text
└── Resultados con filtros

Acerca de (/acerca-de)
├── Misión, equipo, contacto
└── Formulario de contacto
```

---

## 4. Estructura de Carpetas

```
walking-the-world-anime/
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── logo-white.svg
│   │   ├── og-default.jpg          # Open Graph default
│   │   └── placeholder.jpg
│   ├── fonts/
│   │   └── (font files si no se usan Google Fonts)
│   └── favicon/
│       ├── favicon.ico
│       ├── apple-touch-icon.png
│       └── site.webmanifest
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout (metadata global)
│   │   ├── page.tsx                 # Home page
│   │   ├── not-found.tsx            # 404 personalizada
│   │   ├── error.tsx                # Error boundary global
│   │   ├── loading.tsx              # Loading skeleton global
│   │   ├── sitemap.ts               # Sitemap dinámico
│   │   ├── robots.ts                # Robots.txt
│   │   │
│   │   ├── noticias/
│   │   │   ├── page.tsx             # Listado de noticias
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Artículo individual
│   │   │
│   │   ├── estrenos/
│   │   │   └── page.tsx
│   │   │
│   │   ├── rankings/
│   │   │   └── page.tsx
│   │   │
│   │   ├── curiosidades/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   │
│   │   ├── guias/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   │
│   │   ├── resenas/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   │
│   │   ├── personajes/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   │
│   │   ├── wallpapers/
│   │   │   └── page.tsx
│   │   │
│   │   ├── ofertas/
│   │   │   └── page.tsx
│   │   │
│   │   ├── buscar/
│   │   │   └── page.tsx
│   │   │
│   │   └── acerca-de/
│   │       └── page.tsx
│   │
│   ├── components/                  # Componentes React
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── ThemeToggle.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroCarousel.tsx
│   │   │   ├── HeroSlide.tsx
│   │   │   ├── LatestNews.tsx
│   │   │   ├── SeasonPremieres.tsx
│   │   │   ├── RankingsPreview.tsx
│   │   │   └── CuriositiesGrid.tsx
│   │   │
│   │   ├── article/
│   │   │   ├── ArticleCard.tsx      # Tarjeta estándar
│   │   │   ├── ArticleCardFeatured.tsx  # Tarjeta destacada (hero)
│   │   │   ├── ArticleCardHorizontal.tsx # Horizontal (sidebar)
│   │   │   ├── ArticleContent.tsx   # Render MDX
│   │   │   ├── ArticleHeader.tsx    # Hero del artículo
│   │   │   ├── ArticleMeta.tsx      # Autor, fecha, tags
│   │   │   ├── RelatedArticles.tsx
│   │   │   ├── TagBadge.tsx
│   │   │   └── CategoryBadge.tsx
│   │   │
│   │   ├── ui/                      # Primitivas reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── ScrollToTop.tsx
│   │   │
│   │   ├── ads/
│   │   │   ├── AdBanner.tsx         # Banner horizontal
│   │   │   ├── AdSidebar.tsx        # Bloque vertical
│   │   │   └── AdInContent.tsx      # In-article
│   │   │
│   │   ├── affiliate/
│   │   │   ├── AffiliateCard.tsx    # Tarjeta de producto afiliado
│   │   │   └── AffiliateSection.tsx # Bloque multi-producto
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   └── SearchModal.tsx
│   │   │
│   │   └── seo/
│   │       ├── JsonLd.tsx           # Structured data
│   │       └── OpenGraph.tsx
│   │
│   ├── content/                     # Datos y artículos
│   │   ├── articles/
│   │   │   ├── noticias/
│   │   │   │   └── *.mdx
│   │   │   ├── curiosidades/
│   │   │   │   └── *.mdx
│   │   │   ├── guias/
│   │   │   │   └── *.mdx
│   │   │   └── resenas/
│   │   │       └── *.mdx
│   │   │
│   │   ├── config/
│   │   │   ├── site.ts              # Config global del sitio
│   │   │   ├── navigation.ts        # Estructura de navegación
│   │   │   ├── categories.ts        # Categorías + metadata
│   │   │   └── ads.ts              # Config de espacios publicitarios
│   │   │
│   │   └── data/
│   │       ├── rankings.json        # Rankings (actualizable vía ISR)
│   │       ├── estrenos.json        # Calendario de estrenos
│   │       ├── personajes.json      # Base de personajes
│   │       └── wallpapers.json      # Índice de wallpapers
│   │
│   ├── lib/                         # Utilidades
│   │   ├── mdx.ts                   # Configuración MDX + plugins
│   │   ├── articles.ts             # Carga y parseo de artículos
│   │   ├── seo.ts                   # Helpers SEO (meta, JSON-LD)
│   │   ├── constants.ts             # Constantes globales
│   │   ├── utils.ts                 # Utilidades generales
│   │   └── types.ts                 # Tipos TypeScript
│   │
│   └── styles/
│       ├── globals.css              # Tailwind + CSS variables + tema
│       └── mdx.css                  # Estilos para contenido MDX
│
├── next.config.ts
├── tailwind.config.ts               # (Tailwind v4 usa CSS, no JS config)
├── tsconfig.json
├── package.json
├── postcss.config.mjs
├── .eslintrc.json
├── .prettierrc
├── vercel.json
├── README.md
└── ARCHITECTURE.md                  # Este documento
```

---

## 5. Design System

### 5.1 Tokens de Diseño (CSS Variables)

```css
:root, .light {
  /* === SURFACES === */
  --color-bg:            #FAFAFA;
  --color-bg-secondary:  #FFFFFF;
  --color-surface:       #FFFFFF;
  --color-surface-hover: #F1F5F9;
  --color-surface-raised:#FFFFFF;

  /* === TEXT === */
  --color-text-primary:    #0F172A;
  --color-text-secondary:  #475569;
  --color-text-tertiary:   #94A3B8;

  /* === BRAND === */
  --color-primary:         #FF6B35;
  --color-primary-light:   #FF8C42;
  --color-primary-dark:    #E55A2B;
  --color-accent:          #00D4AA;
  --color-accent-light:    #00F5C0;

  /* === BORDERS === */
  --color-border:          #E2E8F0;
  --color-border-light:    #F1F5F9;

  /* === SHADOWS === */
  --shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:  0 4px 6px -1px rgba(0,0,0,0.07);
  --shadow-lg:  0 10px 25px -5px rgba(0,0,0,0.1);
  --shadow-xl:  0 20px 50px -12px rgba(0,0,0,0.15);

  /* === RADIUS === */
  --radius-sm:  8px;
  --radius-md:  12px;
  --radius-lg:  16px;
  --radius-xl:  24px;

  /* === TIPOGRAPHY === */
  --font-display: 'Inter Tight', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}

.dark {
  --color-bg:            #0A0A0F;
  --color-bg-secondary:  #0F0F17;
  --color-surface:       #13131A;
  --color-surface-hover: #1A1A24;
  --color-surface-raised:#1E1E2E;

  --color-text-primary:    #F1F5F9;
  --color-text-secondary:  #94A3B8;
  --color-text-tertiary:   #64748B;

  --color-primary:         #FF6B35;
  --color-primary-light:   #FF8C42;
  --color-primary-dark:    #E55A2B;
  --color-accent:          #00D4AA;

  --color-border:          #1E1E2E;
  --color-border-light:    #2A2A3A;

  --shadow-sm:  0 1px 2px rgba(0,0,0,0.3);
  --shadow-md:  0 4px 6px -1px rgba(0,0,0,0.4);
  --shadow-lg:  0 10px 25px -5px rgba(0,0,0,0.5);
  --shadow-xl:  0 20px 50px -12px rgba(0,0,0,0.6);
}
```

### 5.2 Escala Tipográfica

| Token | Tamaño | Weight | Line Height | Uso |
|-------|--------|--------|-------------|-----|
| `text-display-xl` | 3.5rem (56px) | 800 | 1.1 | Hero title |
| `text-display-lg` | 2.5rem (40px) | 700 | 1.15 | Page headers |
| `text-display-md` | 2rem (32px) | 700 | 1.2 | Section titles |
| `text-heading-lg` | 1.5rem (24px) | 600 | 1.3 | Card titles |
| `text-heading-md` | 1.25rem (20px) | 600 | 1.35 | Sub-headings |
| `text-heading-sm` | 1.125rem (18px) | 600 | 1.4 | List item titles |
| `text-body-lg` | 1.125rem (18px) | 400 | 1.7 | Article body |
| `text-body-md` | 1rem (16px) | 400 | 1.6 | Paragraphs |
| `text-body-sm` | 0.875rem (14px) | 400 | 1.5 | Meta, captions |
| `text-caption` | 0.75rem (12px) | 500 | 1.4 | Badges, labels |

### 5.3 Espaciado (sistema 4px)

- `space-xs`: 4px
- `space-sm`: 8px
- `space-md`: 16px
- `space-lg`: 24px
- `space-xl`: 32px
- `space-2xl`: 48px
- `space-3xl`: 64px
- `space-4xl`: 96px

### 5.4 Breakpoints

| Breakpoint | Width | Target |
|-----------|-------|--------|
| `xs` | 375px | Mobile small |
| `sm` | 640px | Mobile large |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop wide |
| `2xl` | 1536px | Desktop ultra-wide |

---

## 6. Componentes Reutilizables

### 6.1 Jerarquía de Componentes

```
┌─────────────────────────────────────────────────────────┐
│                     ROOT LAYOUT                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │                    NAVBAR                          │  │
│  │  Logo · NavLinks · Search · ThemeToggle · Mobile  │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │                  BREADCRUMBS                       │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌──────────────┬────────────────────────────────────┐  │
│  │              │          PAGE CONTENT              │  │
│  │   SIDEBAR    │  ┌──────────────────────────────┐  │  │
│  │              │  │   HERO / HEADER               │  │  │
│  │  · Populares │  └──────────────────────────────┘  │  │
│  │  · Categorías│  ┌──────────────────────────────┐  │  │
│  │  · Tags      │  │   CONTENT GRID / FEED        │  │  │
│  │  · Ads       │  │   ArticleCard · ArticleCard  │  │  │
│  │  · Social    │  │   ArticleCard · ArticleCard  │  │  │
│  │              │  └──────────────────────────────┘  │  │
│  │              │  ┌──────────────────────────────┐  │  │
│  │              │  │   PAGINATION                  │  │  │
│  │              │  └──────────────────────────────┘  │  │
│  └──────────────┴────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │                    FOOTER                          │  │
│  │  Brand · Nav · Social · Newsletter · Legal        │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Catálogo de Componentes

#### Layout Components
| Componente | Props | Estado |
|-----------|-------|--------|
| `Navbar` | — | Client (sticky, scroll-aware) |
| `MobileMenu` | `isOpen`, `onClose` | Client |
| `Footer` | — | Server |
| `Sidebar` | `articles`, `categories`, `tags` | Server/Client |
| `Breadcrumbs` | `items: {label, href}[]` | Server |
| `ThemeToggle` | — | Client (localStorage) |

#### Home Page Components
| Componente | Props | Estado |
|-----------|-------|--------|
| `HeroCarousel` | `slides: HeroSlide[]` | Client (autoplay) |
| `HeroSlide` | `article: Article` | Client |
| `LatestNews` | `articles: Article[]` | Server |
| `SeasonPremieres` | `animes: Anime[]` | Server |
| `RankingsPreview` | `rankings: Ranking[]` | Server |
| `CuriositiesGrid` | `articles: Article[]` | Server |

#### Article Components
| Componente | Props | Estado |
|-----------|-------|--------|
| `ArticleCard` | `article: Article`, `variant` | Server |
| `ArticleCardFeatured` | `article: Article` | Server |
| `ArticleCardHorizontal` | `article: Article` | Server |
| `ArticleContent` | `content: MDX` | Server |
| `ArticleHeader` | `article: Article` | Server |
| `ArticleMeta` | `date`, `author`, `category`, `tags` | Server |
| `RelatedArticles` | `articles: Article[]` | Server |
| `TagBadge` | `tag: string`, `href?: string` | Server |
| `CategoryBadge` | `category: string`, `href?: string` | Server |

#### UI Primitives
| Componente | Props | Estado |
|-----------|-------|--------|
| `Button` | `variant`, `size`, `children` | Server |
| `Card` | `padding`, `hover`, `children` | Server |
| `Badge` | `color`, `size`, `children` | Server |
| `Input` | `type`, `placeholder`, `icon` | Client |
| `Skeleton` | `width`, `height`, `variant` | Server |
| `Pagination` | `current`, `total`, `baseUrl` | Client |
| `SectionHeading` | `title`, `subtitle?`, `href?` | Server |
| `Divider` | `orientation`, `label?` | Server |
| `Tooltip` | `content`, `children` | Client |
| `ScrollToTop` | — | Client |

#### Ad Components
| Componente | Props | Estado |
|-----------|-------|--------|
| `AdBanner` | `slot`, `format` | Client |
| `AdSidebar` | `slot` | Client |
| `AdInContent` | `slot` | Client |

#### Affiliate Components
| Componente | Props | Estado |
|-----------|-------|--------|
| `AffiliateCard` | `product`, `link` | Client |
| `AffiliateSection` | `products[]`, `title` | Server |

#### Search Components
| Componente | Props | Estado |
|-----------|-------|--------|
| `SearchBar` | `onSearch` | Client |
| `SearchResults` | `results[]` | Client |
| `SearchModal` | `isOpen`, `onClose` | Client |

---

## 7. Sistema de Contenido (MDX)

### 7.1 Frontmatter de Artículo

```yaml
---
title: "Título del artículo"
slug: "titulo-del-articulo"
excerpt: "Extracto de 160 caracteres para SEO y tarjetas"
category: "noticias"       # noticias | curiosidades | guias | resenas
tags: ["anime", "temporada"]
author: "Nombre del Autor"
date: "2026-07-09"
lastModified: "2026-07-10"
image: "/images/articles/titulo.webp"
imageAlt: "Descripción alt de la imagen"
imageCredit: "Fuente de la imagen"
featured: true              # Aparece en hero
featuredOrder: 1            # Posición en hero
readingTime: 5              # Minutos de lectura
canonical: ""               # URL canónica si es cross-post
seo:
  metaTitle: ""             # Título SEO (si difiere del título)
  metaDescription: ""       # Meta description personalizada
  keywords: []
affiliateProducts:           # Productos afiliados relacionados
  - name: "Figura de Goku"
    link: "https://..."
    price: "$29.99"
    image: "/images/affiliates/goku-figure.webp"
---
```

### 7.2 Componentes MDX Personalizados

```tsx
// Componentes disponibles dentro de artículos MDX:
{
  h1: ArticleH1,
  h2: ArticleH2,
  h3: ArticleH3,
  p: ArticleParagraph,
  ul: ArticleList,
  ol: ArticleOrderedList,
  li: ArticleListItem,
  blockquote: ArticleBlockquote,
  code: ArticleCode,
  pre: ArticlePre,
  img: ArticleImage,         // Optimizado: next/image + lazy
  a: ArticleLink,            // target="_blank" + nofollow para externos
  table: ArticleTable,
  // Componentes custom:
  Callout,                   // Info/Warning/Tip boxes
  FigureWithCaption,         // Imagen con pie de foto
  VideoEmbed,                // YouTube/Niconico embeds
  CharacterCard,             // Ficha rápida de personaje
  AnimeInfoBox,              // Caja de datos de anime
  AffiliateInline,           // Producto afiliado inline
  AdInContent,              // Ad dentro del artículo
  RelatedContent,            // Link a otro artículo
  Spoiler,                   // Texto oculto con toggle
}
```

---

## 8. SEO y Core Web Vitals

### 8.1 Estrategia SEO

**On-page:**
- Meta titles únicos por página (55-65 caracteres)
- Meta descriptions persuasivas (150-160 caracteres)
- Heading hierarchy estricta (h1 → h2 → h3)
- Imágenes con alt text descriptivo + WebP/AVIF
- URLs limpias: `/noticias/titulo-del-articulo`
- Canonical tags para evitar duplicate content
- Open Graph + Twitter Cards completos

**Technical SEO:**
- Sitemap.xml dinámico con prioridades
- Robots.txt optimizado
- Schema.org JSON-LD estructurado:
  - `Article` para noticias/artículos
  - `BreadcrumbList` en todas las páginas
  - `WebSite` con SearchAction
  - `Person` para autores
  - `Organization` para la marca
- SSL forzado (Vercel lo maneja)
- HSTS headers

### 8.2 Core Web Vitals

| Métrica | Target | Estrategia |
|---------|--------|------------|
| **LCP** | < 2.5s | SSG + next/image + CDN + font preload |
| **FID** | < 100ms | Minimal JS, code splitting, no blocking scripts |
| **CLS** | < 0.1 | Dimensiones explícitas en imágenes, font-display:swap |
| **TTFB** | < 800ms | Vercel Edge Network |

**Técnicas:**
- `next/image` con `priority` en LCP image
- `loading="lazy"` en below-fold images
- `font-display: swap` para fuentes
- Code splitting automático con `dynamic(() => import(...))`
- Prefetch de páginas probables con `<Link>`
- CSS crítico inline (Next lo maneja)
- Ads cargados con `IntersectionObserver` (solo cuando son visibles)

---

## 9. Monetización

### 9.1 Google AdSense — Espacios Reservados

```
┌─────────────────────────────────────────────────────────┐
│  HOME PAGE                                              │
│  ┌───────────────────────────────────────────────────┐  │
│  │              AD BANNER (728x90 / responsive)      │  │
│  │              Debajo del hero, centrado            │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌──────────────┬────────────────────────────────────┐  │
│  │   CONTENT    │   SIDEBAR                         │  │
│  │              │   ┌────────────────────────────┐  │  │
│  │              │   │  AD SIDEBAR (300x250)      │  │  │
│  │              │   │  Primer bloque visible     │  │  │
│  │              │   └────────────────────────────┘  │  │
│  └──────────────┴────────────────────────────────────┘  │
│                                                         │
│  ARTICLE PAGE                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Contenido del artículo...                        │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  AD IN-CONTENT (responsive)                 │  │  │
│  │  │  Después del 3er párrafo                    │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                                                   │  │
│  │  ...continúa el contenido                        │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  AD IN-CONTENT (responsive)                 │  │  │
│  │  │  Después del 6to párrafo (si aplica)        │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 9.2 Afiliados — Espacios Reservados

**En artículo individual:**
- Sección "Productos Relacionados" al final del artículo (3-6 productos en grid)
- Callout inline "Consigue el manga aquí" dentro del contenido
- Sidebar widget "Ofertas Anime" con productos destacados

**Página de Ofertas Anime:**
- Grid completo de productos con filtros
- Preparado para consumir Shopify Storefront API en el futuro
- Por ahora: enlaces de afiliado directos (Amazon, CDJapan, AmiAmi)

### 9.3 Preparación Shopify (Futuro)

```typescript
// lib/shopify.ts — Preparado para integrar
// Cuando se active Shopify:
// 1. Descomentar import de @shopify/storefront-api-client
// 2. Configurar SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN
// 3. Activar páginas de producto SSR

export async function getProducts(options?: ProductOptions) {
  // Fase 1: Retornar productos estáticos desde JSON
  // Fase 2: Conectar a Shopify Storefront API
}

export async function getProduct(handle: string) {
  // Placeholder para producto individual
}
```

---

## 10. Plan de Escalabilidad

### 10.1 Fase 1 — MVP (Actual)
- ✅ Contenido estático vía MDX
- ✅ Todas las páginas pre-renderizadas (SSG)
- ✅ Diseño completo responsive
- ✅ SEO on-page completo
- ✅ Espacios publicitarios reservados
- ✅ Enlaces de afiliado estáticos
- ✅ Búsqueda client-side (Fuse.js)

### 10.2 Fase 2 — CMS + Datos (2-3 meses)
- 🔜 Headless CMS (Sanity / Contentlayer)
- 🔜 Panel de administración básico
- 🔜 API de rankings dinámica
- 🔜 Calendario de estrenos actualizable
- 🔜 Newsletter (Resend / ConvertKit)

### 10.3 Fase 3 — Comunidad (4-6 meses)
- 🔜 Sistema de comentarios (Giscus / Disqus)
- 🔜 Cuentas de usuario (NextAuth / Clerk)
- 🔜 Favoritos / Watchlist
- 🔜 Sistema de valoración de artículos

### 10.4 Fase 4 — E-commerce (6-12 meses)
- 🔜 Integración Shopify Storefront API
- 🔜 Carrito de compras
- 🔜 Páginas de producto con SEO
- 🔜 Checkout headless

---

## 11. Plan de Implementación

### FASE 1: Fundación del Proyecto (Día 1-2)

| # | Tarea | Archivos |
|---|-------|----------|
| 1.1 | Scaffolding Next.js 15 + TypeScript + Tailwind v4 | `package.json`, `tsconfig.json`, `next.config.ts` |
| 1.2 | Configurar CSS variables + tema dark/light | `src/styles/globals.css` |
| 1.3 | Layout raíz con metadata global | `src/app/layout.tsx` |
| 1.4 | Tipos TypeScript base | `src/lib/types.ts` |
| 1.5 | Constantes y configuración del sitio | `src/content/config/site.ts` |
| 1.6 | Fuentes (Inter + Inter Tight) | `src/app/layout.tsx` |

### FASE 2: Componentes de Layout (Día 2-3)

| # | Tarea | Archivos |
|---|-------|----------|
| 2.1 | Navbar profesional con scroll-awareness | `src/components/layout/Navbar.tsx` |
| 2.2 | Mobile menu animado | `src/components/layout/MobileMenu.tsx` |
| 2.3 | Theme toggle con persistencia | `src/components/layout/ThemeToggle.tsx` |
| 2.4 | Footer completo | `src/components/layout/Footer.tsx` |
| 2.5 | Breadcrumbs | `src/components/layout/Breadcrumbs.tsx` |
| 2.6 | Sidebar con widgets | `src/components/layout/Sidebar.tsx` |

### FASE 3: UI Primitives (Día 3)

| # | Tarea | Archivos |
|---|-------|----------|
| 3.1 | Button (variantes: primary, secondary, ghost) | `src/components/ui/Button.tsx` |
| 3.2 | Card + Card variants | `src/components/ui/Card.tsx` |
| 3.3 | Badge + TagBadge + CategoryBadge | Varios en `ui/` |
| 3.4 | Input + SearchBar | `src/components/ui/Input.tsx` |
| 3.5 | Skeleton loaders | `src/components/ui/Skeleton.tsx` |
| 3.6 | Pagination | `src/components/ui/Pagination.tsx` |
| 3.7 | SectionHeading | `src/components/ui/SectionHeading.tsx` |

### FASE 4: Home Page (Día 3-4)

| # | Tarea | Archivos |
|---|-------|----------|
| 4.1 | HeroCarousel con Framer Motion | `src/components/home/HeroCarousel.tsx` |
| 4.2 | HeroSlide individual | `src/components/home/HeroSlide.tsx` |
| 4.3 | Sección LatestNews con grid | `src/components/home/LatestNews.tsx` |
| 4.4 | Sección SeasonPremieres | `src/components/home/SeasonPremieres.tsx` |
| 4.5 | Sección RankingsPreview | `src/components/home/RankingsPreview.tsx` |
| 4.6 | CuriositiesGrid | `src/components/home/CuriositiesGrid.tsx` |
| 4.7 | Ensamblar Home page | `src/app/page.tsx` |

### FASE 5: Sistema de Artículos (Día 4-5)

| # | Tarea | Archivos |
|---|-------|----------|
| 5.1 | Configurar MDX + plugins | `src/lib/mdx.ts`, `next.config.ts` |
| 5.2 | Utilidad de carga de artículos | `src/lib/articles.ts` |
| 5.3 | ArticleCard estándar | `src/components/article/ArticleCard.tsx` |
| 5.4 | ArticleCard featured | `src/components/article/ArticleCardFeatured.tsx` |
| 5.5 | ArticleCard horizontal | `src/components/article/ArticleCardHorizontal.tsx` |
| 5.6 | Página de listado `/noticias` | `src/app/noticias/page.tsx` |
| 5.7 | Página individual `/noticias/[slug]` | `src/app/noticias/[slug]/page.tsx` |
| 5.8 | MDX custom components | `src/components/article/ArticleContent.tsx` |
| 5.9 | ArticleHeader con breadcrumbs | `src/components/article/ArticleHeader.tsx` |
| 5.10 | RelatedArticles | `src/components/article/RelatedArticles.tsx` |

### FASE 6: SEO + Datos Estructurados (Día 5)

| # | Tarea | Archivos |
|---|-------|----------|
| 6.1 | JSON-LD components (Article, Breadcrumb, WebSite) | `src/components/seo/JsonLd.tsx` |
| 6.2 | Meta helpers | `src/lib/seo.ts` |
| 6.3 | Sitemap dinámico | `src/app/sitemap.ts` |
| 6.4 | Robots.txt | `src/app/robots.ts` |
| 6.5 | Open Graph images automáticas | `src/app/opengraph-image.tsx` |
| 6.6 | Security headers | `next.config.ts` |

### FASE 7: Páginas Secundarias (Día 5-6)

| # | Tarea | Archivos |
|---|-------|----------|
| 7.1 | Estrenos (calendario visual) | `src/app/estrenos/page.tsx` |
| 7.2 | Rankings | `src/app/rankings/page.tsx` |
| 7.3 | Curiosidades (listado + artículo) | `src/app/curiosidades/` |
| 7.4 | Guías (listado + artículo) | `src/app/guias/` |
| 7.5 | Reseñas (listado + artículo + rating) | `src/app/resenas/` |
| 7.6 | Personajes (galería + ficha) | `src/app/personajes/` |
| 7.7 | Wallpapers (galería con filtros) | `src/app/wallpapers/page.tsx` |
| 7.8 | Ofertas Anime | `src/app/ofertas/page.tsx` |
| 7.9 | Buscar | `src/app/buscar/page.tsx` |
| 7.10 | Acerca de | `src/app/acerca-de/page.tsx` |

### FASE 8: Monetización + Afiliados (Día 6)

| # | Tarea | Archivos |
|---|-------|----------|
| 8.1 | Ad components (banner, sidebar, in-content) | `src/components/ads/` |
| 8.2 | Affiliate components | `src/components/affiliate/` |
| 8.3 | Integrar ads en layout | Layout pages |
| 8.4 | Shopify placeholder setup | `src/lib/shopify.ts` |

### FASE 9: Polish + Performance (Día 7)

| # | Tarea | Archivos |
|---|-------|----------|
| 9.1 | Lighthouse audit + correcciones | — |
| 9.2 | Animaciones Framer Motion (page transitions) | Layout |
| 9.3 | 404 + Error pages personalizadas | `not-found.tsx`, `error.tsx` |
| 9.4 | Loading skeletons para todas las páginas | `loading.tsx` por ruta |
| 9.5 | Optimización de imágenes | Config |
| 9.6 | Scroll to top button | `src/components/ui/ScrollToTop.tsx` |

### FASE 10: Contenido Seed + Deploy (Día 7)

| # | Tarea | Archivos |
|---|-------|----------|
| 10.1 | Crear 10-15 artículos MDX de muestra | `src/content/articles/` |
| 10.2 | Datos de ejemplo (rankings, estrenos, personajes) | `src/content/data/` |
| 10.3 | Preparar README.md | `README.md` |
| 10.4 | Deploy a Vercel | — |
| 10.5 | Validación final (SEO, perf, responsive) | — |

---

## 📌 Notas Importantes

1. **Tailwind v4**: No usa `tailwind.config.js`. La configuración va en CSS con `@theme` y variables CSS.
2. **TypeScript**: Requiere `skipLibCheck: true` para evitar errores en Next.js 15 + React 19.
3. **Dark Mode default**: El sitio arranca en dark mode. El toggle permite cambiar a light.
4. **Sin backend**: Todo es estático pre-renderizado. Cero rutas de API en fase MVP.
5. **Framer Motion**: Solo en componentes interactivos (carousel, mobile menu, modales). No abusar.

---

## ✅ Criterios de Aceptación

- [ ] Home page con hero, noticias, estrenos, rankings, curiosidades
- [ ] Navegación completa con mobile menu
- [ ] Dark/Light mode funcional
- [ ] 12 páginas de contenido con datos de ejemplo
- [ ] Sistema MDX con componentes personalizados
- [ ] SEO: meta tags, JSON-LD, sitemap, robots.txt
- [ ] Espacios publicitarios reservados (no activos)
- [ ] Diseño responsive en todos los breakpoints
- [ ] Puntuación Lighthouse > 90 en Performance/SEO/Accessibility
- [ ] Deploy exitoso en Vercel
- [ ] README con instrucciones claras

---

*Documento preparado para revisión y aprobación del cliente.*
*Una vez aprobado, se procederá con la implementación siguiendo el plan de 10 fases.*
