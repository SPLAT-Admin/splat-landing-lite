import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";

const supabase = getSupabaseServiceClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { productId, quantity } = req.body ?? {};

    if (!productId || typeof productId !== "string") {
      return res.status(400).json({ ok: false, error: "productId is required." });
    }

    const parsedQuantity = Number(quantity);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ ok: false, error: "quantity must be a positive integer." });
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id,name,price,is_active")
      .eq("id", productId)
      .maybeSingle();

    if (productError) {
      console.error("create-order product error", productError);
      return res.status(500).json({ ok: false, error: "Unable to retrieve product." });
    }

    if (!product) {
      return res.status(404).json({ ok: false, error: "Product not found." });
    }

    if (!product.is_active) {
      return res.status(400).json({ ok: false, error: "Product is not currently available." });
    }

    const quantityNumber = parsedQuantity;
    const totalAmount = Number(product.price) * quantityNumber;

    const { data: order, error: insertError } = await supabase
      .from("orders")
      .insert([
        {
          product_id: product.id,
          quantity: quantityNumber,
          total_amount: totalAmount,
          status: "pending",
        },
      ])
      .select("id")
      .single();

    if (insertError) {
      console.error("create-order insert error", insertError);
      return res.status(500).json({ ok: false, error: "Failed to create order." });
    }

    return res.status(200).json({ ok: true, data: { orderId: order.id } });
  } catch (error) {
    console.error("create-order unhandled", error);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
