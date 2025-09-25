import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";

const supabase = getSupabaseServiceClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  if (typeof id !== "string") {
    console.warn("products/[id] missing id", id);
    return res.status(400).json({ ok: false, error: "Product id is required." });
  }

  if (method !== "PATCH") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { is_active: isActive, featured } = body ?? {};

    if (typeof isActive !== "boolean" && typeof featured !== "boolean") {
      return res.status(400).json({ ok: false, error: "At least one boolean (is_active or featured) is required." });
    }

    const updatePayload: Record<string, boolean> = {};
    if (typeof isActive === "boolean") updatePayload.is_active = isActive;
    if (typeof featured === "boolean") updatePayload.featured = featured;

    const { data, error } = await supabase
      .from("products")
      .update(updatePayload)
      .eq("id", id)
      .select("id,is_active,featured")
      .maybeSingle();

    if (error) {
      console.error("products/[id] update error", error);
      return res.status(500).json({ ok: false, error: "Failed to update product." });
    }

    if (!data) {
      return res.status(404).json({ ok: false, error: "Product not found." });
    }

    return res.status(200).json({ ok: true, data });
  } catch (err) {
    console.error("products/[id] unexpected", err);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
