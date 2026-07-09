// ============================================
// 🔄 POST /api/revalidate — Webhook para refrescar caché
// Se llama desde Vercel Cron Jobs o GitHub Actions
// ============================================
import { revalidatePath } from 'next/cache';
import { refreshNewsCache } from '@/lib/news-service';

export async function POST(request: Request) {
  // Verificar secreto compartido
  const authHeader = request.headers.get('authorization');
  const expectedToken = `Bearer ${process.env.REVALIDATE_SECRET || 'walkingtheworldanime-secret'}`;

  if (!authHeader || authHeader !== expectedToken) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    // Refrescar caché de noticias
    await refreshNewsCache();

    // Revalidar páginas
    revalidatePath('/');
    revalidatePath('/noticias');

    return Response.json({
      revalidated: true,
      now: Date.now(),
      message: 'Caché de noticias refrescada y páginas revalidadas',
    });
  } catch (error) {
    return Response.json(
      {
        revalidated: false,
        error: 'Error al refrescar caché',
        message: String(error),
      },
      { status: 500 }
    );
  }
}

// También aceptar GET para health checks
export async function GET() {
  return Response.json({
    status: 'ok',
    service: 'walking-the-world-anime',
    timestamp: new Date().toISOString(),
  });
}
