// pages/api/ambassador.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(ba
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    first_name,
    last_name,
    preferred_name,
    email,
    dob,
    city,
    state,
    social_media_handles,
    number_of_followers,
    qualifications_why,
    referral,
    captchaToken,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !dob ||
    !city ||
    !state ||
    !social_media_handles ||
    !number_of_followers ||
    !qualifications_why ||
    !captchaToken
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // CAPTCHA verification
  const captchaRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.CLOUDFLARE_SECRET_KEY,
      response: captchaToken,
    }),
  });

  const captchaData = await captchaRes.json();
  if (!captchaData.success) {
    return res.status(403).json({ error: 'CAPTCHA verification failed' });
  }

  // Insert into Supabase
  const { error } = await supabase.from('ambassador').insert([{ 
    first_name,
    last_name,
    preferred_name,
    email,
    dob,
    city,
    state,
    social_media_handles,
    number_of_followers,
    qualifications_why,
    referral,
    status: 'pending'
  }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Failed to save ambassador data' });
  }

  // Resend confirmation
  await resend.emails.send({
    from: 'SPL@T Ambassadors <no-reply@usesplat.com>',
    to: [email],
    subject: "You're in! Thanks for applying to be a SPL@T Ambassador 💦",
    html: `
      <p>Hey ${preferred_name || first_name},</p>
      <p>Thanks for applying to be a <strong>SPL@T Ambassador</strong>. We’ll review your submission and get back to you soon.</p>
      <p>Until then, stay sexy. Stay bold. Stay SPL@T.</p>
      <br />
      <p>– The SPL@T Team</p>
      <p style="font-size: 0.8rem; color: gray;">This email was sent via Resend from no-reply@usesplat.com</p>
    `,
  });

  return res.status(200).json({ status: 'submitted' });
}
