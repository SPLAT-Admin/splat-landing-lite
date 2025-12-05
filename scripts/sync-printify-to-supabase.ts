import { createClient } from "@supabase/supabase-js";
import { getPrintifyProducts } from "../lib/printifyClient.js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

(async function syncPrintifyProducts() {
  console.log("🚀 Syncing Printify products → Supabase.marketing.products...");
  const products = await getPrintifyProducts();
  if (!Array.isArray(products)) throw new Error("Unexpected Printify response.");

  for (const p of products) {
    const record = {
      id: p.id,
      name: p.title,
      description: p.description || "",
      price: (p.variants?.[0]?.price || 0) / 100,
      image_url: p.images?.[0]?.src || null,
      is_active: !p.is_archived,
      featured: false,
    };

    const { error } = await supabase
      .schema("marketing")
      .from("products")
      .upsert(record, { onConflict: "id" });
    if (error) console.error("❌ Error syncing product:", record.name, error.message);
    else console.log(`✅ Synced: ${record.name}`);
  }

  console.log("🎉 Printify → Supabase sync complete.");
})();
