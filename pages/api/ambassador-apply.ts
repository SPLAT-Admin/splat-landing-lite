import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServiceClient } from "@/lib/supabaseClient";
import { sendEmail } from "@/lib/sendEmail";

const supabaseService = getSupabaseServiceClient();

const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const body = req.body ?? {};
    const requiredFields = [
      "first_name",
      "last_name",
      "dob",
      "email",
      "city",
      "state",
      "social_media_handles",
      "number_of_followers",
      "qualifications_why",
    ];

    for (const field of requiredFields) {
      if (typeof body[field] === "undefined" || String(body[field]).trim() === "") {
        return res.status(400).json({ ok: false, error: `Missing field: ${field}` });
      }
    }

    if (!isValidEmail(body.email)) {
      return res.status(400).json({ ok: false, error: "Invalid email address." });
    }

    const followerCount = Number(body.number_of_followers);
    if (!Number.isFinite(followerCount) || followerCount < 0) {
      return res.status(400).json({ ok: false, error: "Follower count must be a positive number." });
    }

    const insertPayload = {
      first_name: String(body.first_name).trim(),
      last_name: String(body.last_name).trim(),
      preferred_name: body.preferred_name ? String(body.preferred_name).trim() : null,
      dob: body.dob,
      email: String(body.email).trim().toLowerCase(),
      city: String(body.city).trim(),
      state: String(body.state).trim(),
      social_media_handles: String(body.social_media_handles).trim(),
      number_of_followers: followerCount,
      qualifications_why: String(body.qualifications_why).trim(),
      referral: body.referral ? String(body.referral).trim() : null,
      status: "pending",
    };

    const { error: insertError } = await supabaseService.from("ambassador").insert([insertPayload]);
    if (insertError) {
      console.error("Ambassador insert error", insertError);
      return res.status(500).json({ ok: false, error: "Failed to save application." });
    }

    try {
      await sendEmail({
        to: insertPayload.email,
        subject: "SPL@T Ambassador Application Received",
        html: `
          <div style="font-family:Inter,system-ui,sans-serif;color:#0a0a0a">
            <h1 style="color:#851825;margin-bottom:16px">You applied to be a SPL@T Ambassador 💦</h1>
            <p style="margin:0 0 12px;line-height:1.6">
              Thanks for throwing your name in the ring. Our team is reviewing applications and will get back soon with next steps.
            </p>
            <p style="margin:0;color:#555;font-size:13px">Stay bold. Stay shameless.<br/>The SPL@T Team</p>
          </div>
        `.trim(),
      });
    } catch (emailErr) {
      console.warn("Ambassador confirmation email failed", emailErr);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Unhandled ambassador apply error", error);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
