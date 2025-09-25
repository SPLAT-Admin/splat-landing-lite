import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";

const supabase = getSupabaseServiceClient();
const PRINTIFY_API_BASE = "https://api.printify.com/v1";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const PRINTIFY_API_TOKEN = process.env.PRINTIFY_API_TOKEN;
  const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID;

  if (!PRINTIFY_API_TOKEN || !PRINTIFY_SHOP_ID) {
    console.error("printify-order missing configuration", {
      hasToken: Boolean(PRINTIFY_API_TOKEN),
      hasShop: Boolean(PRINTIFY_SHOP_ID),
    });
    return res.status(500).json({ ok: false, error: "Printify configuration missing." });
  }

  try {
    const { orderId } = req.body ?? {};
    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({ ok: false, error: "orderId is required." });
    }

    // Fetch order + related product
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(
        `
        id,
        status,
        quantity,
        total_amount,
        customer_email,
        customer_id,
        product:product_id (
          id,
          name,
          description,
          price,
          image_url,
          is_active
        )
      `
      )
      .eq("id", orderId)
      .maybeSingle();

    if (orderError) {
      console.error("printify-order fetch error", orderError);
      return res.status(500).json({ ok: false, error: "Unable to fetch order." });
    }
    if (!order) {
      return res.status(404).json({ ok: false, error: "Order not found." });
    }
    if (order.status !== "completed") {
      return res.status(400).json({ ok: false, error: "Order must be completed before fulfillment." });
    }

    // Normalize product relation (array or object)
    const firstProduct = Array.isArray(order.product) ? order.product[0] : order.product;
    if (!firstProduct) {
      return res.status(400).json({ ok: false, error: "Order product is missing." });
    }
    if (!firstProduct.is_active) {
      return res.status(400).json({ ok: false, error: "Product is not active." });
    }

    // Customer info
    let customerName: string | null = null;
    let customerEmail: string | null = order.customer_email ?? null;

    if (order.customer_id) {
      const { data: customerRow, error: customerError } = await supabase
        .from("customers")
        .select("id,name,email")
        .eq("id", order.customer_id)
        .maybeSingle();

      if (customerError) {
        console.warn("printify-order customer fetch error", customerError);
      } else if (customerRow) {
        customerName = customerRow.name ?? customerName;
        customerEmail = customerRow.email ?? customerEmail;
      }
    }

    if (!customerEmail) {
      return res.status(400).json({ ok: false, error: "Customer email missing. Complete checkout first." });
    }
    if (!customerName) {
      customerName = "SPL@T Customer";
    }

    const [firstName, ...lastNameParts] = customerName.split(" ");
    const lastName = lastNameParts.join(" ") || "Crew";

    // Printify payload
    const variantId = Number(process.env.PRINTIFY_DEFAULT_VARIANT_ID ?? "1");
    const printPrice = Number.isFinite(firstProduct.price)
      ? Math.round(firstProduct.price * 100)
      : 0;

    const printifyPayload = {
      external_id: order.id,
      label: firstProduct.name || "SPL@T Order",
      line_items: [
        {
          product_id: firstProduct.id,
          variant_id: variantId,
          quantity: order.quantity,
          sku: firstProduct.id,
          title: firstProduct.name,
          price: printPrice,
        },
      ],
      address_to: {
        first_name: firstName || "SPL@T",
        last_name: lastName || "Customer",
        email: customerEmail,
        phone: process.env.PRINTIFY_DEFAULT_PHONE || "8444208333",
        address1: process.env.PRINTIFY_DEFAULT_ADDRESS || "971 S University Ave",
        city: process.env.PRINTIFY_DEFAULT_CITY || "Provo",
        region: process.env.PRINTIFY_DEFAULT_REGION || "UT",
        zip: process.env.PRINTIFY_DEFAULT_ZIP || "84601",
        country: process.env.PRINTIFY_DEFAULT_COUNTRY || "US",
      },
      shipping_method: Number(process.env.PRINTIFY_DEFAULT_SHIPPING_METHOD ?? "1"),
      send_shipping_notification: false,
    };

    console.log("printify-order: sending payload", printifyPayload);

    // Call Printify API
    const response = await fetch(
      `${PRINTIFY_API_BASE}/shops/${PRINTIFY_SHOP_ID}/orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PRINTIFY_API_TOKEN}`,
        },
        body: JSON.stringify(printifyPayload),
      }
    );

    const printifyResponse = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("printify-order API error", { status: response.status, body: printifyResponse });
      return res.status(response.status).json({
        ok: false,
        error: printifyResponse?.error || "Printify API error",
        details: printifyResponse,
      });
    }

    const fulfillmentId =
      printifyResponse?.id ||
      printifyResponse?.order_id ||
      `PRINTIFY-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "processing",
        fulfillment_id: fulfillmentId,
        fulfillment_payload: {
          provider: "printify",
          requested_at: new Date().toISOString(),
          response: printifyResponse,
        },
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("printify-order update error", updateError);
      return res.status(500).json({ ok: false, error: "Failed to update order with fulfillment." });
    }

    console.log("printify-order success", { orderId, fulfillmentId });

    return res.status(200).json({
      ok: true,
      data: {
        orderId,
        fulfillment_id: fulfillmentId,
      },
    });
  } catch (error) {
    console.error("printify-order unexpected", error);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
