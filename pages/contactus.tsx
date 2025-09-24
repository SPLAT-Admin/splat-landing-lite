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

      <section className="bg-black text-white px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          <header className="text-center space-y-4">
            <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-[18pt] leading-relaxed text-white/90">
              Questions, collab ideas, or something wild you want to ship with SPL@T? Slide into our inbox and the crew
              will get back fast.
            </p>
          </header>

          <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-800 bg-black/60 p-8 shadow-[0_25px_45px_rgba(0,0,0,0.35)]">
            <p className="text-center text-gray-300 mb-6 text-[14pt]">
              Fill out the form and we will respond within two business days.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-[14pt]">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 font-semibold text-white/90">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="rounded border border-gray-700 bg-black px-4 py-3 text-white placeholder-gray-400 focus:border-[#851825] focus:outline-none focus:ring-1 focus:ring-[#851825]"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-semibold text-white/90">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="rounded border border-gray-700 bg-black px-4 py-3 text-white placeholder-gray-400 focus:border-[#851825] focus:outline-none focus:ring-1 focus:ring-[#851825]"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="mb-1 font-semibold text-white/90">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="rounded border border-gray-700 bg-black px-4 py-3 text-white placeholder-gray-400 focus:border-[#851825] focus:outline-none focus:ring-1 focus:ring-[#851825]"
                />
              </div>

              <SplatCaptcha
                containerId="cf-turnstile-contact"
                onVerify={(token) => setForm((prev: ContactForm) => ({ ...prev, captchaToken: token }))}
                onExpire={() => setForm((prev) => ({ ...prev, captchaToken: "" }))}
                onError={() => setForm((prev) => ({ ...prev, captchaToken: "" }))}
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-[#851825] py-3 px-6 font-bold text-white transition hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/60"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-center text-green-500">Thanks! We'll be in touch soon.</p>
              )}
              {status === "error" && <p className="text-center text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
