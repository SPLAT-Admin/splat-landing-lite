import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Validate env vars early
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing');
}
if (!process.env.STRIPE_PRICE_TIER1 || !process.env.STRIPE_PRICE_TIER2) {
  throw new Error('Stripe price IDs are missing');
}
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL is missing');
}

<<<<<<< HEAD
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' as any });

// Temporary in-memory sale tracking (replace with persistent DB tracking in production)
let soldCount = 246;
const SALE_LIMIT = 250;
=======
// Starting count close to limit to drive urgency
let soldCount = 162;
const SALE_LIMIT = 177;
>>>>>>> main
const SALE_END = new Date('2025-08-06T23:59:59-07:00').getTime();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (Date.now() > SALE_END) {
    return res.status(400).json({ error: 'Founder sale has ended.' });
  }

  const tier: 'tier_1' | 'tier_2' = soldCount < SALE_LIMIT ? 'tier_1' : 'tier_2';
  if (tier === 'tier_1') {
    soldCount++;
    if (soldCount === SALE_LIMIT) {
      console.info('✅ Tier 1 sold out. Switching to Tier 2 pricing.');
    }
  }

  const priceId = tier === 'tier_1'
    ? process.env.STRIPE_PRICE_TIER1
    : process.env.STRIPE_PRICE_TIER2;

  if (!priceId) {
    return res.status(400).json({ error: 'Invalid tier configuration.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/founder`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('❌ Stripe checkout error:', error);
    return res.status(500).json({ error: 'Stripe checkout session creation failed' });
  }
}
