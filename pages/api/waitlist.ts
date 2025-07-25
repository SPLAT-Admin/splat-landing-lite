// pages/api/waitlist.ts
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import axios from 'axios';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, referral_source, marketing_channel, token } = req.body;
  const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Valid email required' });
  }

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'CAPTCHA token missing' });
  }

  // Verify Turnstile CAPTCHA
  try {
    const turnstileRes = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
        remoteip: typeof ip_address === 'string' ? ip_address : '',
      })
    );

    if (!turnstileRes.data.success) {
      return res.status(400).json({ error: 'CAPTCHA verification failed' });
    }
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return res.status(500).json({ error: 'CAPTCHA verification error' });
  }

  // Insert into Supabase
  const { error } = await supabase.from('waitlist_signups').insert([
    {
      email,
      referral_source: referral_source || null,
      marketing_channel: marketing_channel || null,
      ip_address,
      status: 'pending',
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Send confirmation email
  try {
    await resend.emails.send({
      from: 'SPL@T <noreply@usesplat.com>',
      to: email,
      subject: 'You’re on the SPL@T Waitlist',
      html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h1>Welcome to SPL@T 💦</h1>
          <p>You’ve been added to the waitlist. We’ll reach out soon with your invite and updates!</p>
          <p style="margin-top: 20px; font-size: 12px; color: gray;">If this wasn’t you, ignore this email.</p>
        </div>
      `,
    });
  } catch (err: any) {
    console.error('Resend error:', err);
  }

  return res.status(200).json({ message: 'Signed up successfully' });
}
