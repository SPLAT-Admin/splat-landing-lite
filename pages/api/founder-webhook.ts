import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { supabaseService } from '@/lib/supabaseClient';

// ✅ Validate env vars early
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing');
}
if (!process.env.STRIPE_PRICE_TIER1 || !process.env.STRIPE_PRICE_TIER2) {
  throw new Error('Stripe price IDs are missing');
}
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL is missing');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' as any });

const SALE_LIMIT = 250;
const SALE_END = new Date('2025-08-06T23:59:59-07:00').getTime();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' }); // ✅ fixed
  }

  if (Date.now() > SALE_END) {
    return res.status(400).json({ error: 'Founder sale has ended.' }); // ✅ fixed
  }

  // Fetch sold count from Supabase
  const { count: soldCount, error: fetchError } = await supabaseService
    .from('founder_purchases')
    .select('id', { count: 'exact' });

  if (fetchError) {
    console.error('❌ Supabase fetch error:', fetchError);
    return res.status(500).json({ error: 'Failed to fetch sales data.' }); // ✅ fixed
  }

  // Promotional display logic
  const displaySold = soldCount && soldCount < 246 ? 246 : soldCount || 246;
  const tier: 'tier_1' | 'tier_2' = displaySold < SALE_LIMIT ? 'tier_1' : 'tier_2';

  const priceId = tier === 'tier_1'
    ? process.env.STRIPE_PRICE_TIER1
    : process.env.STRIPE_PRICE_TIER2;

  if (!priceId) {
    return res.status(400).json({ error: 'Invalid tier configuration.' }); // ✅ fixed
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/founder`,
    });

    return res.status(200).json({ url: session.url, sold: displaySold }); // ✅ fixed
  } catch (error) {
    console.error('❌ Stripe session error:', error);
    return res.status(500).json({ error: 'Stripe checkout session creation failed' }); // ✅ fixed
  }
}
