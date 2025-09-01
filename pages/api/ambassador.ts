// pages/api/ambassador.ts
import type { NextApiRequest, NextApiResponse } from "next";
import {
  splatApiHandler,
  sendError,
  sendSuccess,
  verifyCaptcha,
  validateForm,
} from "@/lib";
import { sendEmail } from "@/lib/sendEmail";
import type { AmbassadorForm } from "@/types";
import { supabaseService } from "@/lib/supabaseClient";

export default splatApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return sendError(res, 405, "Method Not Allowed");

  const body: AmbassadorForm = req.body;

  // 1) Validation
  const required = [
    "first_name", "last_name", "email", "dob", "city", "state",
    "social_media_handles", "number_of_followers", "qualifications_why", "captchaToken",
  ];

  const { valid, errors } = validateForm(body, required, {
    patterns: { email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    min: { qualifications_why: 5 },
    max: { first_name: 100, last_name: 100 },
  });
  if (!valid) {
    console.warn("Validation errors:", errors);
    return sendError(res, 400, `Validation failed: ${errors.join(", ")}`);
  }

  // 2) CAPTCHA Verification
  const captchaOK = await verifyCaptcha(body.captchaToken, req.headers["x-forwarded-for"] as string);
  if (!captchaOK) return sendError(res, 403, "CAPTCHA verification failed");

  // 3) Database Insert (omit captchaToken and ensure correct types)
  const { captchaToken, number_of_followers, ...rest } = body;
  const insertPayload = {
    ...rest,
    number_of_followers: number_of_followers ? Number(number_of_followers) : null,
    status: "pending",
    email: body.email.trim().toLowerCase(),
  };

  const { error: supaError } = await supabaseService
    .from("ambassador")
    .insert([insertPayload]);
  if (supaError) {
    console.error("Supabase insert error:", supaError);
    return sendError(res, 500, "Failed to save application");
  }

  // 4) Send Confirmation Email (fire and forget)
  try {
    await sendEmail({
      to: insertPayload.email,
      subject: "Thanks for applying to be a SPL@T Ambassador 💦",
      html: `
        <p>Hey ${body.first_name || "there"},</p>
        <p>Thank you for applying to become a <strong>SPL@T Ambassador</strong>. We’re reviewing your application and will get back soon.</p>
        <p>Stay bold. Stay you. Stay SPL@T.</p>
        <br/><p>– The SPL@T Team</p>
      `,
    });
  } catch (emailErr) {
    console.warn("ReSend failure (non-fatal):", emailErr);
  }

  // 5) Return Success + Redirect Instruction
  return sendSuccess(res, "Application submitted. Redirecting now...", undefined, "/thank-you");
});
