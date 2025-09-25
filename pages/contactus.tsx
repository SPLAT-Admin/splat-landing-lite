import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactUsPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to send your message right now.");
      }

      setStatus("success");
      setTimeout(() => {
        void router.push("/thankyou");
      }, 1200);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Contact SPL@T</title>
        <meta name="description" content="Reach out to the SPL@T team for partnerships, support, or general questions." />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-black via-[#100106] to-black px-6 py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row">
          <section className="flex-1 space-y-6">
            <span className="text-xs uppercase tracking-[0.6em] text-white/50">Get in Touch</span>
            <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
              Slide Into SPL@T HQ
            </h1>
            <p className="text-lg text-white/75">
              Partnerships, press, collabs, or spicy questions—the SPL@T crew is here for it. Send us a message and we’ll
              get back fast.
            </p>
            <div className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/40">Email</p>
                <a href="mailto:hello@usesplat.com" className="text-lg font-semibold text-white hover:text-[#e04a5f]">
                  hello@usesplat.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/40">Phone</p>
                <a href="tel:8444208333" className="text-lg font-semibold text-white hover:text-[#e04a5f]">
                  844-420-8333
                </a>
              </div>
            </div>
          </section>

          <section className="w-full max-w-3xl">
            <div className="rounded-3xl border border-[#2f0f15]/80 bg-black/70 p-[1px] shadow-[0_25px_55px_rgba(133,23,37,0.35)]">
              <div className="rounded-[calc(1.5rem-1px)] bg-black/85 p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Your Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Drop your question, collab idea, or feedback here."
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white placeholder-white/40 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-full bg-[#851825] py-4 text-lg font-bold uppercase tracking-widest text-white shadow-[0_0_35px_rgba(133,23,37,0.45)] transition hover:scale-[1.01] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/50 disabled:scale-100 disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Send Message"}
                  </button>

                  {status === "success" ? (
                    <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-center text-sm text-emerald-300">
                      Message received! We’ll hit you back shortly.
                    </p>
                  ) : null}

                  {status === "error" && error ? (
                    <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
                      {error}
                    </p>
                  ) : null}

                  <p className="text-center text-xs text-white/50">
                    SPL@T stores your message securely and only uses your email to respond.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

type FieldProps = {
  label: string;
  name: keyof typeof initialForm;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  required?: boolean;
};

function Field({ label, name, value, onChange, type = "text", required }: FieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white placeholder-white/40 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
      />
    </div>
  );
}
