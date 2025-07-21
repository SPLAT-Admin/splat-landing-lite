// pages/api/send.ambassador.email.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await resend.emails.send({
      from: "SPL@T Ambassadors <ambassador@usesplat.com>",
      to: [email],
      bcc: ["hello@usesplat.com"],
      subject: "You're in! Thanks for applying to be a SPL@T Ambassador 💦",
      html: `
        <p>Hey ${name},</p>
        <p>Thanks for applying to be a <strong>SPL@T Ambassador</strong>. We’ll review your submission and get back to you soon.</p>
        <p>Until then, stay sexy. Stay bold. Stay SPL@T.</p>
        <br />
        <p>– The SPL@T Team</p>
        <p style="font-size: 0.8rem; color: gray;">This email was sent via Resend from ambassador@usesplat.com</p>
      `,
    });

    if (response.error) {
      console.error("Resend API Error:", response.error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ status: "sent" });
  } catch (err) {
    console.error("Unhandled Resend Error:", err);
    return res.status(500).json({ error: "Email failed to send" });
  }
}
