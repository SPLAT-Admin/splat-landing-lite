export interface EmailParams { to: string; subject: string; html: string; from?: string; }
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface EmailParams { to: string; subject: string; html: string; from?: string; }
export async function sendEmail({ to, subject, html, from }: EmailParams): Promise<{ success: boolean }> {
  // ...existing implementation...
}

}

export interface EmailParams { to: string; subject: string; html: string; from?: string; }
export async function sendEmail({ to, subject, html, from }: EmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing.");
    return { success: false, error: "Missing API key" };
  }

  try {
    const response = await resend.emails.send({
      from: from || 'SPL@T <no-reply@usesplat.com>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (response.error) {
      console.error("Resend API error:", response.error);
      return { success: false, error: response.error };
    }

    return { success: true, id: response.data?.id || null };
  } catch (err) {
    console.error("Email send failed:", err);
    return { success: false, error: err };
  }
}
