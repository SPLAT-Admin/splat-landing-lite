import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: "marketing" } }
  );

  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, category, image_url, is_active")
      .eq("is_active", true)
      .order("category", { ascending: true });

    if (error) throw error;
    return res.status(200).json({ ok: true, count: data?.length || 0, products: data });
  } catch (err: any) {
    console.error("🚨 API merch fetch error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
