import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, token } = req.body;
  if (!email || !token) {
    return res.status(400).json({ error: 'Missing email or CAPTCHA token' });
  }

  try {
    const verify = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token
      })
    );

    if (!verify.data.success) {
      return res.status(400).json({ error: 'CAPTCHA verification failed' });
    }

    const { error: dbError } = await supabase
      .from('waitlist_signups')
      .insert([{ email, status: 'pending' }]);

    if (dbError) {
      return res.status(500).json({ error: dbError.message });
    }

    await resend.emails.send({
      from: 'SPL@T <noreply@usesplat.com>',
      to: email,
      subject: 'You’re on the SPL@T waitlist',
      html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h1>Welcome to SPL@T 💦</h1>
          <p>You’ve been added to the waitlist. We’ll reach out with your invite soon!</p>
        </div>
      `
    });

    return res.status(200).json({ message: 'Signed up successfully' });
  } catch (err: any) {
    console.error('Join‑waitlist error:', err);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}
