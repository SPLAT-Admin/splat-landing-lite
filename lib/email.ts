export async function sendEmailFetch({ to, subject, html }: EmailParams) {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is missing');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: 'SPL@T System <no-reply@usesplat.com>', to, subject, html })
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Email failed: ${error.message || response.statusText}`);
  }
  return response.json();
}