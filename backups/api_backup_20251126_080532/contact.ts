// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { splatApiHandler, sendError, sendSuccess, verifyCaptcha, validateForm, getSupabaseServiceClient } from '@/lib';
import { sendEmail } from '@/lib/sendEmail';
import { sendConfirmationEmail } from '@/lib/sendConfirmationEmail';
import type { ContactForm } from '@/types';

const supabaseService = getSupabaseServiceClient();

export default splatApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return sendError(res, 405, 'Method Not Allowed');

  const body: ContactForm = req.body;

  // 1) Validate required fields
  const { valid, errors } = validateForm(body, ['name', 'email', 'message', 'captchaToken'], {
    patterns: { email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    max: { name: 100, message: 1000 },
  });
  if (!valid) {
    console.warn('Contact validation errors:', errors);
    return sendError(res, 400, `Validation failed: ${errors.join(', ')}`);
  }

  // 2) CAPTCHA verification
  const captchaOK = await verifyCaptcha(body.captchaToken, req.headers['x-forwarded-for'] as string);
  if (!captchaOK) return sendError(res, 403, 'CAPTCHA verification failed');

  const insertPayload = {
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    message: body.message.trim(),
  };

  const contactTable = process.env.SUPABASE_CONTACT_TABLE || 'contacts';
  const { error: contactError } = await supabaseService.schema('marketing').from(contactTable).insert([insertPayload]);
  if (contactError) {
    console.error('Contact Supabase insert failure:', contactError);
    return sendError(res, 500, 'Failed to record your message');
  }

  // 3) Send message to support
  try {
    await sendEmail({
      to: 'support@usesplat.com',
      subject: `New Contact Message from ${body.name}`,
      html: `
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    });
  } catch (emailErr) {
    console.error('Contact email send failure:', emailErr);
    return sendError(res, 500, 'Failed to send your message');
  }

  await sendConfirmationEmail('contact', insertPayload.email);

  // 4) Success (with redirect hint)
  return sendSuccess(res, 'Message sent successfully', undefined, '/thank-you');
});
