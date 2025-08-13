import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// --- Env ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!; // service role key
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const CLOUDFLARE_SECRET_KEY = process.env.CLOUDFLARE_SECRET_KEY!;

// Branding & from
const FROM_EMAIL = "SPL@T <noreply@usesplat.com>"; // hardcoded per your request
const BRAND_NAME = process.env.BRAND_NAME || "SPL@T";

// --- Clients ---
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const resend = new Resend(RESEND_API_KEY);

// --- Helpers ---
const isValidEmail = (v: string) => /.+@.+\..+/.test(v.trim()) && v.trim().length <= 320;

async function verifyTurnstile(token: string, remoteip?: string | null) {
  const body = new URLSearchParams();
  body.set("secret", CLOUDFLARE_SECRET_KEY);
  body.set("response", token);
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

// --- Simple per-IP rate limit (in-memory; per instance) ---
const RATE_LIMIT_WINDOW_MS = Number(process.env.SIGNUP_RATE_WINDOW_MS || 60_000);
const RATE_LIMIT_MAX = Number(process.env.SIGNUP_RATE_MAX || 5);
const rateBucket = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string) {
  const now = Date.now();
  const bucket = rateBucket.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBucket.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  if (bucket.count >= RATE_LIMIT_MAX) return { allowed: false, resetAt: bucket.resetAt };
  bucket.count += 1;
  return { allowed: true, resetAt: bucket.resetAt };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const {
      email,
      firstName,
      lastName,
      marketingConsent,
      turnstileToken,
      referralCode,
      signupSource,
    } = req.body || {};

    // Extract IP early (works behind common proxies)
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      (req.socket as any)?.remoteAddress ||
      "unknown";

    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      res.setHeader("Retry-After", String(Math.ceil((rl.resetAt - Date.now()) / 1000)));
      return res.status(429).json({ error: "Too many attempts. Please wait and try again." });
    }

    // Basic field validation
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!turnstileToken || typeof turnstileToken !== "string") {
      return res.status(400).json({ error: "Captcha token missing" });
    }

    // Validate referral code (6–8 uppercase letters/numbers) if present
    const ref = typeof referralCode === "string" && referralCode.trim() !== ""
      ? referralCode.trim().toUpperCase()
      : null;
    if (ref && !/^[A-Z0-9]{6,8}$/.test(ref)) {
      return res.status(400).json({ error: "Invalid referral code" });
    }

    // Map signupSource to allowed values
    const allowedSources = new Set(["website", "referral", "social_media", "ads", "other"]);
    const srcRaw = typeof signupSource === "string" ? signupSource.toLowerCase() : "website";
    const src = (allowedSources.has(srcRaw) ? srcRaw : "other") as
      | "website"
      | "referral"
      | "social_media"
      | "ads"
      | "other";

    // Verify Turnstile
    const captchaOK = await verifyTurnstile(turnstileToken, ip);
    if (!captchaOK) {
      return res.status(400).json({ error: "Captcha verification failed" });
    }

    // Insert into Supabase (service role bypasses RLS)
    const { error: dbError } = await supabase.from("email_signups").insert([
      {
        email: String(email).trim().toLowerCase(),
        first_name: (firstName ?? null) as string | null,
        last_name: (lastName ?? null) as string | null,
        marketing_consent: !!marketingConsent,
        signup_source: src,
        referral_code: ref,
      },
    ]);

    if (dbError) {
      if ((dbError as any)?.code === "23505" || /duplicate|unique/i.test(dbError.message)) {
        // Email already in the list → soft conflict; let UI treat as success
        return res.status(409).json({ error: "Email already subscribed" });
      }
      console.error("DB error /api/signup:", dbError);
      return res.status(500).json({ error: "Database error" });
    }

    // Send confirmation (non-fatal on failure)
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
      console.warn("Resend send error (non-fatal)", e);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("/api/signup error", e);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}

export const config = { api: { bodyParser: true } };