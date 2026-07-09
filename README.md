# Walking The World Anime 🌍

Portal premium de noticias, estrenos, rankings y curiosidades del anime en español.

## 🚀 Deploy

**[walking-the-world-anime.vercel.app](https://walking-the-world-anime.vercel.app)** (desplegado automáticamente desde `main`)

## 📊 Estructura Final

| Página | Ruta | Tipo | Actualización |
|--------|------|------|---------------|
| Home | `/` | ISR | 30 min |
| Noticias | `/noticias` | ISR | 1 hora |
| Artículo | `/noticias/[slug]` | ISR | 1 hora |
| Estrenos | `/estrenos` | Static | — |
| Rankings | `/rankings` | Static | — |
| Curiosidades | `/curiosidades` | Static | — |
| Ofertas | `/ofertas` | Static | — |
| Buscar | `/buscar` | Static | — |
| Acerca de | `/acerca-de` | Static | — |

## 🛠️ Desarrollo Local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Build de producción
```

## 📡 Fuentes de Noticias (RSS)

El sitio consume noticias reales de 6 fuentes vía ISR cada hora:

| Fuente | Idioma |
|--------|--------|
| Anime News Network | 🇬🇧 |
| Crunchyroll News | 🇬🇧 |
| SomosKudasai | 🇪🇸 |
| Ramen Para Dos | 🇪🇸 |
| Anmo Sugoi | 🇪🇸 |
| Anime Corner | 🇬🇧 |

## 🎨 Diseño

- **Colores**: Rojo `#DC2626` + Negro `#050508` + Azul `#3B82F6`
- **Tipografía**: Outfit (display) + Inter (body)
- **Dark Mode** por defecto con toggle light/dark

## 💰 Monetización

- 3 espacios Google AdSense reservados (banner, sidebar, in-content)
- Sección de afiliados con disclaimer legal
- Página /ofertas preparada para Shopify Storefront API

## 📝 Licencia

© 2026 Walking The World Anime.
