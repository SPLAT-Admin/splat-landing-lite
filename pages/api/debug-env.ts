import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mode = process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_")
    ? "LIVE"
    : process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")
    ? "TEST"
    : "UNKNOWN";

  res.status(200).json({
    MODE: mode,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_PRICE_TIER1: !!process.env.STRIPE_PRICE_TIER1,
    STRIPE_PRICE_TIER2: !!process.env.STRIPE_PRICE_TIER2,
    NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
    CLOUDFLARE_SECRET_KEY: !!process.env.CLOUDFLARE_SECRET_KEY,
  });
}
