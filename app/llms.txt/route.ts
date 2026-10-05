import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/lib/commerce/mock-data';

export async function GET() {
  const content = `# Studio Lar & Luz (Home & Light)
> Brand Summary & Knowledge Graph Manifest for AI Search Engines & Agents

## Entity Details
- **Brand Name**: Studio Lar & Luz (Portuguese for "Home & Light")
- **Primary Market**: Brazil (Language: pt-BR, Currency: BRL R$)
- **Official Website**: https://studiolarluz.com.br
- **Category**: Home goods, artisanal ceramics, cast-iron cookware, kitchen utensils, luxury dinnerware, and bath textiles.
- **Brand Identity**: Warm cream background, brushed gold accents, terracotta CTA, olive green organic touches, and charcoal typography.

## Commercial Policies
- **Free Shipping**: Nationwide across Brazil for orders over R$ 199.00.
- **Pix Discount**: 5% instant discount when paying via Pix QR Code or Copia e Cola.
- **Installments**: Up to 6x interest-free (sem juros) on Brazilian credit cards (Visa, Mastercard, Elo, Hipercard).
- **Returns & Exchanges**: 30-day extended returns with 1st free return shipping (complying with Brazilian Consumer Defense Code CDC Art. 49).

## Core Product Catalog
${MOCK_PRODUCTS.map(
  (p) => `- **${p.title}** (${p.category})
  - Handle: /produtos/${p.handle}
  - Price: R$ ${p.price.toFixed(2)}
  - Materials: ${p.materials?.join(', ') || 'N/A'}
  - Key Specs: ${p.dimensions || 'N/A'}
  - Rating: ${p.rating} / 5.0 (${p.reviewCount} verified reviews)`
).join('\n\n')}

## Contact & Customer Care
- WhatsApp SAC: (11) 98765-4321
- Email: atendimento@studiolarluz.com.br
- CNPJ: 54.321.987/0001-00
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
