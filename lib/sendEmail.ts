export interface EmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function sendEmail({ to, subject, html, from }: EmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    await resend.emails.send({
      from: from || "default@usesplat.com",
      to,
      subject,
      html
    });
    return { success: true };
  } catch (err: any) {
    console.error('SendEmail error:', err);
    return { success: false, error: err.message || 'Email send failed' };
  }
}