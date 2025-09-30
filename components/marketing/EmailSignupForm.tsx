/* SPL@T block-style form layout */
import { useRouter } from "next/router";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  FormShell,
  FormField,
  FormButton,
  FormCaptcha,
  formStatusMessageClass,
  formHeadingClass,
} from "@/components/ui/Form";

export default function EmailSignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  const resetCaptcha = () => {
    setCaptchaToken(null);
    setCaptchaKey((prev) => prev + 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setError("Please enter an email address.");
      return;
    }

    if (!captchaToken) {
      setStatus("error");
      setError("Please complete the CAPTCHA before joining.");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/signup-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, captchaToken }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to sign you up right now.");
      }

      setStatus("success");
      setEmail("");
      resetCaptcha();

      setTimeout(() => {
        void router.push("/thank-you");
      }, 1200);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setStatus("error");
      setError(message);
      resetCaptcha();
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      <header className="space-y-4 text-center">
        <span className="text-xs uppercase tracking-[0.5em] text-white/45">SPL@T Waitlist</span>
        <h1 className="text-2xl font-extrabold uppercase tracking-[0.3em] text-[#851825]">
          Be the First to SPL@T
        </h1>
        <p className="text-lg text-white/80">
          Drop your email to get early access, filthy updates, and invites to private beta drops. No spam—just pure SPL@T energy.
        </p>
      </header>

      <FormShell>
        <form onSubmit={handleSubmit} className="space-y-8">
          <h2 className={`${formHeadingClass} text-center`}>Join the Waitlist</h2>
          <FormField
            label="Email Address"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@usesplat.com"
          />

          <FormCaptcha
            key={captchaKey}
            containerId={`email-signup-turnstile-${captchaKey}`}
            onVerify={(token) => setCaptchaToken(token)}
            onExpire={resetCaptcha}
            onError={resetCaptcha}
          />

          <FormButton type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Joining…" : "Join the Waitlist"}
          </FormButton>

          {status === "success" ? (
            <p className={`${formStatusMessageClass} border-emerald-400/30 bg-emerald-500/15 text-emerald-300`}>
              You’re locked in! Checking your inbox now…
            </p>
          ) : null}

          {status === "error" && error ? (
            <p className={`${formStatusMessageClass} border-red-400/30 bg-red-500/10 text-red-300`}>
              {error}
            </p>
          ) : null}

          <p className="text-center text-xs text-white/50">
            SPL@T respects your privacy. We only use your email for product updates and launch drops.
          </p>
        </form>
      </FormShell>
    </div>
  );
}
