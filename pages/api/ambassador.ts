import { splatApiHandler, sendError, verifyCaptcha, validateForm, sendSuccess } from "../../lib";
import type { EmailParams } from "../../lib/sendEmail";
import { sendEmail } from "../../lib/sendEmail";
import { AmbassadorForm } from "../../types";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default splatApiHandler(async (req, res) => {
  const body: AmbassadorForm = req.body;

  const validation = validateForm(body, [
    "first_name", "last_name", "email", "dob", "city", "state",
    "social_media_handles", "number_of_followers", "qualifications_why", "captchaToken"
  ]);
  if (!validation.valid) return sendError(res, 400, validation.errors.join(', '));

  if (!(await verifyCaptcha(body.captchaToken))) {
    return sendError(res, 403, 'CAPTCHA verification failed');
  }

  const { error } = await supabase.from('ambassador').insert([{
    first_name: body.first_name,
    last_name: body.last_name,
    preferred_name: body.preferred_name,
    email: body.email,
    dob: body.dob,
    city: body.city,
    state: body.state,
    social_media_handles: body.social_media_handles,
    number_of_followers: body.number_of_followers,
    qualifications_why: body.qualifications_why,
    referral: body.referral,
    status: 'pending',
  }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return sendError(res, 500, 'Failed to save ambassador data');
  }

  html: `<p>Hey ${body.preferred_name || body.first_name},</p>
<p>Thanks for applying to be a <strong>SPL@T Ambassador</strong>. We’ll review your submission and get back to you soon.</p>
<p>Until then, stay sexy. Stay bold. Stay SPL@T.</p>
<br />
<p>– The SPL@T Team</p>`

if (!emailResult.success) return sendError(res, 500, "Failed to send confirmation email");

return sendSuccess(res, "Application submitted successfully");
});
