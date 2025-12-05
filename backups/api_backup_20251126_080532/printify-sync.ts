import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPrintifyProducts } from "@/lib/printifySync";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function inferCategory(title = "") {
  const t = title.toLowerCase();
  if (t.includes("shirt") || t.includes("tee")) return "Apparel";
  if (t.includes("hat") || t.includes("cap") || t.includes("beanie")) return "Hats";
  if (t.includes("mug") || t.includes("cup")) return "Drinkware";
  if (t.includes("stocking") || t.includes("sock")) return "Seasonal";
  if (t.includes("wrap") || t.includes("paper") || t.includes("gift")) return "Accessories";
  return "Misc";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const raw = await fetchPrintifyProducts();
    const products = (Array.isArray(raw?.data) ? raw.data : raw) ?? [];

    const formatted = products.map((p: any) => ({
      printify_id: p.id,
      name: p.title,
      description: p.description || "",
      price: (p.variants?.[0]?.price || 0) / 100,
      image_url: p.images?.[0]?.src || "",
      category: inferCategory(p.title),
      is_active: true,
    }));

    const { error } = await supabase
      .schema("marketing")
      .from("products")
      .upsert(formatted, { onConflict: "printify_id" });

    if (error) throw error;

    return res.status(200).json({
      message: "✅ Printify sync complete with categories",
      count: formatted.length,
    });
  } catch (err: any) {
    console.error("Sync error:", err);
    res.status(500).json({ error: err?.message || "Printify sync failed" });
  }
}
