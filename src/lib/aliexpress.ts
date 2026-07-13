// ============================================
// 🛒 AliExpress Affiliate API — Server-side Client
// NUNCA se expone al navegador
// ============================================
import crypto from 'crypto';

const APP_KEY = process.env.ALIEXPRESS_APP_KEY || '539462';
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET || 'p5anN6vbrJJbmIaCMfwQgFdDUnVtcgXd';
const API_URL = process.env.ALIEXPRESS_API_URL || 'https://api-sg.aliexpress.com/sync';

// ============================================
// TIPOS DE RESPUESTA
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

interface AliExpressAPIResponse {
  aliexpress_affiliate_product_query_response?: {
    resp_result?: {
      result?: {
        products?: {
          product?: RawProduct[];
        };
        total_record_count?: number;
      };
      resp_code?: number;
      resp_msg?: string;
    };
  };
  error_response?: {
    code?: number;
    msg?: string;
  };
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
  second_level_category_name?: string;
}

// ============================================
// FIRMA HMAC-MD5 (Alibaba TOP Protocol)
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
): Promise<AliExpressAPIResponse> {
  const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);

  const params: Record<string, string> = {
    app_key: APP_KEY,
    format: 'json',
    method: method,
    sign_method: 'md5',
    timestamp: timestamp,
    v: '2.0',
    simplify: 'true',
    ...extraParams,
  };

  const sign = signRequest(params);
  params.sign = sign;

  const formBody = new URLSearchParams(params).toString();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
      next: { revalidate: 0 }, // No cachear llamadas a API
    });

    if (!response.ok) {
      console.error(`AliExpress API error: ${response.status}`);
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error('AliExpress API call failed:', error);
    return {};
  }
}

// ============================================
// BUSCAR PRODUCTOS POR PALABRA CLAVE
// ============================================
export async function searchProducts(
  keyword: string,
  options: {
    maxPrice?: string;
    pageSize?: number;
    pageNo?: number;
    sort?: string;
  } = {}
): Promise<AliExpressProduct[]> {
  const {
    maxPrice = '100000',
    pageSize = 20,
    pageNo = 1,
    sort = 'volume_desc', // Más vendidos primero
  } = options;

  const extraParams: Record<string, string> = {
    keywords: keyword,
    max_sale_price: maxPrice,
    min_sale_price: '5000', // Mínimo ~$5 USD en COP (~20,000)
    page_size: String(pageSize),
    page_no: String(pageNo),
    sort: sort,
    target_currency: 'COP',
    language: 'es',
    ship_to_country: 'CO',
    fields:
      'product_id,product_title,product_main_image_url,original_price,sale_price,discount,evaluate_rate,lastest_volume,commission_rate,product_detail_url,promotion_link,seller_id',
  };

  const data = await callAliExpressAPI(
    'aliexpress.affiliate.product.query',
    extraParams
  );

  const products =
    data?.aliexpress_affiliate_product_query_response?.resp_result?.result
      ?.products?.product || [];

  if (!Array.isArray(products)) return [];

  return products
    .map(mapRawProduct)
    .filter(filterValidProduct);
}

// ============================================
// GENERAR LINK DE AFILIADO
// ============================================
export async function generateAffiliateLink(
  productUrl: string
): Promise<string> {
  // Si la API ya devuelve promotion_link, lo usamos directamente
  const extraParams: Record<string, string> = {
    source_values: productUrl,
  };

  const data = await callAliExpressAPI(
    'aliexpress.affiliate.link.generate',
    extraParams
  );

  type LinkResult = { promotion_links?: { promotion_link?: string[] } };
  const resp =
    (data as Record<string, { resp_result?: { result?: LinkResult } }>)
      ?.aliexpress_affiliate_link_generate_response?.resp_result?.result;
  const links = resp?.promotion_links?.promotion_link;
  return links?.[0] || productUrl;
}

// ============================================
// MAPEO Y FILTROS
// ============================================
function mapRawProduct(raw: RawProduct): AliExpressProduct {
  return {
    productId: raw.product_id || '',
    title: raw.product_title || '',
    imageUrl: raw.product_main_image_url || '',
    originalPrice: raw.original_price || '0',
    salePrice: raw.sale_price || '0',
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
  // Debe tener imagen
  if (!p.imageUrl) return false;
  // Debe tener precio válido
  const price = parseFloat(p.salePrice);
  if (isNaN(price) || price <= 0) return false;
  // Debe tener nombre
  if (!p.title || p.title.length < 5) return false;
  return true;
}

// ============================================
// UTILIDADES
// ============================================
export function formatPriceCOP(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '$0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
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
