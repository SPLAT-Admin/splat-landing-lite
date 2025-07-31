export interface EmailParams { to: string; subject: string; html: string; from?: string; }
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailParams): Promise<{ success: boolean }> {
  // ...existing implementation...
}

}

