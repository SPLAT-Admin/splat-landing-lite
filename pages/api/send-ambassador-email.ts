export default async function handler(req, res) {
  console.log("👀 Ambassador API payload:", req.body);

  // CAPTCHA verification
  const token = req.body.captchaToken;
  const cfRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ secret: process.env.CLOUDFLARE_SECRET_KEY, response: token })
  });
  const cfJson = await cfRes.json();
  console.log("🏁 CAPTCHA verification:", cfJson);
  if (!cfJson.success) return res.status(403).json({ error: "Captcha failed" });

  // Supabase insert
  const { error: sbError } = await supabase.from('ambassador').insert([{ ... }]);
  console.log("💾 Supabase insert:", sbError);
  if (sbError) return res.status(500).json({ error: sbError.message });

  // Resend email
  const emailRes = await resend.emails.send({ ... });
  console.log("📧 Resend API:", emailRes);
  if (emailRes.error) return res.status(500).json({ error: emailRes.error });
  
  res.status(200).json({ status: "sent" });
}
