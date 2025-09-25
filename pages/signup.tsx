import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setError("Please enter an email address.");
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
        throw new Error(data?.error || "Unable to sign you up right now.");
      }

      setStatus("success");
      setTimeout(() => {
        void router.push("/thankyou");
      }, 1200);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <Head>
        <title>Join the SPL@T Waitlist</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-black via-[#120207] to-black px-6 py-20 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
          <section className="flex-1 space-y-6 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">SPL@T Waitlist</p>
            <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
              Be the First to SPL@T
            </h1>
            <p className="text-lg text-white/75">
              Drop your email to get early access, filthy updates, and invites to private beta drops. No spam—just
              pure SPL@T energy.
            </p>
          </section>

          <section className="w-full max-w-xl">
            <div className="relative rounded-3xl border border-[#2f0f15]/80 bg-black/70 p-[1px] shadow-[0_25px_55px_rgba(133,23,37,0.35)]">
              <div className="rounded-[calc(1.5rem-1px)] bg-black/80 p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@usesplat.com"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-lg text-white placeholder-white/40 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-full bg-[#851825] py-4 text-lg font-bold uppercase tracking-widest text-white shadow-[0_0_35px_rgba(133,23,37,0.45)] transition hover:scale-[1.01] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/50 disabled:scale-100 disabled:opacity-60"
                  >
                    {status === "loading" ? "Joining…" : "Join the Waitlist"}
                  </button>

                  {status === "success" ? (
                    <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-center text-sm text-emerald-300">
                      You’re locked in! Checking your inbox now…
                    </p>
                  ) : null}

                  {status === "error" && error ? (
                    <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
                      {error}
                    </p>
                  ) : null}

                  <p className="text-center text-xs text-white/50">
                    SPL@T respects your privacy. We only use your email for product updates and launch drops.
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
