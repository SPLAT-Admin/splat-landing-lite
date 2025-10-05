import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

console.log("🔑 ENV CHECK (reset-password):", {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅" : "❌",
  serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅" : "❌",
  nodeEnv: process.env.NODE_ENV,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service role key
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Forbidden in production" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ error: "Missing email or newPassword" });
  }

  const { data, error } = await supabase.auth.admin.updateUserByEmail(email, {
    password: newPassword,
  });

  if (error) {
    console.error("❌ Reset error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ success: true, user: data });
}
