// lib/email.ts

export type EmailParams = {
  to: string | string[]; // supports single or multiple recipients
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: EmailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in environment variables");
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'SPL@T System <no-reply@usesplat.com>',
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Email failed: ${error.message || response.statusText}`);
  }

  return await response.json();
}
