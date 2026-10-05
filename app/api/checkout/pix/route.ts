import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function POST(req: NextRequest) {
  try {
    const { amount, customerEmail, orderNumber } = await req.json();

    const numericAmount = Math.round(parseFloat(amount) * 100); // centavos

    if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('mock')) {
      // Real Stripe PaymentIntent with Pix
      const paymentIntent = await stripe.paymentIntents.create({
        amount: numericAmount,
        currency: 'brl',
        payment_method_types: ['pix'],
        receipt_email: customerEmail,
        metadata: {
          orderNumber: orderNumber || `LL${Date.now()}`,
          store: 'Studio Lar & Luz',
        },
      } as any);

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      } as any);
    }

    // Fallback simulation for dev/testing
    return NextResponse.json({
      clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      pixCode: '00020126580014br.gov.bcb.pix0136studiolarluz-pagamento-pix-982045204000053039865405141.555802BR5916STUDIO LAR LUZ6009SAO PAULO62070503***6304ABCD',
      expiresInMinutes: 30,
      orderNumber: orderNumber || `LL${Math.floor(1000 + Math.random() * 9000)}`,
    } as any);
  } catch (err: any) {
    console.error('Pix generation error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 } as any);
  }
}
