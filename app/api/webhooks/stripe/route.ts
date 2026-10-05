import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, note: 'Webhook received in test mode' });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('⚠️ Stripe Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful payments
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as any;
    console.log(`💰 PaymentIntent succeeded! Amount: R$ ${(paymentIntent.amount / 100).toFixed(2)}`);

    // Sync order creation to Shopify Admin API if token configured
    if (process.env.SHOPIFY_ADMIN_API_TOKEN && process.env.SHOPIFY_STORE_DOMAIN) {
      try {
        const orderData = {
          order: {
            email: paymentIntent.receipt_email,
            financial_status: 'paid',
            total_price: (paymentIntent.amount / 100).toFixed(2),
            currency: 'BRL',
            note: `Pago via Stripe (${paymentIntent.payment_method_types?.[0] || 'pix'}). ID: ${paymentIntent.id}`,
            tags: 'stripe, pago, dropshipping-aliexpress',
          },
        };

        await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/orders.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
          },
          body: JSON.stringify(orderData),
        });

        console.log('✅ Order synced to Shopify Admin successfully.');
      } catch (shopifyErr) {
        console.error('Error syncing order to Shopify:', shopifyErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
