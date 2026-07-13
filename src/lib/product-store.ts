// ============================================
// 💾 Product Store — Cache en JSON + Sync desde AliExpress API
// ============================================
import fs from 'fs';
import path from 'path';
import type { AliExpressProduct } from '@/lib/aliexpress';
import { searchProducts } from '@/lib/aliexpress';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CONFIG,
  type ProductCategory,
} from '@/lib/product-categories';

const DATA_DIR = path.join(process.cwd(), 'data', 'products');

// Asegurar que el directorio existe
function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ============================================
// LECTURA / ESCRITURA DE CACHE
// ============================================
interface CacheEntry {
  products: AliExpressProduct[];
  updatedAt: string;
  category: string;
}

function readCache(slug: string): CacheEntry | null {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

function writeCache(slug: string, products: AliExpressProduct[]): void {
  ensureDataDir();
  const entry: CacheEntry = {
    products,
    updatedAt: new Date().toISOString(),
    category: slug,
  };
  fs.writeFileSync(
    path.join(DATA_DIR, `${slug}.json`),
    JSON.stringify(entry, null, 2),
    'utf-8'
  );
}

function isCacheValid(slug: string): boolean {
  const cache = readCache(slug);
  if (!cache) return false;
  const age = Date.now() - new Date(cache.updatedAt).getTime();
  return age < PRODUCT_CONFIG.cacheTTL;
}

// ============================================
// OBTENER PRODUCTOS (con caché)
// ============================================
export async function getProductsByCategory(
  slug: string,
  forceRefresh = false
): Promise<AliExpressProduct[]> {
  // Retornar caché si es válida
  if (!forceRefresh && isCacheValid(slug)) {
    const cache = readCache(slug);
    if (cache) return cache.products.slice(0, PRODUCT_CONFIG.productsPerCategory);
  }

  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return [];

  // Buscar desde la API
  try {
    const products = await searchProducts(category.searchQuery, {
      maxPrice: PRODUCT_CONFIG.maxPrice,
      pageSize: PRODUCT_CONFIG.apiPageSize,
      sort: 'volume_desc',
    });

    if (products.length > 0) {
      writeCache(slug, products);
    } else {
      // Si la API falla, usar caché anterior si existe
      const oldCache = readCache(slug);
      if (oldCache) return oldCache.products.slice(0, PRODUCT_CONFIG.productsPerCategory);
    }

    return products.slice(0, PRODUCT_CONFIG.productsPerCategory);
  } catch (error) {
    console.error(`Error fetching products for ${slug}:`, error);
    // Fallback al caché
    const oldCache = readCache(slug);
    return oldCache
      ? oldCache.products.slice(0, PRODUCT_CONFIG.productsPerCategory)
      : [];
  }
}

// ============================================
// OBTENER LOS MÁS VENDIDOS (todas las categorías)
// ============================================
export async function getTopSellingProducts(
  limit = 12
): Promise<AliExpressProduct[]> {
  const allProducts: (AliExpressProduct & { categorySlug: string })[] = [];

  for (const cat of PRODUCT_CATEGORIES) {
    const products = await getProductsByCategory(cat.slug);
    products.forEach((p) => {
      allProducts.push({ ...p, categorySlug: cat.slug });
    });
  }

  // Ordenar por ventas descendente
  return allProducts
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, limit);
}

// ============================================
// SINCRONIZAR TODAS LAS CATEGORÍAS
// ============================================
export async function syncAllCategories(): Promise<{
  success: string[];
  failed: string[];
}> {
  const result = { success: [] as string[], failed: [] as string[] };

  for (const cat of PRODUCT_CATEGORIES) {
    try {
      const products = await searchProducts(cat.searchQuery, {
        maxPrice: PRODUCT_CONFIG.maxPrice,
        pageSize: PRODUCT_CONFIG.apiPageSize,
        sort: 'volume_desc',
      });
      if (products.length > 0) {
        writeCache(cat.slug, products);
        result.success.push(cat.slug);
      } else {
        result.failed.push(cat.slug);
      }
    } catch (error) {
      console.error(`Sync failed for ${cat.slug}:`, error);
      result.failed.push(cat.slug);
    }
  }

  return result;
}

// ============================================
// OBTENER METADATOS DE CACHE
// ============================================
export function getCacheMetadata(): Record<
  string,
  { count: number; updatedAt: string }
> {
  ensureDataDir();
  const meta: Record<string, { count: number; updatedAt: string }> = {};

  for (const cat of PRODUCT_CATEGORIES) {
    const cache = readCache(cat.slug);
    meta[cat.slug] = {
      count: cache?.products.length || 0,
      updatedAt: cache?.updatedAt || 'Nunca',
    };
  }

  return meta;
}
