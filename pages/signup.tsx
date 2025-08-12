// pages/signup.tsx (example)
import SplatCaptcha from "@/components/SplatCaptcha";

export default function Signup() {
  return (
    <main className="p-6">
      {/* …your form… */}
      <SplatCaptcha
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onVerify={(token) => {
          // include token with your form submit
          // e.g. POST /api/signup { ..., turnstileToken: token }
        }}
      />
    </main>
  );
}
