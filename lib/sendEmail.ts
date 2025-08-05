import { Resend } from 'resend';

type EmailParams = {
  to: string;
  subject: string;
  html: string;
  from: string;
};

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function sendEmail({ to, subject, html, from }: EmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    await resend.emails.send({ from, to, subject, html });
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
