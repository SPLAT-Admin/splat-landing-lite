import { splatApiHandler, sendError, verifyCaptcha, validateForm, sendSuccess } from "../../lib";
import type { EmailParams } from "../../lib/sendEmail";
import { sendEmail } from "../../lib/sendEmail";
import { ContactForm } from "../../types";
export default splatApiHandler(async (req, res) => {
  const body: ContactForm = req.body;
  const validation = validateForm(body, ["name", "email", "message", "captchaToken"]);
  if (!validation.valid) return sendError(res, 400, validation.errors.join(', '));

  if (!(await verifyCaptcha(body.captchaToken))) {
    return sendError(res, 403, 'CAPTCHA verification failed');
  }

  const emailResult = await sendEmail({
    to: "support@usesplat.com",
    subject: `New Contact Submission from ${body.name}`,
    html: `<p><strong>Name:</strong> ${body.name}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Message:</strong></p>
    <p>${body.message}</p>`
  } as EmailParams);
    to: "support@usesplat.com",
    subject: `New Contact Submission from ${body.name}`,
    html: `<p><strong>Name:</strong> ${body.name}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Message:</strong></p>
    <p>${body.message}</p>`
  } as EmailParams);

  return sendSuccess(res, "Message sent successfully");
});
});
