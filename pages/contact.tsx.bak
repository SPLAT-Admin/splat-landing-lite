/* SPL@T block-style form layout */
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  FormShell,
  FormField,
  FormTextArea,
  FormButton,
  FormCaptcha,
  formStatusMessageClass,
  formHeadingClass,
} from "@/components/ui/Form";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetCaptcha = () => {
    setCaptchaToken(null);
    setCaptchaKey((prev) => prev + 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!captchaToken) {
      setError("Please complete the CAPTCHA before submitting.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || data?.message || "Unable to send your message right now.");
      }

      setStatus("success");
      setForm(initialForm);
      resetCaptcha();

      const redirectTo = typeof data?.redirectTo === "string" ? data.redirectTo : "/thank-you";

      setTimeout(() => {
        void router.push(redirectTo);
      }, 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStatus("error");
      setError(message);
      resetCaptcha();
    }
  };

  return (
    <>
      <Head>
        <title>Contact SPL@T</title>
        <meta
          name="description"
          content="Reach the SPL@T crew for partnerships, support, or collabs."
        />
        {/* Cloudflare Turnstile script for Captcha */}
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </Head>

      <main className="min-h-screen bg-jet-black px-6 py-24 text-acid-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <header className="space-y-6 text-center">
            <h1 className="text-[44pt] font-extrabold tracking-tight text-deep-crimson drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-[22pt] font-bold text-acid-white">
              Partnerships, press, support, or spicy questions — the SPL@T crew is here for it.
            </p>
            <p className="text-lg text-acid-white/80 max-w-2xl mx-auto">
              Drop us a note below and we’ll hit you back fast.
            </p>
          </header>

          <FormShell>
            <form onSubmit={handleSubmit} className="space-y-8">
              <h2 className={`${formHeadingClass} text-center`}>Contact Form</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              <FormTextArea
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Drop your question, collab idea, or feedback here."
              />

              <FormCaptcha
                key={captchaKey}
                containerId={`contact-turnstile-${captchaKey}`}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={resetCaptcha}
                onError={resetCaptcha}
              />

              <FormButton type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Send Message"}
              </FormButton>

              {status === "success" ? (
                <p className={`${formStatusMessageClass} border-emerald-400/30 bg-emerald-500/15 text-emerald-300`}>
                  Message received! We’ll hit you back shortly.
                </p>
              ) : null}

              {status === "error" && error ? (
                <p className={`${formStatusMessageClass} border-red-400/30 bg-red-500/10 text-red-300`}>
                  {error}
                </p>
              ) : null}

              <p className="text-center text-xs text-acid-white/50">
                SPL@T stores your message securely and only uses your email to respond.
              </p>
            </form>
          </FormShell>
        </div>
      </main>
    </>
  );
}
