// lib/email.ts
export type EmailParams = {
  to: string;
  subject: string;
  html: string;
  from?: string; // Optional override
};

/**
 * Sends an email using Resend's API.
 */
export async function sendEmailFetch({ to, subject, html, from }: EmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const defaultFrom = process.env.DEFAULT_FROM_EMAIL || "SPL@T <no-reply@usesplat.com>";

  if (!apiKey) throw new Error("RESEND_API_KEY is missing");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: from || defaultFrom,
      to,
      subject,
      html,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data,
  };
}
