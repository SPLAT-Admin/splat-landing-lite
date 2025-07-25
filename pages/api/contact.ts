// pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Verify Cloudflare CAPTCHA
async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.CLOUDFLARE_SECRET_KEY;
  if (!secret) return false;

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      response: token,
    }),
  });

  const data = await response.json();
  console.log("CAPTCHA verification:", data);
  return data.success === true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message, captchaToken } = req.body;

  if (!name || !email || !message || !captchaToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // CAPTCHA Verification
  const validCaptcha = await verifyCaptcha(captchaToken);
  if (!validCaptcha) {
    return res.status(403).json({ error: 'CAPTCHA verification failed' });
  }

  // Insert contact into Supabase
  const { error } = await supabase
    .from('contacts')
    .insert([{ name, email: normalizedEmail, message }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Failed to save message' });
  }

  return res.status(200).json({ success: true, message: 'Thanks for reaching out!' });
}
