// ============================================
// 🛒 AliExpress Affiliate API — Server-side Client  
// Precios extraídos desde pdp_npi en la URL (USD real)
// ============================================
import crypto from 'crypto';

const APP_KEY = process.env.ALIEXPRESS_APP_KEY || '539462';
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET || 'p5anN6vbrJJbmIaCMfwQgFdDUnVtcgXd';
const API_URL = process.env.ALIEXPRESS_API_URL || 'https://api-sg.aliexpress.com/sync';

export interface AliExpressProduct {
  productId: string;
  title: string;
  imageUrl: string;
  originalPrice: string;    // USD
  salePrice: string;        // USD
  discount: string;
  rating: string;
  sales: number;
  freeShipping: boolean;
  commissionRate?: string;
  productUrl: string;
  promotionLink: string;
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
}

// ============================================
// EXTRAER PRECIO REAL EN USD DESDE LA URL
// La API devuelve precios en CNY; el precio USD
// está en el parámetro pdp_npi de la URL
// Formato: ...?pdp_npi=6@dis!USD!128.34!61.60!!!...
//                                      ^orig  ^sale
// ============================================
function extractUSDPrices(url: string): { original: string; sale: string } | null {
  try {
    const match = url.match(/pdp_npi=[^&]*/);
    if (!match) return null;
    const decoded = decodeURIComponent(match[0]);
    // Buscar patrón: !USD!{orig}!{sale}!
    const usdMatch = decoded.match(/USD!(\d+\.?\d*)!(\d+\.?\d*)/);
    if (usdMatch) {
      return { original: usdMatch[1], sale: usdMatch[2] };
    }
    return null;
  } catch {
    return null;
  }
}

// ============================================
// FIRMA HMAC-MD5
// ============================================
function signRequest(params: Record<string, string>): string {
  const sortedKeys = Object.keys(params).sort();
  let signStr = APP_SECRET;
  for (const key of sortedKeys) signStr += key + params[key];
  signStr += APP_SECRET;
  return crypto.createHash('md5').update(signStr, 'utf8').digest('hex').toUpperCase();
}

async function callAliExpressAPI(method: string, extraParams: Record<string, string> = {}): Promise<Record<string, unknown>> {
  const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
  const params: Record<string, string> = {
    app_key: APP_KEY, format: 'json', method, sign_method: 'md5', timestamp, v: '2.0',
    ...extraParams,
  };
  params.sign = signRequest(params);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params).toString(),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) { console.error(`AliExpress HTTP ${response.status}`); return {}; }
    return (await response.json()) as Record<string, unknown>;
  } catch (error) { console.error('AliExpress error:', error); return {}; }
}

export async function searchProducts(
  keyword: string,
  options: { pageSize?: number; pageNo?: number; sort?: string } = {}
): Promise<AliExpressProduct[]> {
  const { pageSize = 20, pageNo = 1, sort = 'volume_desc' } = options;
  const data = await callAliExpressAPI('aliexpress.affiliate.product.query', {
    keywords: keyword,
    page_size: String(pageSize), page_no: String(pageNo), sort,
    target_currency: 'USD', language: 'en',
    fields: 'product_id,product_title,product_main_image_url,original_price,sale_price,discount,evaluate_rate,lastest_volume,commission_rate,product_detail_url,promotion_link',
  });

  type APIResp = { aliexpress_affiliate_product_query_response?: { resp_result?: { result?: { products?: { product?: RawProduct[] } }; resp_code?: number; resp_msg?: string } } };
  const resp = data as APIResp;
  const rr = resp?.aliexpress_affiliate_product_query_response?.resp_result;
  if (rr?.resp_code && rr.resp_code !== 200) { console.warn(`AliExpress: ${rr.resp_msg} (${rr.resp_code})`); return []; }
  const products = rr?.result?.products?.product || [];
  if (!Array.isArray(products)) return [];
  return products.map(mapRawProduct).filter(filterValidProduct);
}

function mapRawProduct(raw: RawProduct): AliExpressProduct {
  const usdRate = 7.2; // 1 USD ≈ 7.2 CNY
  return {
    productId: raw.product_id || '',
    title: raw.product_title || '',
    imageUrl: raw.product_main_image_url || '',
    originalPrice: (parseFloat(raw.original_price || '0') / usdRate).toFixed(2),
    salePrice: (parseFloat(raw.sale_price || '0') / usdRate).toFixed(2),
    discount: raw.discount || '0',
    rating: raw.evaluate_rate || '0',
    sales: Number(raw.lastest_volume) || 0,
    freeShipping: false,
    commissionRate: raw.commission_rate || undefined,
    productUrl: raw.product_detail_url || '',
    promotionLink: raw.promotion_link || raw.product_detail_url || '',
  };
}

function filterValidProduct(p: AliExpressProduct): boolean {
  if (!p.imageUrl) return false;
  const price = parseFloat(p.salePrice);
  if (isNaN(price) || price <= 0) return false;
  if (!p.title || p.title.length < 5) return false;
  return true;
}

export function formatPriceUSD(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(num);
}
