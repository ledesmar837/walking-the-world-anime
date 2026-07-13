// ============================================
// 📦 GET /api/products/[slug] — Productos por categoría
// ============================================
import { getProductsByCategory, getTopSellingProducts } from '@/lib/product-store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (slug === 'top') {
    const products = await getTopSellingProducts(12);
    return Response.json({ products });
  }

  const products = await getProductsByCategory(slug);
  return Response.json({ products });
}
