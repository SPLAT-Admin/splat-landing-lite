import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { to, type } = req.body;
  if (!to) return res.status(400).json({ error: "Missing recipient email." });

  const subjects = {
    signup: "Welcome to SPL@T 💋 You're on the list!",
    contact: "Thanks for reaching out 💌",
    ambassador: "We got your SPL@T Ambassador application 🌟",
  };

  const templates = {
    signup: `
      <h2 style="color:#e11d48">Hey there 💦</h2>
      <p>You’re officially on the SPL@T list. Expect juicy updates and special drops.</p>
      <p><a href="https://www.usesplat.com/merch" style="color:#e11d48;">→ Browse Merch</a></p>
      <br><p style="opacity:0.8">Stay wet, stay ready — SPL@T Team 💋</p>
    `,
    contact: `
      <h2 style="color:#e11d48">Hey gorgeous 👋</h2>
      <p>We’ve received your message — expect a response soon.</p>
      <br><p style="opacity:0.8">With love, The SPL@T Team 💌</p>
    `,
    ambassador: `
      <h2 style="color:#e11d48">Hey superstar 🌟</h2>
      <p>Your SPL@T Ambassador application has been received and will be reviewed soon.</p>
      <br><p style="opacity:0.8">Keep it bold — The SPL@T Team 💅</p>
    `,
  };

  try {
    await resend.emails.send({
      from: "SPL@T <noreply@usesplat.com>",
      to,
      subject: subjects[type] || "SPL@T Email Preview",
      html: templates[type] || templates.signup,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend test-send error:", error);
    res.status(500).json({ error: "Failed to send test email." });
  }
}
