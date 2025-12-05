import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRINTIFY_API_KEY = process.env.PRINTIFY_API_KEY;
const SHOP_ID = "24500968"; // your SPL@T Merch HQ ID

function detectCategory(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("hat") || lower.includes("cap")) return "Hats";
  if (lower.includes("shirt") || lower.includes("tee") || lower.includes("hoodie")) return "Apparel";
  if (lower.includes("mug")) return "Drinkware";
  if (lower.includes("wrap") || lower.includes("paper")) return "Accessories";
  if (lower.includes("stocking") || lower.includes("christmas") || lower.includes("holiday")) return "Seasonal";
  return "Misc";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  if (!PRINTIFY_API_KEY) {
    return res.status(500).json({ error: "Missing PRINTIFY_API_KEY" });
  }

  try {
    console.log("🔄 Fetching Printify products…");
    const response = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products.json`, {
      headers: { Authorization: `Bearer ${PRINTIFY_API_KEY}` },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Printify API error: ${response.status} ${text}`);
    }

    const { data: products = [] } = await response.json();
    let inserted = 0;

    for (const product of products) {
      const published = product.visible === true || product.status === "published";
      const category = detectCategory(product.title);

      const { error } = await supabaseAdmin
        .schema("marketing")
        .from("products")
        .upsert({
          id: product.id,
          name: product.title,
          image_url: product.images?.[0]?.src || null,
          category,
          is_active: true,
          published,
        }, { onConflict: "id" });

      if (error) console.error("❌ Upsert error:", error);
      else inserted++;
    }

    console.log(`✅ Printify sync complete: ${inserted} items updated`);
    return res.status(200).json({ message: "✅ Printify sync complete with published filter", count: inserted });
  } catch (err: any) {
    console.error("Sync error:", err);
    return res.status(500).json({ error: err.message || "Sync failed" });
  }
}
