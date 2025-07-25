// pages/api/founder-checkout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const tierPrices: Record<string, string> = {
  tier_1: 'price_1Ronr1D1HTjAgpeBjjv3sw46', // $25 Tier
  tier_2: 'price_1RonrND1HTjAgpeBRcwQ75cH', // $50 Tier
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { tier } = req.body;
  const priceId = tierPrices[tier];

  if (!priceId) {
    return res.status(400).json({ error: 'Invalid tier selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thanks?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/founder?checkout=cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
