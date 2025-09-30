import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";

const supabase = getSupabaseServiceClient();

type ResponseData =
  | { success: true }
  | { success: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ success: false, error: "Forbidden" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { email, newPassword } = req.body ?? {};

    if (typeof email !== "string" || typeof newPassword !== "string" || !email.trim() || !newPassword.trim()) {
      return res.status(400).json({ success: false, error: "Email and newPassword are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: userLookup, error: lookupError } = await supabase.auth.admin.listUsers({
      email: normalizedEmail,
      page: 1,
      perPage: 1,
    });

    if (lookupError) {
      return res.status(500).json({ success: false, error: lookupError.message });
    }

    const user = userLookup?.users?.[0];
    if (!user?.id) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword.trim(),
    });

    if (updateError) {
      return res.status(500).json({ success: false, error: updateError.message });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return res.status(500).json({ success: false, error: message });
  }
}
