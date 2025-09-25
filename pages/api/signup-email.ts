import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";
import { sendEmail } from "@/lib/sendEmail";

const supabaseService = getSupabaseServiceClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { email } = req.body as { email?: string };
    if (!email || !/.+@.+\..+/.test(email.trim())) {
      return res.status(400).json({ ok: false, error: "Valid email is required." });
    }

    const normalized = email.trim().toLowerCase();

    const { error: insertError } = await supabaseService
      .from("email_signups")
      .upsert({ email: normalized }, { onConflict: "email" });

    if (insertError) {
      console.error("Signup insert error", insertError);
      return res.status(500).json({ ok: false, error: "Unable to save your signup right now." });
    }

    try {
      await sendEmail({
        to: normalized,
        subject: "Welcome to SPL@T",
        html: `
          <div style="font-family:Inter,system-ui,sans-serif;color:#0a0a0a">
            <h1 style="color:#851825;margin-bottom:16px">You're in the SPL@TVerse 💦</h1>
            <p style="margin:0 0 12px;line-height:1.6">
              Thanks for joining the SPL@T email list. Expect bold updates, beta drops, and filthy-good news soon.
            </p>
            <p style="margin:0;color:#555;font-size:13px">Stay shameless,<br/>Team SPL@T</p>
          </div>
        `.trim(),
      });
    } catch (emailErr) {
      console.warn("Resend welcome email failed", emailErr);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Unhandled signup error", error);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
