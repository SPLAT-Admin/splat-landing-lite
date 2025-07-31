export async function verifyCaptcha(token: string): Promise<boolean> {
  if (!token) {
    console.warn("⚠️ No CAPTCHA token provided.");
    return false;
  }

  if (!process.env.CLOUDFLARE_SECRET_KEY) {
    console.error("❌ CLOUDFLARE_SECRET_KEY is missing in environment.");
    return false;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (err) {
    console.error("❌ CAPTCHA verification error:", err);
    return false;
  }
}
