import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";
import { sendEmail } from "@/lib/sendEmail";

const supabaseService = getSupabaseServiceClient();

const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body ?? {};

    if (!name || !String(name).trim()) {
      return res.status(400).json({ ok: false, error: "Name is required." });
    }

    if (!email || !isValidEmail(String(email))) {
      return res.status(400).json({ ok: false, error: "Valid email is required." });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({ ok: false, error: "Message is required." });
    }

    const payload = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
    };

    const { error: insertError } = await supabaseService.from("contacts").insert([payload]);
    if (insertError) {
      console.error("Contact insert error", insertError);
      return res.status(500).json({ ok: false, error: "Failed to save your message." });
    }

    try {
      await sendEmail({
        to: payload.email,
        subject: "We got your message — SPL@T",
        html: `
          <div style="font-family:Inter,system-ui,sans-serif;color:#0a0a0a">
            <h1 style="color:#851825;margin-bottom:16px">Thanks for contacting SPL@T 💦</h1>
            <p style="margin:0 0 12px;line-height:1.6">
              We received your message and the crew will respond shortly. If it is urgent, reply to this email and mark it hot.
            </p>
            <p style="margin:0;color:#555;font-size:13px">Stay bold. Stay shameless.<br/>The SPL@T Team</p>
          </div>
        `.trim(),
      });
    } catch (emailErr) {
      console.warn("Contact confirmation email failed", emailErr);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Unhandled contact form error", error);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
