import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, token } = req.body;
  if (!email || !token) return res.status(400).json({ error: 'Missing email or CAPTCHA' });

  // validate token
  const verify = await axios.post(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token })
  );
  if (!verify.data.success) return res.status(400).json({ error: 'CAPTCHA verification failed' });

  // save to supabase
  const { error } = await supabase.from('waitlist_signups').insert([{ email, status: 'pending' }]);
  if (error) return res.status(500).json({ error: error.message });

  // send email
  await resend.emails.send({
    from: 'SPL@T <noreply@usesplat.com>',
    to: email,
    subject: "You're on the SPL@T waitlist",
    html: `<p>Thanks for signing up. Stay tuned for your invite!</p>`
  });

  res.status(200).json({ message: 'Signed up' });
}
