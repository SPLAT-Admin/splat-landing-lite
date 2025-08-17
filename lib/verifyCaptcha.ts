export interface TurnstileResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

export async function verifyCaptcha(
  token: string,
  remoteip?: string
): Promise<boolean> {
  const secret = process.env.CLOUDFLARE_SECRET_KEY;

  if (!secret) {
    console.error("[verifyCaptcha] Missing CLOUDFLARE_SECRET_KEY");
    return false;
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteip && { remoteip }),
      }),
    });

    const data = (await res.json()) as TurnstileResponse;

    if (!data.success) {
      console.warn("[verifyCaptcha] Failed verification", data["error-codes"]);
    }

    return data.success;
  } catch (err) {
    console.error("[verifyCaptcha] Error during verification:", err);
    return false;
  }
}
