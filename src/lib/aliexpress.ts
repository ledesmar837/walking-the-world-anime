// ============================================
// 🛒 AliExpress Affiliate API — Server-side Client
// NUNCA se expone al navegador
// Parámetros verificados funcionales con la API real
// ============================================
import crypto from 'crypto';

const APP_KEY = process.env.ALIEXPRESS_APP_KEY || '539462';
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET || 'p5anN6vbrJJbmIaCMfwQgFdDUnVtcgXd';
const API_URL = process.env.ALIEXPRESS_API_URL || 'https://api-sg.aliexpress.com/sync';

// ============================================
// TIPOS
// ============================================
export interface AliExpressProduct {
  productId: string;
  title: string;
  imageUrl: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  rating: string;
  sales: number;
  freeShipping: boolean;
  commissionRate?: string;
  productUrl: string;
  promotionLink: string;
  sellerName?: string;
}

interface RawProduct {
  product_id?: string;
  product_title?: string;
  product_main_image_url?: string;
  original_price?: string;
  sale_price?: string;
  discount?: string;
  evaluate_rate?: string;
  lastest_volume?: number;
  commission_rate?: string;
  product_detail_url?: string;
  promotion_link?: string;
  seller_name?: string;
  free_shipping?: boolean;
}

// ============================================
// FIRMA HMAC-MD5 (TOP Protocol)
// ============================================
function signRequest(params: Record<string, string>): string {
  const sortedKeys = Object.keys(params).sort();
  let signStr = APP_SECRET;
  for (const key of sortedKeys) {
    signStr += key + params[key];
  }
  signStr += APP_SECRET;
  return crypto.createHash('md5').update(signStr, 'utf8').digest('hex').toUpperCase();
}

// ============================================
// LLAMADA A LA API
// ============================================
async function callAliExpressAPI(
  method: string,
  extraParams: Record<string, string> = {}
): Promise<Record<string, unknown>> {
  const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);

  const params: Record<string, string> = {
    app_key: APP_KEY,
    format: 'json',
    method: method,
    sign_method: 'md5',
    timestamp: timestamp,
    v: '2.0',
    ...extraParams,
  };

  const sign = signRequest(params);
  params.sign = sign;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params).toString(),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error(`AliExpress API HTTP ${response.status}`);
      return {};
    }

    return (await response.json()) as Record<string, unknown>;
  } catch (error) {
    console.error('AliExpress API error:', error);
    return {};
  }
}

// ============================================
// BUSCAR PRODUCTOS
// ============================================
export async function searchProducts(
  keyword: string,
  options: {
    pageSize?: number;
    pageNo?: number;
    sort?: string;
  } = {}
): Promise<AliExpressProduct[]> {
  const { pageSize = 20, pageNo = 1, sort = 'volume_desc' } = options;

  const extraParams: Record<string, string> = {
    keywords: keyword,
    page_size: String(pageSize),
    page_no: String(pageNo),
    sort: sort,
    target_currency: 'USD',
    language: 'es',
    fields:
      'product_id,product_title,product_main_image_url,original_price,sale_price,discount,evaluate_rate,lastest_volume,commission_rate,product_detail_url,promotion_link,seller_id',
  };

  const data = await callAliExpressAPI(
    'aliexpress.affiliate.product.query',
    extraParams
  );

  // Navegar la estructura anidada de la respuesta
  type APIResp = {
    aliexpress_affiliate_product_query_response?: {
      resp_result?: {
        result?: { products?: { product?: RawProduct[] } };
        resp_code?: number;
        resp_msg?: string;
      };
    };
  };
  const resp = data as APIResp;
  const respResult = resp?.aliexpress_affiliate_product_query_response?.resp_result;

  if (respResult?.resp_code && respResult.resp_code !== 200) {
    console.warn(
      `AliExpress API: ${respResult.resp_msg || 'Sin resultados'} (code ${respResult.resp_code})`
    );
    return [];
  }

  const products = respResult?.result?.products?.product || [];
  if (!Array.isArray(products)) return [];

  return products.map(mapRawProduct).filter(filterValidProduct);
}

// ============================================
// MAPEO Y FILTROS
// ============================================
function mapRawProduct(raw: RawProduct): AliExpressProduct {
  return {
    productId: raw.product_id || '',
    title: raw.product_title || '',
    imageUrl: raw.product_main_image_url || '',
    originalPrice: raw.original_price || raw.sale_price || '0',
    salePrice: raw.sale_price || raw.original_price || '0',
    discount: raw.discount || '0',
    rating: raw.evaluate_rate || '0',
    sales: Number(raw.lastest_volume) || 0,
    freeShipping: Boolean(raw.free_shipping),
    commissionRate: raw.commission_rate || undefined,
    productUrl: raw.product_detail_url || '',
    promotionLink: raw.promotion_link || raw.product_detail_url || '',
    sellerName: raw.seller_name,
  };
}

function filterValidProduct(p: AliExpressProduct): boolean {
  if (!p.imageUrl) return false;
  const price = parseFloat(p.salePrice);
  if (isNaN(price) || price <= 0) return false;
  if (!p.title || p.title.length < 5) return false;
  // Filtrar productos no relacionados (genéricos)
  if (p.title.toLowerCase().includes('lamp')) return false;
  if (p.title.toLowerCase().includes('light')) return false;
  return true;
}

// ============================================
// UTILIDADES
// ============================================
export function formatPriceUSD(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatPriceCOP(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '$0';
  // Conversión aproximada USD → COP (1 USD ≈ 4000 COP)
  const cop = num * 4000;
  if (cop >= 1000000) {
    return `$${(cop / 1000000).toFixed(1)}M COP`;
  }
  if (cop >= 1000) {
    return `$${Math.round(cop / 1000)}k COP`;
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cop);
}

export function calculateDiscountPercent(
  original: string,
  sale: string
): number {
  const orig = parseFloat(original);
  const sl = parseFloat(sale);
  if (!orig || !sl || orig <= sl) return 0;
  return Math.round(((orig - sl) / orig) * 100);
}
