import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { cep, total } = await req.json();

    const cleanCep = (cep || '').replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      return NextResponse.json({ error: 'CEP inválido' }, { status: 400 });
    }

    const orderTotal = parseFloat(total || '0');
    const isFree = orderTotal >= 199.0;

    // Simulate shipping rates by state prefix
    const firstDigit = cleanCep.charAt(0);
    const isSP = firstDigit === '0' || firstDigit === '1';

    const sedexCost = isSP ? 18.9 : 28.5;
    const pacCost = isFree ? 0 : isSP ? 12.5 : 21.0;

    return NextResponse.json({
      success: true,
      cep: cleanCep,
      options: [
        {
          id: 'sedex',
          name: 'Correios Sedex Expresso',
          price: sedexCost,
          formattedPrice: `R$ ${sedexCost.toFixed(2).replace('.', ',')}`,
          days: isSP ? '1 a 2 dias úteis' : '2 a 4 dias úteis',
        },
        {
          id: 'pac',
          name: 'Correios PAC Econômico',
          price: pacCost,
          formattedPrice: isFree ? 'Grátis' : `R$ ${pacCost.toFixed(2).replace('.', ',')}`,
          days: isSP ? '3 a 5 dias úteis' : '5 a 8 dias úteis',
          isFree: isFree,
        },
      ],
    });
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao calcular frete' }, { status: 500 });
  }
}
