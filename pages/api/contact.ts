import type { NextApiRequest, NextApiResponse } from 'next';
import { splatApiHandler, sendError, verifyCaptcha, validateForm, sendSuccess } from '@/lib';
import { sendEmail } from '@/lib/sendEmail';
import type { EmailParams } from '@/lib/sendEmail';
import type { ContactForm } from '@/types';

export default splatApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const body: ContactForm = req.body;

  // Validate form fields
  const validation = validateForm(body, ['name', 'email', 'message', 'captchaToken']);
  if (!validation.valid) {
    return sendError(res, 400, validation.errors.join(', '));
  }

  // Verify CAPTCHA
  if (!(await verifyCaptcha(body.captchaToken))) {
    return sendError(res, 403, 'CAPTCHA verification failed');
  }

  // Send contact email
  const emailResult = await sendEmail({
    to: 'support@usesplat.com',
    subject: `New Contact Submission from ${body.name}`,
    html: `
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Message:</strong></p>
      <p>${body.message}</p>
    `
  } as EmailParams);

  if (!emailResult.success) {
    return sendError(res, 500, 'Failed to send email');
  }

  return sendSuccess(res, 'Message sent successfully');
});
