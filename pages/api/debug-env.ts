import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({
    baseUrlConfigured: Boolean(process.env.NEXT_PUBLIC_BASE_URL),
    cloudflareConfigured: Boolean(process.env.CLOUDFLARE_SECRET_KEY),
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    supabaseConfigured:
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY),
  });
}
