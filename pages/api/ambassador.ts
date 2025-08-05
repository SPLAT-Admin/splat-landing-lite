import type { NextApiRequest, NextApiResponse } from 'next';
import { splatApiHandler, sendError, verifyCaptcha, validateForm, sendSuccess } from '@/lib';
import { sendEmail } from '@/lib/sendEmail';
import type { EmailParams } from '@/lib/sendEmail';
import type { AmbassadorForm } from '@/types';
import { supabaseService } from '@/lib/supabaseClient';

export default splatApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const body: AmbassadorForm = req.body;

  // Validate form
  const validation = validateForm(body, [
    'first_name', 'last_name', 'email', 'dob', 'city', 'state',
    'social_media_handles', 'number_of_followers', 'qualifications_why', 'captchaToken'
  ]);
  if (!validation.valid) {
    return sendError(res, 400, validation.errors.join(', '));
  }

  // Verify CAPTCHA
  if (!(await verifyCaptcha(body.captchaToken))) {
    return sendError(res, 403, 'CAPTCHA verification failed');
  }

  // Insert ambassador application into Supabase
  const { error } = await supabaseService.from('ambassador').insert([{
    ...body,
    status: 'pending'
  }]);

  if (error) {
    console.error('❌ Supabase insert error:', error);
    return sendError(res, 500, 'Failed to save ambassador data');
  }

  // Send confirmation email
  const emailResult = await sendEmail({
    to: body.email,
    subject: "You're in! Thanks for applying to be a SPL@T Ambassador 💦",
    html: `
      <p>Hey ${body.preferred_name || body.first_name},</p>
      <p>Thanks for applying to be a <strong>SPL@T Ambassador</strong>. We’ll review your submission and get back to you soon.</p>
      <p>Until then, stay sexy. Stay bold. Stay SPL@T.</p>
      <br/>
      <p>– The SPL@T Team</p>
    `
  } as EmailParams);

  if (!emailResult.success) {
    return sendError(res, 500, 'Failed to send confirmation email');
  }

  return sendSuccess(res, 'Application submitted successfully');
});
