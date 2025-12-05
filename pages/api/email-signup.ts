import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";
import { validateEmail } from "@/lib/validateForm";
import { resend } from "@/lib/resendClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.body as { email?: string };
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const { error } = await supabase
      .from("email_signups")
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) throw error;

    await resend.emails.send({
      from: "SPL@T <no-reply@usesplat.com>",
      to: email,
      subject: "Welcome to SPL@T Updates",
      html: `<p>Thanks for signing up for SPL@T news and updates.</p>`,
    });

    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    console.error("Email signup failed:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
