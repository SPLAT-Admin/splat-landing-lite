import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  // Fail fast so callers receive clear feedback during boot.
  throw new Error("RESEND_API_KEY is not configured");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
