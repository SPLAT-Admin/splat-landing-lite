// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const CLOUDFLARE_SECRET_KEY = process.env.CLOUDFLARE_SECRET_KEY!;

const FROM_EMAIL = "SPL@T <noreply@usesplat.com>";
const BRAND_NAME = process.env.BRAND_NAME || "SPL@T";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const resend = new Resend(RESEND_API_KEY);

const isValidEmail = (v: string) => /.+@.+\..+/.test(v.trim()) && v.trim().length <= 320;

async function verifyTurnstile(token: string, remoteip?: string) {
  const body = new URLSearchParams({
    secret: CLOUDFLARE_SECRET_KEY,
    response: token,
  });
  if (remoteip) body.set("remoteip", remoteip);

  const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!resp.ok) return false;
  const data = await resp.json();
  return !!data?.success;
}

const rateBucket = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = Number(process.env.SIGNUP_RATE_WINDOW_MS || 60_000);
const RATE_LIMIT_MAX = Number(process.env.SIGNUP_RATE_MAX || 5);

function checkRateLimit(ip: string) {
  const now = Date.now();
  const bucket = rateBucket.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBucket.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (bucket.count >= RATE_LIMIT_MAX) return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  bucket.count++;
  return { allowed: true };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method Not Allowed" });

  try {
    const {
      email,
      firstName,
      lastName,
      marketingConsent,
      turnstileToken,
      referralCode,
      signupSource,
    } = req.body;

    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      res.setHeader("Retry-After", String(rl.retryAfter));
      return res.status(429).json({ ok: false, error: "Too many attempts. Please try again soon." });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email address." });
    }

    if (!turnstileToken || typeof turnstileToken !== "string") {
      return res.status(400).json({ ok: false, error: "Captcha token missing." });
    }

    const captchaOK = await verifyTurnstile(turnstileToken, ip);
    if (!captchaOK) return res.status(400).json({ ok: false, error: "Captcha verification failed." });

    const ref = typeof referralCode === "string" && referralCode.trim() !== ""
      ? referralCode.trim().toUpperCase()
      : null;
    if (ref && !/^[A-Z0-9]{6,8}$/.test(ref)) {
      return res.status(400).json({ ok: false, error: "Invalid referral code." });
    }

    const allowedSources = new Set(["website", "referral", "social_media", "ads", "other"]);
    const src = allowedSources.has(signupSource) ? signupSource : "website";

    const { error: dbError } = await supabase.from("email_signups").insert([
      {
        email: email.trim().toLowerCase(),
        first_name: firstName || null,
        last_name: lastName || null,
        marketing_consent: !!marketingConsent,
        signup_source: src,
        referral_code: ref,
      },
    ]);

    if (dbError) {
      if ((dbError as any)?.code === "23505" || /duplicate|unique/i.test(dbError.message)) {
        return res.status(409).json({ ok: true, message: "Already subscribed", redirectTo: "/thank-you" });
      }
      console.error("Signup DB error:", dbError);
      return res.status(500).json({ ok: false, error: "Database error." });
    }

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `You're on the list — ${BRAND_NAME}`,
        html: `
          <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;color:#111">
            <h2 style="margin:0 0 12px;font-size:22px">Welcome to <span style="color:#b10000">${BRAND_NAME}</span> 💦</h2>
            <p style="margin:0 0 16px;line-height:1.5">We got your signup. Expect juicy updates, early drops, and beta invites.</p>
            <p style="margin:0;color:#555;font-size:12px">If this wasn’t you, ignore this email.</p>
          </div>
        `.trim(),
      });
    } catch (e) {
      console.warn("Resend error (non-fatal):", e);
    }

    return res.status(200).json({ ok: true, message: "Signed up successfully", redirectTo: "/thank-you" });
  } catch (e) {
    console.error("Unhandled signup error:", e);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}

export const config = { api: { bodyParser: true } };
