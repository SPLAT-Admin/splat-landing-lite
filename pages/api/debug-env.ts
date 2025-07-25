import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    CLOUDFLARE_SECRET_KEY: process.env.CLOUDFLARE_SECRET_KEY ? '✅ SET' : '❌ MISSING',
    SUPABASE_URL: process.env.SUPABASE_URL ? '✅ SET' : '❌ MISSING',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ SET' : '❌ MISSING',
    RESEND_API_KEY: process.env.RESEND_API_KEY ? '✅ SET' : '❌ MISSING',
    NEXT_PUBLIC_CLOUDFLARE_SITE_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY ? '✅ SET' : '❌ MISSING',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? '✅ SET' : '❌ MISSING',
    STRIPE_PRICE_TIER1: process.env.STRIPE_PRICE_TIER1 ? '✅ SET' : '❌ MISSING',
    STRIPE_PRICE_TIER2: process.env.STRIPE_PRICE_TIER2 ? '✅ SET' : '❌ MISSING',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ? '✅ SET' : '❌ MISSING',
  });
}
