import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID!;
const PRINTIFY_API_KEY = process.env.PRINTIFY_API_KEY!;
const PRINTIFY_BASE = "https://api.printify.com/v1";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  if (method === "GET") {
    try {
      const r = await fetch(`${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products.json`, {
        headers: { Authorization: `Bearer ${PRINTIFY_API_KEY}` },
      });
      const json = await r.json();
      const products = json.data || json;

      if (query.sync === "true") {
        console.log("🔄 Syncing Printify products to Supabase...");
        for (const p of products) {
          const productData = {
            id: p.id,
            external_id: p.id,
            title: p.title,
            description: p.description || "",
            image_url: p.images?.[0]?.src || "",
            visible: p.visible ?? true,
            published: p.visible ?? false,
            featured: false,
            price: (p.variants?.[0]?.price || 0) / 100,
          };

          const { error } = await supabase
            .from("products")
            .upsert(productData, { onConflict: "id" });

          if (error) console.error("❌ Supabase upsert error:", error);
        }
      }

      const { data: categories, error: catError } = await supabase
        .from("categories")
        .select("id,name,slug")
        .order("name");

      if (catError) console.error("⚠️ Category fetch error:", catError);

      return res.status(200).json({
        ok: true,
        products,
        categories: categories || [],
      });
    } catch (err: any) {
      console.error("❌ Printify Fetch Error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  if (method === "POST") {
    const { id, publish, category_id } = body;
    if (!id) return res.status(400).json({ error: "Missing product ID" });

    try {
      if (category_id) {
        const { error } = await supabase
          .from("products")
          .update({ category_id })
          .eq("id", id);

        if (error) throw error;

        return res
          .status(200)
          .json({ ok: true, message: "✅ Category updated successfully" });
      }

      const endpoint = publish
        ? `${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products/${id}/publish.json`
        : `${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products/${id}/publishing_failed.json`;

      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PRINTIFY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: publish ? "succeeded" : "failed" }),
      });

      if (!resp.ok) throw new Error(`Printify returned ${resp.status}`);

      const { error } = await supabase
        .from("products")
        .update({ published: publish })
        .eq("id", id);

      if (error) throw error;

      return res.status(200).json({
        ok: true,
        message: `✅ Product ${publish ? "published" : "unpublished"} successfully`,
      });
    } catch (err: any) {
      console.error("❌ Error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
