import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing in environment.");
    return { success: false, error: "Missing RESEND API key" };
  }

  try {
    const response = await resend.emails.send({
      from: from || 'SPL@T <no-reply@usesplat.com>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    return { success: true, id: response?.id };
  } catch (err) {
    console.error("❌ Email send failed:", err);
    return { success: false, error: err };
  }
}
