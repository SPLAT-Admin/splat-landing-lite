import type { NextApiRequest, NextApiResponse } from "next";
import { splatApiHandler, sendError, verifyCaptcha, validateForm, sendSuccess } from "@/lib";
import { sendEmail } from "@/lib/sendEmail";
import type { EmailParams } from "@/lib/sendEmail";
import type { AmbassadorForm } from "@/types";
import { supabaseService } from "@/lib/supabaseClient";

/**
 * POST /api/ambassador
 * Validates payload, verifies captcha, stores application in Supabase, and emails a confirmation.
 */
export default splatApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return sendError(res, 405, "Method Not Allowed");

  const body: AmbassadorForm = req.body;

  // 1) Validate fields
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
    labels: {
      first_name: "First name",
      last_name: "Last name",
      email: "Email",
      dob: "Date of birth",
      city: "City",
      state: "State",
      social_media_handles: "Social handles",
      number_of_followers: "Followers",
      qualifications_why: "Qualifications",
      captchaToken: "Captcha",
    },
  });

  if (!valid) return sendError(res, 400, errors.join(", "));

  // 2) Verify CAPTCHA (Turnstile)
  const captchaOK = await verifyCaptcha(body.captchaToken);
  if (!captchaOK) return sendError(res, 403, "CAPTCHA verification failed");

  // 3) Persist to Supabase
  const { error } = await supabaseService.from("ambassador").insert([
    {
      ...body,
      status: "pending",
      email: String(body.email).trim().toLowerCase(),
    },
  ]);

  if (error) {
    console.error("❌ Supabase insert error:", error);
    return sendError(res, 500, "Failed to save ambassador data");
  }

  // 4) Send confirmation email (non-blocking is fine, but we'll await to surface errors)
  const to = String(body.email).trim().toLowerCase();
  const preferred = (body as any).preferred_name || body.first_name;

  const emailResult = await sendEmail({
    to,
    subject: "You're in! Thanks for applying to be a SPL@T Ambassador 💦",
    html: `
      <p>Hey ${preferred || "there"},</p>
      <p>Thanks for applying to be a <strong>SPL@T Ambassador</strong>. We’ll review your submission and get back to you soon.</p>
      <p>Until then, stay sexy. Stay bold. Stay SPL@T.</p>
      <br/>
      <p>– The SPL@T Team</p>
    `,
  } as EmailParams);

  if (!emailResult.success) return sendError(res, 500, "Failed to send confirmation email");

  return sendSuccess(res, "Application submitted successfully");
});
