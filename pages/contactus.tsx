import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import SplatCaptcha from "../components/SplatCaptcha";
import { ContactForm } from "../types";

export default function ContactUsPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
    captchaToken: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    if (!form.captchaToken) {
      setStatus("error");
      setError("Please complete the CAPTCHA");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const message = json?.error || "Submission failed";
        setForm((prev) => ({ ...prev, captchaToken: "" }));
        throw new Error(message);
      }

      const redirect = json?.redirectTo || json?.data?.redirectTo;
      setStatus("success");
      setForm({ name: "", email: "", message: "", captchaToken: "" });

      if (redirect) {
        await router.push(redirect);
        return;
      }
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Submission failed");
      setForm((prev) => ({ ...prev, captchaToken: "" }));
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | SPL@T</title>
      </Head>

      <section className="bg-gradient-to-b from-black via-[#130107] to-black text-white px-6 py-20">
        <div className="mx-auto max-w-6xl space-y-16">
          <header className="text-center space-y-4 fade-up">
            <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-[18pt] leading-relaxed text-white/90">
              Questions, collab ideas, or something wild you want to ship with SPL@T? Slide into our inbox and the crew
              will get back fast.
            </p>
          </header>

          <div className="grid gap-10 lg:grid-cols-[1.15fr,0.85fr] items-start fade-up-delay">
            <div className="gradient-frame crimson-glow">
              <div className="gradient-content p-8 sm:p-10">
                <p className="text-center text-gray-300 mb-8 text-[14pt]">
                  Fill out the form and we will respond within two business days.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 text-[14pt]">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                    />
                  </div>

                  <SplatCaptcha
                    containerId="cf-turnstile-contact"
                    className="my-4 flex justify-center"
                    onVerify={(token) => setForm((prev: ContactForm) => ({ ...prev, captchaToken: token }))}
                    onExpire={() => setForm((prev) => ({ ...prev, captchaToken: "" }))}
                    onError={() => setForm((prev) => ({ ...prev, captchaToken: "" }))}
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-full bg-[#851825] py-3 px-6 font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/60"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>

                  {status === "success" && (
                    <p className="text-center text-emerald-400">Thanks! We'll be in touch soon.</p>
                  )}
                  {status === "error" && <p className="text-center text-red-400">{error}</p>}
                </form>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/60 p-8 text-left shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <h2 className="text-2xl font-extrabold text-[#851825]">More Ways to Reach SPL@T</h2>
              <p className="mt-4 text-white/80">
                Prefer a direct line? Hit us with media kits, partnership decks, or urgent support vibes.
              </p>
              <ul className="mt-6 space-y-4 text-white/80">
                <li>
                  <span className="block text-xs uppercase tracking-[0.28em] text-white/50">Email</span>
                  <a href="mailto:hello@usesplat.com" className="text-lg font-semibold text-white hover:text-[#851825]">
                    hello@usesplat.com
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-[0.28em] text-white/50">Partnerships</span>
                  <a href="mailto:ads@usesplat.com" className="text-lg font-semibold text-white hover:text-[#851825]">
                    ads@usesplat.com
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-[0.28em] text-white/50">Phone</span>
                  <a href="tel:8444208333" className="text-lg font-semibold text-white hover:text-[#851825]">
                    844-420-8333
                  </a>
                </li>
              </ul>
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/60 p-4 text-white/70">
                <p className="text-sm">
                  Need help faster? Drop “🔥 URGENT” in your subject line and we will prioritize it.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
