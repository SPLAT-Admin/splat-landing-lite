import type { NextApiRequest, NextApiResponse } from "next";
import { splatApiHandler, sendError, verifyCaptcha, validateForm, sendSuccess } from "@/lib";
import { sendEmail } from "@/lib/sendEmail";
import type { EmailParams } from "@/lib/sendEmail";
import type { AmbassadorForm } from "@/types";
import { supabaseService } from "@/lib/supabaseClient";

export default splatApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return sendError(res, 405, "Method Not Allowed");

  try {
    const body: AmbassadorForm = req.body;

    // 1) Validate
    const required = [
      "first_name",
      "last_name",
      "email",
      "dob",
      "city",
      "state",
      "social_media_handles",
      "number_of_followers",
      "qualifications_why",
      "captchaToken",
    ];

    const { valid, errors } = validateForm(body, required, {
      patterns: { email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      min: { qualifications_why: 5 },
      max: { first_name: 100, last_name: 100 },
    });
    if (!valid) return sendError(res, 400, errors.join(", "));

    // 2) Captcha
    const captchaOK = await verifyCaptcha(body.captchaToken);
    if (!captchaOK) return sendError(res, 403, "CAPTCHA verification failed");

    // 3) DB insert
    const { error } = await supabaseService.from("ambassador").insert([
      { ...body, status: "pending", email: String(body.email).trim().toLowerCase() },
    ]);
    if (error) {
      console.error("❌ Supabase insert error:", error);
      return sendError(res, 500, "Failed to save ambassador data");
    }

    // 4) Email (non-blocking: errors won't 500 the request)
    const to = String(body.email).trim().toLowerCase();
    const preferred = (body as any).preferred_name || body.first_name || "there";
    try {
      await sendEmail({
        to,
        subject: "You're in! Thanks for applying to be a SPL@T Ambassador 💦",
        html: `
          <p>Hey ${preferred},</p>
          <p>Thanks for applying to be a <strong>SPL@T Ambassador</strong>. We’ll review your submission and get back to you soon.</p>
          <p>Until then, stay sexy. Stay bold. Stay SPL@T.</p>
          <br/>
          <p>– The SPL@T Team</p>
        `,
      } as EmailParams);
    } catch (e) {
      console.warn("⚠️ Resend error (non-fatal):", e);
    }

    return sendSuccess(res, "Application submitted successfully");
  } catch (e) {
    console.error("/api/ambassador unhandled:", e);
    return sendError(res, 500, "Unexpected server error");
  }
});