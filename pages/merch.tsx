import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  is_active: boolean;
}

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    try {
      setSupabaseClient(getSupabaseClient());
    } catch (error) {
      console.warn("Merch page supabase unavailable", error);
      setSupabaseClient(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!supabaseClient) return;

    let mounted = true;

    const loadProducts = async () => {
      const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!mounted) return;

      if (error) {
        console.error("Merch product load error", error);
        setProducts([]);
      } else if (data) {
        setProducts(data as Product[]);
      }

      setLoading(false);
    };

    void loadProducts();

    return () => {
      mounted = false;
    };
  }, [supabaseClient]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-jet-black text-acid-white">
        <p>💦 Loading merch…</p>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>SPL@T Merch Store</title>
        <meta
          name="description"
          content="Exclusive SPL@T merch drops, limited runs, and collabs."
        />
      </Head>

      <main className="min-h-screen bg-jet-black px-6 py-20 text-acid-white">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Page Header */}
          <header className="text-center space-y-6">
            <h1 className="text-[44pt] font-extrabold tracking-tight text-deep-crimson drop-shadow-lg">
              SPL@T Merch Store
            </h1>
            <p className="text-[22pt] font-bold text-acid-white">
              🔥 Exclusive Drops & Bold Collabs
            </p>
            <p className="text-lg text-acid-white/80 max-w-3xl mx-auto">
              Limited runs, seasonal heat, and bold SPL@T collabs. Our drops are rare, loud, and
              never boring. Grab yours before it vanishes.
            </p>
          </header>

          {/* Products */}
          {products.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-black/60 p-12 text-center shadow-lg">
              <p className="text-lg text-acid-white/80">
                ❌ No active products at the moment. New drops are coming soon.
              </p>
              <p className="mt-3 text-acid-white/60">
                Expect staples like T-shirts, hoodies, hats, and a seasonal Christmas stocking 🎄💦.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="rounded-2xl border border-white/10 bg-black/70 p-4 shadow-lg transition hover:scale-[1.02]"
                >
                  <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl">🛍️</span>
                    )}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-acid-white/70">
                    {product.description || "Exclusive SPL@T merch drop."}
                  </p>
                  <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
                  <Link
                    href={`/merch/${product.id}`}
                    className="mt-4 inline-block w-full rounded-full bg-deep-crimson py-2 text-center text-sm font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#6f1320]"
                  >
                    View
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
