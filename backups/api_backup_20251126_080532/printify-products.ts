import type { NextApiRequest, NextApiResponse } from "next";
import { getPrintifyProducts, PrintifyProduct } from "@/lib/printifyClient";

type ApiProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  is_active: boolean;
};

function normalizeProducts(products: PrintifyProduct[]): ApiProduct[] {
  return products.map((p) => ({
    id: p.id,
    name: p.title || "SPL@T Product",
    description: p.description || "",
    price: Number((p.variants?.[0]?.price || 0) / 100),
    image: p.images?.[0]?.src || p.images?.[0]?.url || null,
    is_active: !p.is_archived,
  }));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const products = await getPrintifyProducts();
    const normalized = normalizeProducts(products);
    res.status(200).json({ products: normalized });
  } catch (error: any) {
    console.error("Printify fetch error:", error);
    res.status(500).json({ error: error?.message || "Failed to fetch Printify products" });
  }
}
