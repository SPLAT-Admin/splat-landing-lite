import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  is_active: boolean;
  created_at: string;
}

const supabase = getSupabaseClient();

type Status = "idle" | "loading" | "success" | "error";

type WaitlistState = {
  email: string;
  status: Status;
  error: string | null;
};

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistState>({ email: "", status: "idle", error: null });

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    let mounted = true;

    const loadProduct = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("id,name,description,price,image_url,is_active,created_at")
        .eq("id", id)
        .single();

      if (!mounted) return;

      if (fetchError) {
        console.error("SPL@T product fetch error", fetchError);
        setError("We couldn't load this product. Try again soon.");
      } else {
        setProduct(data as Product);
        setError(null);
      }
      setLoading(false);
    };

    void loadProduct();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleWaitlistSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!waitlist.email.trim()) {
      setWaitlist((prev) => ({ ...prev, status: "error", error: "Enter your email to join the waitlist." }));
      return;
    }

    setWaitlist((prev) => ({ ...prev, status: "loading", error: null }));

    try {
      const response = await fetch("/api/signup-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlist.email }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to save your signup right now.");
      }

      setWaitlist({ email: "", status: "success", error: null });
      setTimeout(() => {
        setWaitlist({ email: "", status: "idle", error: null });
      }, 2000);
    } catch (err: any) {
      setWaitlist((prev) => ({
        ...prev,
        status: "error",
        error: err?.message || "Something went wrong. Please try again.",
      }));
    }
  };

  const isComingSoon = product && !product.is_active;

  return (
    <>
      <Head>
        <title>{product ? `${product.name} — SPL@T Storefront` : "SPL@T Product"}</title>
        {product?.description ? <meta name="description" content={product.description} /> : null}
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-black via-[#0b0207] to-black px-6 py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row">
          <section className="flex-1">
            <div className="overflow-hidden rounded-3xl border border-[#2f0f15]/70 bg-black/70 shadow-[0_35px_65px_rgba(133,23,37,0.25)]">
              <div className="relative flex h-80 items-center justify-center overflow-hidden">
                {loading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="animate-pulse text-xl uppercase tracking-[0.4em] text-white/60">
                      Loading…
                    </span>
                  </div>
                ) : product?.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-6xl">🛍️</span>
                )}

                {isComingSoon && !loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <span className="rounded-full border border-white/30 px-6 py-2 text-xs uppercase tracking-[0.4em] text-white/70">
                      Coming Soon
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="flex-1 space-y-6">
            {error ? (
              <div className="rounded-3xl border border-red-400/40 bg-red-500/15 px-6 py-4 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <div className="space-y-4">
              <Link href="/storefront" className="text-xs uppercase tracking-[0.4em] text-white/50 hover:text-white">
                ← Back to Storefront
              </Link>
              <h1 className="text-[36pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
                {loading ? "Loading…" : product?.name ?? "Unknown SPL@T Drop"}
              </h1>
              <p className="text-lg text-white/80">
                {loading
                  ? "Fetching product details from the SPL@TVerse…"
                  : product?.description || "We’re brewing up more details. Join the waitlist to be first in line."}
              </p>
              <p className="text-2xl font-bold text-white">
                {loading || !product
                  ? "--"
                  : product.is_active
                  ? `$${product.price.toFixed(2)}`
                  : "Coming Soon"}
              </p>
            </div>

            <form
              onSubmit={handleWaitlistSubmit}
              className="rounded-3xl border border-[#2f0f15]/70 bg-black/70 p-6 shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
            >
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">Join the Waitlist</h2>
              <p className="mt-2 text-sm text-white/70">
                Drop your email to get the drop first. No spam—just straight SPL@T heat when this item goes live.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={waitlist.email}
                  onChange={(event) =>
                    setWaitlist((prev) => ({ ...prev, email: event.target.value, status: "idle", error: null }))
                  }
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-white/10 bg-black px-5 py-3 text-sm text-white placeholder-white/40 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                />
                <button
                  type="submit"
                  disabled={waitlist.status === "loading"}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#851825] px-6 py-3 text-sm font-bold uppercase tracking-[0.4em] text-white shadow-[0_0_35px_rgba(133,23,37,0.45)] transition hover:scale-[1.02] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/60 disabled:scale-100 disabled:opacity-60 sm:w-auto"
                >
                  {waitlist.status === "loading" ? "Joining…" : "💦 Join Waitlist"}
                </button>
              </div>

              {waitlist.status === "success" ? (
                <p className="mt-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300">
                  You're locked in! We'll ping you when this drop is ready.
                </p>
              ) : null}

              {waitlist.status === "error" && waitlist.error ? (
                <p className="mt-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                  {waitlist.error}
                </p>
              ) : null}
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
