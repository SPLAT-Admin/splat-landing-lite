import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const placeholderProducts = [
  { title: "SPL@T Neon Hoodie", caption: "Stay loud. Stay warm." },
  { title: "Jet Black Crop", caption: "Cut for unapologetic nights." },
  { title: "Deep Crimson Snapback", caption: "Crown yourself." },
  { title: "Acid White Tank", caption: "Glow-in-the-dark flex." },
  { title: "SPL@T Stickers", caption: "Flood every surface." },
  { title: "Ambassador Pack", caption: "Exclusive drops for the bold." },
];

type Status = "idle" | "loading" | "success" | "error";

export default function MerchPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setError("Enter your email to join the waitlist.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/signup-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to save your signup right now.");
      }

      setStatus("success");
      setTimeout(() => {
        void router.push("/thankyou");
      }, 1400);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <Head>
        <title>SPL@T Merch – Coming Soon</title>
        <meta
          name="description"
          content="Be first in line for SPL@T merch drops—hoodies, caps, and bold gear made for the unapologetic."
        />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-black via-[#0c0207] to-black px-6 py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-16">
          <section className="w-full space-y-8 text-center">
            <div className="mx-auto flex w-fit items-center justify-center rounded-full border border-[#851825]/50 bg-black/70 px-6 py-3 shadow-[0_0_45px_rgba(133,23,37,0.45)]">
              <Image src="/splat-logo.png" alt="SPL@T Logo" width={220} height={80} priority />
            </div>
            <h1 className="text-[40pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg sm:text-[56pt]">
              🔥 Merch Drops Coming Soon
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80 sm:text-xl">
              Be first in line for exclusive SPL@T gear—designed for the bold, the shameless, and the after-dark icons.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-full border border-white/10 bg-black px-6 py-4 text-base text-white placeholder-white/40 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-[#851825] px-6 py-4 text-base font-bold uppercase tracking-widest text-white shadow-[0_0_35px_rgba(133,23,37,0.45)] transition hover:scale-[1.01] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/60 disabled:scale-100 disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? "Joining…" : "Join Waitlist"}
              </button>
            </form>

            {status === "success" ? (
              <p className="mx-auto max-w-xl rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-300">
                You’re in! We’ll ping you before the drop goes live.
              </p>
            ) : null}

            {status === "error" && error ? (
              <p className="mx-auto max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            ) : null}
          </section>

          <section className="w-full">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {placeholderProducts.map((product) => (
                <article
                  key={product.title}
                  className="group relative overflow-hidden rounded-3xl border border-[#2f0f15]/70 bg-black/70 p-8 shadow-[0_25px_45px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-2 hover:border-[#851825]/80"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#851825]/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative space-y-4">
                    <div className="flex h-40 items-center justify-center rounded-2xl border border-white/10 bg-black/60">
                      <span className="text-4xl">🛍️</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{product.title}</h2>
                    <p className="text-sm text-white/70">{product.caption}</p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
                      Coming Soon
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
