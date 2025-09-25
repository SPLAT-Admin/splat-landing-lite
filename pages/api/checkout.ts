import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";
import { sendEmail } from "@/lib/sendEmail";

const supabase = getSupabaseServiceClient();

const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { orderId, customer } = req.body ?? {};
    const name = customer?.name as string | undefined;
    const email = customer?.email as string | undefined;

    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({ ok: false, error: "orderId is required." });
    }
    if (!name || !name.trim()) {
      return res.status(400).json({ ok: false, error: "Customer name is required." });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: "Valid customer email is required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    // Fetch the order and related product
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(
        "id,status,product_id,total_amount,product:product_id (name,price),customer_email"
      )
      .eq("id", orderId)
      .maybeSingle();

    if (orderError) {
      console.error("checkout order fetch error", orderError);
      return res.status(500).json({ ok: false, error: "Unable to load order." });
    }
    if (!order) {
      return res.status(404).json({ ok: false, error: "Order not found." });
    }
    if (order.status === "completed") {
      return res.status(200).json({ ok: true, data: { orderId: order.id, redirectTo: "/thankyou" } });
    }

    // Upsert customer row
    const { data: customerRow, error: customerError } = await supabase
      .from("customers")
      .upsert({ email: normalizedEmail, name: trimmedName }, { onConflict: "email" })
      .select("id")
      .maybeSingle();

    if (customerError) {
      console.error("checkout customer upsert error", customerError);
      return res.status(500).json({ ok: false, error: "Failed to create customer." });
    }

    const customerId = customerRow?.id;

    // Mock fulfillment ID
    const fulfillmentId = `FULFIL-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Update the order to completed
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "completed",
        customer_id: customerId,
        customer_email: normalizedEmail,
        fulfillment_id: fulfillmentId,
        fulfilled_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("checkout order update error", updateError);
      return res.status(500).json({ ok: false, error: "Failed to complete order." });
    }

    // Send confirmation email
    try {
      const firstProduct = Array.isArray(order.product)
        ? order.product[0]
        : order.product;

      const productName = firstProduct?.name ?? "SPL@T Drop";
      const productPrice = firstProduct?.price ?? order.total_amount;
      const currencyPrice = `$${Number(productPrice).toFixed(2)}`;

      await sendEmail({
        to: normalizedEmail,
        subject: `Order Confirmed — ${productName} | SPL@T`,
        html: `
          <div style="font-family:Inter,system-ui,sans-serif;color:#0a0a0a">
            <h1 style="color:#851825;margin-bottom:16px">💦 Your SPL@T order is locked.</h1>
            <p style="margin:0 0 12px;line-height:1.6">Hey ${trimmedName},</p>
            <p style="margin:0 0 12px;line-height:1.6">
              Thanks for checking out with <strong>${productName}</strong>. We're prepping it for fulfillment now.
            </p>
            <p style="margin:0 0 12px;line-height:1.6">
              <strong>Order Total:</strong> ${currencyPrice}<br/>
              <strong>Order ID:</strong> ${orderId}
            </p>
            <p style="margin:0;color:#555;font-size:13px">Stay shameless.<br/>The SPL@T Team</p>
          </div>
        `.trim(),
      });
    } catch (emailErr) {
      console.warn("checkout confirmation email failed", emailErr);
    }

    return res.status(200).json({ ok: true, data: { orderId, redirectTo: "/thankyou" } });
  } catch (error) {
    console.error("checkout unhandled", error);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
 