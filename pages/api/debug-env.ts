import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const mode = stripeKey?.startsWith('sk_live_')
    ? 'LIVE'
    : stripeKey?.startsWith('sk_test_')
    ? 'TEST'
    : 'UNKNOWN';

  res.status(200).json({
    MODE: mode,
    STRIPE_SECRET_KEY: stripeKey ? '✅ SET' : '❌ MISSING',
    STRIPE_PRICE_TIER1: process.env.STRIPE_PRICE_TIER1 ? '✅ SET' : '❌ MISSING',
    STRIPE_PRICE_TIER2: process.env.STRIPE_PRICE_TIER2 ? '✅ SET' : '❌ MISSING',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ? '✅ SET' : '❌ MISSING',
    CLOUDFLARE_SECRET_KEY: process.env.CLOUDFLARE_SECRET_KEY ? '✅ SET' : '❌ MISSING',
    // … other env checks here
  });
}
