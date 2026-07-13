// ============================================
// 🔄 POST /api/sync-products — Sincronizar productos AliExpress
// Llamado por el cron job diario
// ============================================
import { syncAllCategories, getCacheMetadata } from '@/lib/product-store';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const expectedToken = `Bearer ${process.env.REVALIDATE_SECRET || 'walkingtheworldanime-secret'}`;

  if (!authHeader || authHeader !== expectedToken) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const result = await syncAllCategories();
    return Response.json({
      synced: true,
      success: result.success,
      failed: result.failed,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      { synced: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  const meta = getCacheMetadata();
  return Response.json({
    status: 'ok',
    cache: meta,
    categories: Object.keys(meta).length,
    timestamp: new Date().toISOString(),
  });
}
