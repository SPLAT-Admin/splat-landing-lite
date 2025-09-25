import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";

const supabase = getSupabaseServiceClient();

const PRINTIFY_API_BASE = "https://api.printify.com/v1";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const PRINTIFY_API_TOKEN = process.env.PRINTIFY_API_TOKEN;
  const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID;

  if (!PRINTIFY_API_TOKEN || !PRINTIFY_SHOP_ID) {
    console.error("printify-products missing configuration", {
      hasToken: Boolean(PRINTIFY_API_TOKEN),
      hasShop: Boolean(PRINTIFY_SHOP_ID),
    });
    return res.status(500).json({ ok: false, error: "Printify configuration missing." });
  }

  try {
    const response = await fetch(
      `${PRINTIFY_API_BASE}/shops/${PRINTIFY_SHOP_ID}/products.json`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PRINTIFY_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      console.error("printify-products API error", { status: response.status, body });
      return res.status(response.status).json({
        ok: false,
        error: body?.error || "Printify API error",
        details: body,
      });
    }

    const printifyData = await response.json();
    const items = Array.isArray(printifyData?.data) ? printifyData.data : [];

    let inserted = 0;
    let updated = 0;

    for (const item of items) {
      const productId = item?.id || item?.product_id;
      if (!productId) continue;

      const name = item?.title || item?.name || "SPL@T Product";
      const description = item?.description || null;
      const priceCents = Array.isArray(item?.variants)
        ? item.variants[0]?.price
        : item?.variants?.price;
      const price = priceCents ? Number(priceCents) / 100 : 0;

      const imageUrl = Array.isArray(item?.images) && item.images.length
        ? item.images[0]?.src || item.images[0]?.url
        : item?.featured_image || null;

      const payload = {
        printify_id: String(productId),
        name,
        description,
        price,
        image_url: imageUrl,
        is_active: false,
      };

      const { data, error } = await supabase
        .from("products")
        .upsert(payload, { onConflict: "printify_id" })
        .select("id,is_active")
        .maybeSingle();

      if (error) {
        console.error("printify-products upsert error", { productId, error });
        continue;
      }

      if (data) {
        if (data.is_active) {
          updated += 1;
        } else {
          inserted += 1;
        }
      } else {
        inserted += 1;
      }
    }

    console.log("printify-products sync complete", {
      fetched: items.length,
      inserted,
      updated,
    });

    return res.status(200).json({
      ok: true,
      data: {
        fetched: items.length,
        inserted,
        updated,
      },
    });
  } catch (error) {
    console.error("printify-products unexpected", error);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
