import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";

const supabase = getSupabaseServiceClient();

type ResponseData =
  | { success: true; id: string }
  | { success: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ success: false, error: "Forbidden" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body ?? {};

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password.trim()) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password: password.trim(),
      email_confirm: true,
      user_metadata: { role: "admin" },
    });

    if (error || !data?.user?.id) {
      const message = error?.message ?? "Unable to create admin user";
      return res.status(500).json({ success: false, error: message });
    }

    return res.status(200).json({ success: true, id: data.user.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return res.status(500).json({ success: false, error: message });
  }
}
