import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// --- CONFIG --- //
const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID!;
const PRINTIFY_API_KEY = process.env.PRINTIFY_API_KEY!;
const PRINTIFY_BASE = "https://api.printify.com/v1";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// --- HANDLER --- //
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  // 🧠 GET — fetch Printify products and optionally sync them into Supabase
  if (method === "GET") {
    try {
      const r = await fetch(`${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products.json`, {
        headers: { Authorization: `Bearer ${PRINTIFY_API_KEY}` },
      });

      const json = await r.json();
      const products = json.data || json;

      // Optional sync
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
            .schema("marketing").from("products")
            .upsert(productData, { onConflict: "id" });
          if (error) console.error("❌ Supabase sync error:", error);
        }
      }

      // Include categories for dropdown
      const { data: categories, error: catError } = await supabase
        .from("categories")
        .select("id,name,slug")
        .order("name");
      if (catError) console.error("⚠️ Category fetch error:", catError);

      return res.status(200).json({ ok: true, products, categories: categories || [] });
    } catch (err: any) {
      console.error("❌ Printify Fetch Error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  // 🚀 POST — create, publish/unpublish, or update category
  if (method === "POST") {
    const { action, id, publish, category_id, product, shop_url, title, price } = body;

    try {
      // 🆕 CREATE PRODUCT
      if (action === "create") {
        if (!product?.title || !product?.print_provider_id || !product?.blueprint_id) {
          return res.status(400).json({
            error:
              "Missing required product fields (title, print_provider_id, blueprint_id).",
          });
        }

        // 1️⃣ Create product in Printify
        const resp = await fetch(
          `${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products.json`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${PRINTIFY_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );

        const created = await resp.json();
        if (!resp.ok) throw new Error(created?.error || "Failed to create product");

        // 2️⃣ Mirror product in Supabase
        const productData = {
          id: created.id,
          external_id: created.id,
          title: created.title,
          description: created.description || "",
          image_url: created.images?.[0]?.src || "",
          visible: created.visible ?? true,
          published: created.visible ?? false,
          featured: false,
          price: (created.variants?.[0]?.price || 0) / 100,
          category_id: product.category_id || null,
        };
        await supabase.schema("marketing").from("products").upsert(productData, { onConflict: "id" });

        return res.status(200).json({
          ok: true,
          message: "✅ Product created successfully",
          product: created,
        });
      }

      // 📝 Generic field updates (shop_url, title, price)
      if (id && (typeof shop_url === "string" || typeof title === "string" || typeof price === "number")) {
        const updates: Record<string, any> = {};
        if (typeof shop_url === "string") updates.shop_url = shop_url;
        if (typeof title === "string") updates.title = title;
        if (typeof price === "number" && !Number.isNaN(price)) updates.price = price;

        if (Object.keys(updates).length) {
          const { error } = await supabase.schema("marketing").from("products").update(updates).eq("id", id);
          if (error) throw error;
          return res.status(200).json({ ok: true, message: "✅ Product updated" });
        }
      }

      // 🏷️ CATEGORY UPDATE
      if (category_id && id) {
        const { error } = await supabase
          .schema("marketing").from("products")
          .update({ category_id })
          .eq("id", id);
        if (error) throw error;

      return res.status(200).json({ ok: true, message: "✅ Category updated" });
    }

      // 📢 PUBLISH / UNPUBLISH
      if (id && typeof publish === "boolean") {
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

        const result = await resp.json();
        if (!resp.ok) throw new Error(result?.error || `Printify returned ${resp.status}`);

        // Reflect change in Supabase
        const { error } = await supabase
          .schema("marketing").from("products")
          .update({ published: publish })
          .eq("id", id);
        if (error) throw error;

        return res.status(200).json({
          ok: true,
          message: `✅ Product ${publish ? "published" : "unpublished"} successfully`,
        });
      }

      return res.status(400).json({ error: "Invalid request body." });
    } catch (err: any) {
      console.error("❌ Error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
