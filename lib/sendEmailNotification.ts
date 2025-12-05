import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailPayload {
  subject: string;
  to: string | string[];
  html: string;
  from?: string;
}

export async function sendEmailNotification({ subject, to, html, from = "SPL@T <noreply@usesplat.com>" }: EmailPayload) {
  try {
    await resend.emails.send({ from, to, subject, html });
    console.log("📨 Notification email sent:", subject);
  } catch (err: any) {
    console.error("❌ Resend email error:", err?.message || err);
  }
}
