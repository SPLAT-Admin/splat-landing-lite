import axios from "axios";

type PrintifyImage = { src?: string; url?: string };
type PrintifyVariant = { price?: number };
export type PrintifyProduct = {
  id: string;
  title?: string;
  description?: string;
  images?: PrintifyImage[];
  variants?: PrintifyVariant[];
  is_archived?: boolean;
};

const PRINTIFY_API_KEY = process.env.PRINTIFY_API_KEY;
const PRINTIFY_API_URL = process.env.PRINTIFY_API_URL || "https://api.printify.com/v1";

if (!PRINTIFY_API_KEY) {
  console.warn("⚠️ Missing PRINTIFY_API_KEY in environment variables.");
}

export const printifyClient = axios.create({
  baseURL: PRINTIFY_API_URL,
  headers: {
    Authorization: `Bearer ${PRINTIFY_API_KEY}`,
    "Content-Type": "application/json",
  },
});

function extractFirst<T>(data: any): T | undefined {
  if (!data) return undefined;
  if (Array.isArray(data)) return data[0];
  if (Array.isArray(data?.data)) return data.data[0];
  if (Array.isArray(data?.shops)) return data.shops[0];
  return undefined;
}

function extractArray<T = any>(data: any): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

// Fetch shop ID dynamically
export async function getShopId() {
  const res = await printifyClient.get("/shops.json");
  const shop = extractFirst<{ id: string }>(res.data);
  return shop?.id;
}

// Fetch products
export async function getPrintifyProducts(): Promise<PrintifyProduct[]> {
  const shopId = await getShopId();
  if (!shopId) throw new Error("No Printify shop ID found.");
  const res = await printifyClient.get(`/shops/${shopId}/products.json`);
  return extractArray<PrintifyProduct>(res.data);
}
