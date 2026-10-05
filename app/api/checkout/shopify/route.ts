import { NextRequest, NextResponse } from 'next/server';

const STORE_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN || 'qt5aaq-1s.myshopify.com';
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

interface CheckoutLine {
  variantId: string;
  quantity: number;
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function isShopifyVariantGid(id: string): boolean {
  return id.startsWith('gid://shopify/ProductVariant/');
}

function toNumericVariantId(id: string): string | null {
  // Accepts raw numeric ids or GIDs ("gid://shopify/ProductVariant/123" -> "123")
  const gidMatch = id.match(/ProductVariant\/(\d+)\s*$/);
  if (gidMatch) return gidMatch[1];
  return /^\d+$/.test(id.trim()) ? id.trim() : null;
}

export async function POST(req: NextRequest) {
  try {
    const { lines } = (await req.json()) as { lines: CheckoutLine[] };

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json(
        { error: 'Carrinho vazio. Adicione itens antes de ir ao checkout.' },
        { status: 400 }
      );
    }

    // 1) Preferred: Storefront API cartCreate (real checkout session with items)
    const allGids = lines.every((l) => isShopifyVariantGid(l.variantId));
    if (STOREFRONT_TOKEN && allGids) {
      try {
        const res = await fetch(
          `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
            },
            body: JSON.stringify({
              query: CART_CREATE_MUTATION,
              variables: {
                lines: lines.map((l) => ({
                  merchandiseId: l.variantId,
                  quantity: Math.max(1, l.quantity),
                })),
              },
            }),
          }
        );

        if (res.ok) {
          const json = await res.json();
          const cart = json?.data?.cartCreate?.cart;
          const errors = json?.data?.cartCreate?.userErrors;
          if (cart?.checkoutUrl && (!errors || errors.length === 0)) {
            return NextResponse.json({
              checkoutUrl: cart.checkoutUrl as string,
              mode: 'cart',
            });
          }
        }
      } catch (err) {
        console.warn('Shopify cartCreate failed, trying permalink fallback:', err);
      }
    }

    // 2) Fallback: cart permalink (needs numeric variant ids)
    const permalinkSegments: string[] = [];
    for (const l of lines) {
      const numeric = toNumericVariantId(l.variantId);
      if (!numeric) break;
      permalinkSegments.push(`${numeric}:${Math.max(1, l.quantity)}`);
    }
    if (
      permalinkSegments.length === lines.length &&
      permalinkSegments.length > 0
    ) {
      return NextResponse.json({
        checkoutUrl: `https://${STORE_DOMAIN}/cart/${permalinkSegments.join(',')}`,
        mode: 'permalink',
      });
    }

    // 3) Last resort: storefront (cart items can't be pre-built, e.g. mock catalog)
    return NextResponse.json({
      checkoutUrl: `https://${STORE_DOMAIN}`,
      mode: 'storefront',
      warning:
        'Não foi possível transferir os itens automaticamente. Confira seu carrinho na loja Shopify.',
    });
  } catch (err: any) {
    console.error('Shopify checkout session error:', err);
    return NextResponse.json(
      { error: 'Não foi possível iniciar o checkout Shopify. Tente novamente.' },
      { status: 500 }
    );
  }
}
