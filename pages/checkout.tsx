import { useEffect, useMemo, useState } from "react";
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
}

interface OrderRecord {
  id: string;
  status: string;
  quantity: number;
  total_amount: number;
  product: Product | null;
}

const supabase = getSupabaseClient();

type Status = "idle" | "loading" | "success" | "error";

type CheckoutState = {
  name: string;
  email: string;
  status: Status;
  error: string | null;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { orderId } = router.query;

  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<CheckoutState>({
    name: "",
    email: "",
    status: "idle",
    error: null,
  });

  useEffect(() => {
    if (!orderId || typeof orderId !== "string") return;

    let mounted = true;

    const loadOrder = async () => {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("orders")
        .select(
          "id,status,quantity,total_amount,product:product_id (id,name,description,price,image_url,is_active)"
        )
        .eq("id", orderId)
        .maybeSingle();

      if (!mounted) return;

      if (fetchError) {
        console.error("SPL@T checkout load error", fetchError);
        setError("We couldn't load this order. Try again or start over.");
        setOrder(null);
      } else if (!data) {
        setError("Order not found. Start a new checkout from the storefront.");
        setOrder(null);
      } else {
        // ✅ Normalize product array → single Product
        const normalized = {
          ...data,
          product: Array.isArray(data.product) ? data.product[0] : data.product,
        } as OrderRecord;

        setOrder(normalized);
      }

      setLoading(false);
    };

    void loadOrder();

    return () => {
      mounted = false;
    };
  }, [orderId]);

  const priceDisplay = useMemo(() => {
    if (!order?.product) return "--";
    return `$${order.product.price.toFixed(2)}`;
  }, [order]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!order || typeof orderId !== "string") return;
    if (!checkout.name.trim() || !checkout.email.trim()) {
      setCheckout((prev) => ({
        ...prev,
        status: "error",
        error: "Name and email are required.",
      }));
      return;
    }

    setCheckout((prev) => ({ ...prev, status: "loading", error: null }));

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          customer: {
            name: checkout.name,
            email: checkout.email,
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Checkout failed.");
      }

      const json = await response.json().catch(() => ({}));
      setCheckout({ name: "", email: "", status: "success", error: null });

      const redirect = json?.data?.redirectTo || "/thankyou";
      setTimeout(() => {
        void router.push(redirect);
      }, 600);
    } catch (err: any) {
      setCheckout((prev) => ({
        ...prev,
        status: "error",
        error: err?.message || "Something went wrong. Try again in a moment.",
      }));
    }
  };

  return (
    <>
      <Head>
        <title>SPL@T Checkout</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-black via-[#090106] to-black px-6 py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row">
          <section className="flex-1">
            <div className="rounded-3xl border border-[#2f0f15]/70 bg-black/70 p-[1px] shadow-[0_35px_65px_rgba(133,23,37,0.3)]">
              <div className="rounded-[calc(1.5rem-1px)] bg-black/85 p-8 sm:p-10">
                <header className="space-y-2">
                  <Link
                    href="/storefront"
                    className="text-xs uppercase tracking-[0.4em] text-white/50 hover:text-white"
                  >
                    ← Back to Storefront
                  </Link>
                  <h1 className="text-[30pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
                    SPL@T Checkout
                  </h1>
                  <p className="text-sm text-white/70">
                    Complete your details to lock in the order. We will confirm it instantly.
                  </p>
                </header>

                <div className="mt-6 space-y-4">
                  {loading ? (
                    <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-6 text-center text-sm text-white/60">
                      Loading your order…
                    </div>
                  ) : error ? (
                    <div className="rounded-2xl border border-red-400/40 bg-red-500/15 px-4 py-6 text-center text-sm text-red-200">
                      {error}
                    </div>
                  ) : order ? (
                    <article className="space-y-4 rounded-2xl border border-white/10 bg-black/60 p-4">
                      <div className="flex gap-4">
                        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/40">
                          {order.product?.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={order.product.image_url}
                              alt={order.product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-4xl">🛍️</span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h2 className="text-lg font-semibold text-white">
                              {order.product?.name ?? "SPL@T Drop"}
                            </h2>
                            <p className="text-sm text-white/70">
                              {order.product?.description ||
                                "Exclusive SPL@T merch drop."}
                            </p>
                          </div>
                          <dl className="flex flex-wrap gap-4 text-xs text-white/60">
                            <div>
                              <dt className="uppercase tracking-[0.3em]">Price</dt>
                              <dd className="text-sm text-white">
                                {priceDisplay}
                              </dd>
                            </div>
                            <div>
                              <dt className="uppercase tracking-[0.3em]">Quantity</dt>
                              <dd className="text-sm text-white">
                                {order.quantity}
                              </dd>
                            </div>
                            <div>
                              <dt className="uppercase tracking-[0.3em]">Total</dt>
                              <dd className="text-sm text-white">
                                ${order.total_amount.toFixed(2)}
                              </dd>
                            </div>
                            <div>
                              <dt className="uppercase tracking-[0.3em]">Status</dt>
                              <dd className="text-sm capitalize text-white/80">
                                {order.status}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </article>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className="flex-1">
            <div className="rounded-3xl border border-[#2f0f15]/70 bg-black/70 p-[1px] shadow-[0_35px_65px_rgba(133,23,37,0.3)]">
              <div className="rounded-[calc(1.5rem-1px)] bg-black/85 p-8 sm:p-10">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
                  Secure Checkout
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  Drop your details to complete the order. We will send
                  confirmation to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <label className="flex flex-col text-sm text-white/70">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                      Full Name
                    </span>
                    <input
                      type="text"
                      required
                      value={checkout.name}
                      onChange={(event) =>
                        setCheckout((prev) => ({
                          ...prev,
                          name: event.target.value,
                          error: null,
                          status: "idle",
                        }))
                      }
                      className="mt-2 w-full rounded-full border border-white/10 bg-black px-5 py-3 text-sm text-white placeholder-white/40 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                    />
                  </label>

                  <label className="flex flex-col text-sm text-white/70">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                      Email
                    </span>
                    <input
                      type="email"
                      required
                      value={checkout.email}
                      onChange={(event) =>
                        setCheckout((prev) => ({
                          ...prev,
                          email: event.target.value,
                          error: null,
                          status: "idle",
                        }))
                      }
                      className="mt-2 w-full rounded-full border border-white/10 bg-black px-5 py-3 text-sm text-white placeholder-white/40 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={checkout.status === "loading" || !order || !!error}
                    className="w-full rounded-full bg-[#851825] py-4 text-sm font-bold uppercase tracking-[0.4em] text-white shadow-[0_0_35px_rgba(133,23,37,0.45)] transition hover:scale-[1.02] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/60 disabled:scale-100 disabled:opacity-60"
                  >
                    {checkout.status === "loading"
                      ? "Processing…"
                      : "Complete Order"}
                  </button>

                  {checkout.status === "success" ? (
                    <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-center text-sm text-emerald-300">
                      Order locked! Redirecting you to celebration mode.
                    </p>
                  ) : null}

                  {checkout.status === "error" && checkout.error ? (
                    <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
                      {checkout.error}
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
