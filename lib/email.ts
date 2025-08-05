type EmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmailFetch({ to, subject, html }: EmailParams) {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is missing');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, subject, html }),
  });

  return await response.json();
}
