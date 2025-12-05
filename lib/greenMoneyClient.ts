import axios from "axios";

const baseURL = process.env.GREENMONEY_API_URL || "";
const clientId = process.env.GREENMONEY_CLIENT_ID || "";
const apiPassword = process.env.GREENMONEY_API_PASSWORD || "";

export const greenMoneyClient = axios.create({
  baseURL,
  auth: {
    username: clientId,
    password: apiPassword,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export async function initiateAchPayment(data: {
  amount: number;
  accountNumber: string;
  routingNumber: string;
  name: string;
  email?: string;
  description?: string;
}) {
  try {
    const res = await greenMoneyClient.post("/payments", data);
    return res.data;
  } catch (err: any) {
    console.error("Green Money error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Green Money request failed");
  }
}
