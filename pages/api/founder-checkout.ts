// pages/api/founder-checkout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.warn('❌ Invalid method:', req.method);
    return res.status(405).end('Method Not Allowed');
  }

  const { tier } = req.body;
  const priceId = tier === 'tier_1'
    ? process.env.STRIPE_PRICE_TIER1
    : process.env.STRIPE_PRICE_TIER2;

  console.log('🔍 Tier requested:', tier);
  console.log('💰 Using price ID:', priceId);

  if (!priceId) {
    console.error('❌ Price ID not found for tier:', tier);
    return res.status(400).json({ error: 'Invalid tier selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/founder`,
    });

    console.log('✅ Session created:', session.id);
    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('❌ Stripe error:', error.message);
    res.status(500).json({ error: 'Stripe checkout session creation failed' });
  }
}
