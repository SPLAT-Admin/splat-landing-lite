import { verifyCaptcha, sendEmail, validateForm, sendSuccess } from '../../lib';
import { ContactForm } from '../../types';

export default splatApiHandler(async (req, res) => {
  const body: ContactForm = req.body;

  const validation = validateForm(body, ["name", "email", "message", "captchaToken"]);
  if (!validation.valid) return sendError(res, 400, validation.errors.join(', '));

  if (!(await verifyCaptcha(body.captchaToken))) {
    return sendError(res, 403, 'CAPTCHA verification failed');
  }

  const emailResult = await sendEmail({
    to: "support@usesplat.com",
    subject: \`New Contact Submission from \${body.name}\`,
    html: \`
      <p><strong>Name:</strong> \${body.name}</p>
      <p><strong>Email:</strong> \${body.email}</p>
      <p><strong>Message:</strong></p>
      <p>\${body.message}</p>
    \`
  });

  if (!emailResult.success) return sendError(res, 500, 'Failed to send email');

  return sendSuccess(res, "Message sent successfully");
});
