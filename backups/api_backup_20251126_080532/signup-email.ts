import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseService as supabase } from "@/lib/supabaseService";
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail";

async function verifyTurnstile(token: string) {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret: process.env.CLOUDFLARE_SECRET_KEY!,
      response: token,
    }),
  });
  const data = await res.json();
  return data.success === true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, token } = req.body;
  if (!email || !token) return res.status(400).json({ error: "Missing email or CAPTCHA" });

  const valid = await verifyTurnstile(token);
  if (!valid) return res.status(400).json({ error: "CAPTCHA validation failed" });

  const { error } = await supabase.schema('marketing').from("email_signups").insert({ email });
  if (error) return res.status(500).json({ error: error.message });

  await sendConfirmationEmail("signup", email);

  return res.status(200).json({ success: true });
}
