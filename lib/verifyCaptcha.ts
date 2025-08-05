export async function verifyCaptcha(token: string): Promise<boolean> {
  if (!process.env.CLOUDFLARE_SECRET_KEY) {
    console.error('Missing CLOUDFLARE_SECRET_KEY');
    return false;
  }
  try {
    const response = await fetch(`https://challenges.cloudflare.com/turnstile/v0/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_SECRET_KEY,
        response: token
      })
    });
    const data = await response.json();
    return !!data.success;
  } catch (err) {
    console.error('verifyCaptcha error:', err);
    return false;
  }
}
