// ============================================
// 💾 Product Store — Búsquedas múltiples + Bloques temáticos
// ============================================
import fs from 'fs';
import path from 'path';
import type { AliExpressProduct } from '@/lib/aliexpress';
import { searchProducts } from '@/lib/aliexpress';
import { PRODUCT_CATEGORIES, SHOP_BLOCKS, TOP_FEATURED_SLUGS, PRODUCT_CONFIG } from '@/lib/product-categories';

const DATA_DIR = path.join(process.cwd(), 'data', 'products');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface CacheEntry {
  products: Record<string, unknown>[];
  updatedAt: string;
  category: string;
}

function readCache(slug: string): CacheEntry | null {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as CacheEntry;
  } catch { return null; }
}

function writeCache(slug: string, products: AliExpressProduct[]): void {
  ensureDataDir();
  fs.writeFileSync(
    path.join(DATA_DIR, `${slug}.json`),
    JSON.stringify({ products, updatedAt: new Date().toISOString(), category: slug }, null, 2),
    'utf-8'
  );
}

function isCacheValid(slug: string): boolean {
  const cache = readCache(slug);
  if (!cache) return false;
  return Date.now() - new Date(cache.updatedAt).getTime() < PRODUCT_CONFIG.cacheTTL;
}
function normalizeProduct(raw: Record<string, unknown>): AliExpressProduct {
  return {
    productId: String(raw.product_id || raw.productId || ''),
    title: String(raw.product_title || raw.title || ''),
    imageUrl: String(raw.product_main_image_url || raw.imageUrl || ''),
    originalPrice: String(raw.original_price || raw.originalPrice || '0'),
    salePrice: String(raw.sale_price || raw.salePrice || '0'),
    discount: String(raw.discount || '0'),
    rating: String(raw.evaluate_rate || raw.rating || '0'),
    sales: Number(raw.lastest_volume || raw.sales) || 0,
    freeShipping: Boolean(raw.free_shipping || raw.freeShipping),
    commissionRate: raw.commission_rate || raw.commissionRate ? String(raw.commission_rate || raw.commissionRate) : undefined,
    productUrl: String(raw.product_detail_url || raw.productUrl || ''),
    promotionLink: String(raw.promotion_link || raw.promotionLink || raw.product_detail_url || raw.productUrl || ''),
  };
}

// Buscar con múltiples queries y combinar resultados
async function searchMultiQueries(queries: string[]): Promise<AliExpressProduct[]> {
  const all: AliExpressProduct[] = [];
  const seen = new Set<string>();
  for (const q of queries) {
    try {
      const products = await searchProducts(q, { pageSize: PRODUCT_CONFIG.apiPageSize, sort: 'volume_desc' });
      for (const p of products) {
        if (!seen.has(p.productId)) {
          seen.add(p.productId);
          all.push(p);
        }
      }
    } catch { /* continuar */ }
  }
  return all.sort((a, b) => (b.sales || 0) - (a.sales || 0));
}

export async function getProductsByCategory(slug: string, forceRefresh = false): Promise<AliExpressProduct[]> {
  const cache = readCache(slug);
  if (!cache || cache.products.length === 0) return [];
  if (!forceRefresh && isCacheValid(slug)) {
    return cache.products.map(normalizeProduct).slice(0, PRODUCT_CONFIG.productsPerCategory);
  }
  return cache.products.map(normalizeProduct).slice(0, PRODUCT_CONFIG.productsPerCategory);
}

// Top 5 categorías para Home
export async function getTopFeaturedProducts(): Promise<{ slug: string; name: string; icon: string; products: AliExpressProduct[] }[]> {
  const result = [];
  for (const slug of TOP_FEATURED_SLUGS) {
    const cat = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
    const products = await getProductsByCategory(slug);
    result.push({ slug, name: cat?.name || slug, icon: cat?.icon || '', products: products.slice(0, 6) });
  }
  return result;
}

// Más vendidos global
export async function getTopSellingProducts(limit = 12): Promise<AliExpressProduct[]> {
  const all: AliExpressProduct[] = [];
  for (const cat of PRODUCT_CATEGORIES) {
    const p = await getProductsByCategory(cat.slug);
    all.push(...p);
  }
  return all.sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, limit);
}

export async function syncAllCategories(): Promise<{ success: string[]; failed: string[] }> {
  const result = { success: [] as string[], failed: [] as string[] };
  for (const cat of PRODUCT_CATEGORIES) {
    try {
      const p = await searchMultiQueries(cat.searchQueries);
      if (p.length > 0) { writeCache(cat.slug, p); result.success.push(cat.slug); }
      else result.failed.push(cat.slug);
    } catch { result.failed.push(cat.slug); }
  }
  return result;
}

export function getCacheMetadata(): Record<string, { count: number; updatedAt: string }> {
  ensureDataDir();
  const meta: Record<string, { count: number; updatedAt: string }> = {};
  for (const cat of PRODUCT_CATEGORIES) {
    const cache = readCache(cat.slug);
    meta[cat.slug] = { count: cache?.products.length || 0, updatedAt: cache?.updatedAt || 'Nunca' };
  }
  return meta;
}
