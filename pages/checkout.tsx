/* SPL@T block-style form layout */
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  FormShell,
  FormField,
  FormButton,
  FormCaptcha,
  formStatusMessageClass,
  formHeadingClass,
} from "@/components/Form";
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
  const [checkout, setCheckout] = useState<CheckoutState>(
    () => ({
      name: "",
      email: "",
      status: "idle",
      error: null,
    })
  );
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  useEffect(() => {
    if (!orderId || typeof orderId !== "string") return;

    let mounted = true;

    const loadOrder = async () => {
      setLoading(true);
      setError(null);

      let supabase: SupabaseClient | null = null;
      try {
        supabase = getSupabaseClient();
      } catch (err) {
        console.warn("SPL@T checkout load skipped", err);
        if (!mounted) return;
        setError(
          "We couldn’t preload this order, but you can still submit the checkout form."
        );
        setOrder(null);
        setLoading(false);
        return;
      }

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

  const resetCaptcha = () => {
    setCaptchaToken(null);
    setCaptchaKey((prev) => prev + 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!orderId || typeof orderId !== "string") return;

    if (!checkout.name.trim() || !checkout.email.trim()) {
      setCheckout((prev) => ({
        ...prev,
        status: "error",
        error: "Name and email are required.",
      }));
      return;
    }

    if (!captchaToken) {
      setCheckout((prev) => ({
        ...prev,
        status: "error",
        error: "Please complete the CAPTCHA before checking out.",
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
          captchaToken,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Checkout failed. Try again soon.");
      }

      setCheckout((prev) => ({ ...prev, status: "success" }));
      resetCaptcha();

      setTimeout(() => {
        void router.push("/thankyou");
      }, 1200);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unexpected error. Please try again.";
      setCheckout((prev) => ({ ...prev, status: "error", error: message }));
      resetCaptcha();
    }
  };

  return (
    <>
      <Head>
        <title>SPL@T Checkout</title>
        <meta
          name="description"
          content="Complete your SPL@T merch checkout and lock the drop."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-black via-[#0f0205] to-black px-6 py-24 text-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <header className="space-y-4 text-center">
            <span className="text-xs uppercase tracking-[0.5em] text-white/45">SPL@T Checkout</span>
            <h1 className="text-2xl font-extrabold uppercase tracking-[0.3em] text-[#851825]">
              Lock Your SPL@T Drop
            </h1>
            <p className="text-lg text-white/80">
              Secure the drop with your details. We’ll send confirmation and fulfillment updates straight to your inbox.
            </p>
          </header>

          <div className="space-y-4 rounded-3xl border border-white/15 bg-black/60 px-6 py-6 shadow-[0_25px_55px_rgba(133,23,37,0.35)]">
            <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#851825]/20 text-3xl">
                💦
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/45">Order ID</p>
                <p className="text-lg font-semibold text-white/90">
                  {typeof orderId === "string" ? orderId : "Pending"}
                </p>
              </div>
            </header>

            {loading ? (
              <p className="text-sm text-white/60">Loading order details…</p>
            ) : order ? (
              <article className="space-y-4 rounded-2xl border border-white/15 bg-black/75 p-5">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex h-32 w-full items-center justify-center rounded-xl border border-white/15 bg-black/40 sm:w-40">
                    {order.product?.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={order.product.image_url}
                        alt={order.product.name}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <span className="text-4xl">🛍️</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold text-white">
                        {order.product?.name ?? "SPL@T Drop"}
                      </h2>
                      <p className="text-sm text-white/70">
                        {order.product?.description || "Exclusive SPL@T merch drop."}
                      </p>
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-4 text-xs text-white/60">
                      <div>
                        <dt className="uppercase tracking-[0.3em]">Price</dt>
                        <dd className="text-sm text-white">{priceDisplay}</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.3em]">Quantity</dt>
                        <dd className="text-sm text-white">{order.quantity}</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.3em]">Total</dt>
                        <dd className="text-sm text-white">${order.total_amount.toFixed(2)}</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.3em]">Status</dt>
                        <dd className="text-sm capitalize text-white/80">{order.status}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            ) : (
              <p className="text-sm text-white/60">
                {error ?? "Order details unavailable. Reach out if you need a fresh link."}
              </p>
            )}

            <p className="text-xs text-white/45">
              Need help? Email <Link href="mailto:merch@usesplat.com" className="text-white hover:text-[#ff5a71]">merch@usesplat.com</Link>.
            </p>
          </div>

          <FormShell>
            <form onSubmit={handleSubmit} className="space-y-8">
              <h2 className={`${formHeadingClass} text-center`}>Complete Your Order</h2>
              <FormField
                label="Full Name"
                name="name"
                value={checkout.name}
                onChange={(event) =>
                  setCheckout((prev) => ({
                    ...prev,
                    name: event.target.value,
                    error: null,
                    status: "idle",
                  }))
                }
                required
                placeholder="Test User"
                autoComplete="name"
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={checkout.email}
                onChange={(event) =>
                  setCheckout((prev) => ({
                    ...prev,
                    email: event.target.value,
                    error: null,
                    status: "idle",
                  }))
                }
                required
                placeholder="test@example.com"
                autoComplete="email"
              />

              <FormCaptcha
                key={captchaKey}
                containerId={`checkout-turnstile-${captchaKey}`}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={resetCaptcha}
                onError={resetCaptcha}
              />

              <FormButton
                type="submit"
                disabled={checkout.status === "loading" || loading}
              >
                {checkout.status === "loading" ? "Processing…" : "Complete Order"}
              </FormButton>

              {checkout.status === "success" ? (
                <p className={`${formStatusMessageClass} border-emerald-400/30 bg-emerald-500/15 text-emerald-300`}>
                  Order locked! Redirecting you to celebration mode.
                </p>
              ) : null}

              {checkout.status === "error" && checkout.error ? (
                <p className={`${formStatusMessageClass} border-red-400/30 bg-red-500/10 text-red-300`}>
                  {checkout.error}
                </p>
              ) : null}

              <p className="text-center text-xs text-white/50">
                By checking out you agree to SPL@T’s privacy policy and terms.
              </p>
            </form>
          </FormShell>
        </div>
      </main>
    </>
  );
}
