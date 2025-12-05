import type { NextApiRequest, NextApiResponse } from "next";

const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID!;
const PRINTIFY_API_KEY = process.env.PRINTIFY_API_KEY!;
const PRINTIFY_BASE = "https://api.printify.com/v1";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method === "GET") {
    try {
      const response = await fetch(
        `${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products.json`,
        { headers: { Authorization: `Bearer ${PRINTIFY_API_KEY}` } }
      );
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Printify GET failed: ${response.status} ${text}`);
      }
      const data = await response.json();
      return res.status(200).json({ ok: true, products: data.data || data });
    } catch (err: any) {
      console.error("❌ Printify Fetch Error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  if (method === "POST") {
    const { id, publish } = body || {};
    if (!id) return res.status(400).json({ error: "Missing product ID" });

    try {
      const endpoint = publish
        ? `${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products/${id}/publish.json`
        : `${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products/${id}/publishing_failed.json`;

      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PRINTIFY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: publish ? "succeeded" : "failed",
        }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Printify POST failed: ${resp.status} ${text}`);
      }

      return res.status(200).json({
        ok: true,
        message: `✅ Product ${publish ? "published" : "unpublished"} successfully`,
      });
    } catch (err: any) {
      console.error("❌ Printify Publish Error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
