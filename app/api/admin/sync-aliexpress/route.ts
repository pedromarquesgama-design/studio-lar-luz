import { NextRequest, NextResponse } from 'next/server';
import { calculateSellPriceBRL, sanitizeAliExpressTitle } from '@/lib/aliexpress/pricing-rules';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const secret = process.env.ADMIN_SYNC_SECRET || 'lar-luz-sync-secret';

    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { items } = await req.json();

    const results = (items || []).map((item: any) => {
      const cleanTitle = sanitizeAliExpressTitle(item.title || '');
      const pricing = calculateSellPriceBRL(parseFloat(item.costUSD || '10'));

      return {
        sku: item.sku,
        originalTitle: item.title,
        cleanTitle,
        costUSD: item.costUSD,
        pricing,
        stockAvailable: item.stock || 20,
      };
    });

    return NextResponse.json({
      success: true,
      syncedCount: results.length,
      items: results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
