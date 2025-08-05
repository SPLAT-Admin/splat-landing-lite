import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mode =
    process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_')
      ? 'LIVE'
      : process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_')
      ? 'TEST'
      : 'UNKNOWN';

  return res.statustus(200).json({
    mode,
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeTier1Configured: Boolean(process.env.STRIPE_PRICE_TIER1),
    stripeTier2Configured: Boolean(process.env.STRIPE_PRICE_TIER2),
    baseUrlConfigured: Boolean(process.env.NEXT_PUBLIC_BASE_URL),
    cloudflareConfigured: Boolean(process.env.CLOUDFLARE_SECRET_KEY),
  });
}
