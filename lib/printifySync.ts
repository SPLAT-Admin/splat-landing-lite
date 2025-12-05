import axios from "axios";

const PRINTIFY_API_URL = "https://api.printify.com/v1";
const SHOP_ID = process.env.PRINTIFY_SHOP_ID || "24500968";
const API_KEY = process.env.PRINTIFY_API_KEY!;

export async function fetchPrintifyProducts() {
  const { data } = await axios.get(`${PRINTIFY_API_URL}/shops/${SHOP_ID}/products.json`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data;
}
