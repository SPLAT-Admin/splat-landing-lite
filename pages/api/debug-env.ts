import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const stripeKey = process.env.STRIPE_SECRET_KEY || '';
  const mode =
    stripeKey.startsWith('sk_live_') ? 'LIVE' :
    stripeKey.startsWith('sk_test_') ? 'TEST' :
    'UNKNOWN';

  res.status(200).json({
    mode,
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeTier1Configured: Boolean(process.env.STRIPE_PRICE_TIER1),
    stripeTier2Configured: Boolean(process.env.STRIPE_PRICE_TIER2),
    baseUrlConfigured: Boolean(process.env.NEXT_PUBLIC_BASE_URL),
    cloudflareConfigured: Boolean(process.env.CLOUDFLARE_SECRET_KEY)
  });
}
