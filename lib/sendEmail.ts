export interface EmailParams {n  to: string;n  subject: string;n  html: string;n  from?: string;n}nnconst resend = new Resend(process.env.RESEND_API_KEY);n
export async function sendEmail({ to, subject, html, from }: EmailParams): Promise<{ success: boolean }> {
  // ...existing implementation...
}

}

