import { Resend } from 'resend';
import { Resend } from 'resend';
export interface EmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, from }: EmailParams): Promise<{ success: boolean }> {
  // ...existing implementation...
}
