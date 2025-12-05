import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .schema("marketing")
    .from("products")
    .select("id, name, category, is_active, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error });
  }

  return res.status(200).json({
    message: data?.length
      ? `✅ ${data.length} active merch items visible`
      : "❌ No active merch found",
    sample: data?.slice(0, 3) || [],
  });
}
