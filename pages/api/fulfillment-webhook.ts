import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";
import { sendEmail } from "@/lib/sendEmail";

const supabase = getSupabaseServiceClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { orderId, status, fulfillment_id } = req.body ?? {};

    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({ ok: false, error: "orderId is required." });
    }
    if (!status || !["processing", "shipped", "failed"].includes(status)) {
      return res.status(400).json({ ok: false, error: "Invalid status." });
    }

    // Update order row
    const { data: orderRow, error: orderError } = await supabase
      .from("orders")
      .update({
        status,
        fulfillment_id,
        ...(status === "shipped" ? { fulfilled_at: new Date().toISOString() } : {}),
      })
      .eq("id", orderId)
      .select(
        "id, customer_email, product:product_id (name)"
      )
      .maybeSingle();

    if (orderError) {
      console.error("fulfillment webhook update error", orderError);
      return res.status(500).json({ ok: false, error: "Failed to update order." });
    }
    if (!orderRow) {
      return res.status(404).json({ ok: false, error: "Order not found." });
    }

    // Send shipping confirmation email if status is shipped
    if (status === "shipped" && orderRow.customer_email) {
      try {
        const firstProduct = Array.isArray(orderRow.product)
          ? orderRow.product[0]
          : orderRow.product;
        const productName = firstProduct?.name ?? "Your SPL@T order";

        await sendEmail({
          to: orderRow.customer_email,
          subject: `Shipped — ${productName} | SPL@T`,
          html: `
            <div style="font-family:Inter,system-ui,sans-serif;color:#0a0a0a">
              <h1 style="color:#851825;margin-bottom:16px">💦 Shipped: ${productName}</h1>
              <p style="margin:0 0 12px;line-height:1.6">
                Your order is speeding through the SPL@TVerse and will splash down soon.
              </p>
              <p style="margin:0;color:#555;font-size:13px">Stay shameless.<br/>The SPL@T Team</p>
            </div>
          `.trim(),
        });
      } catch (emailErr) {
        console.warn("fulfillment webhook email failed", emailErr);
      }
    }

    return res.status(200).json({ ok: true, data: { orderId, status } });
  } catch (error) {
    console.error("fulfillment webhook unhandled", error);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
