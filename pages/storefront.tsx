import { useEffect, useState } from "react";
import Link from "next/link";
import HeroFlashSale from "@/components/HeroFlashSale";
import { getSupabaseClient } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  is_active: boolean;
}

export default function StorefrontPage() {
  const supabase = getSupabaseClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!mounted) return;

      if (error) {
        console.error("Storefront product load error", error);
      } else if (data) {
        setProducts(data as Product[]);
      }

      setLoading(false);
    };

    void loadProducts();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>💦 Loading merch…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#090106] to-black px-6 py-20 text-white">
      <HeroFlashSale />
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#851825] drop-shadow-lg sm:text-5xl">
            SPL@T Merch Store
          </h1>
          <p className="mt-3 text-lg font-semibold text-white">
            🔥 Merch Drops Coming Soon
          </p>
          <p className="mt-2 text-white/70">
            Exclusive drops, limited runs, and collabs from the SPL@TVerse.
          </p>
        </header>

        {products.length === 0 ? (
          <p className="text-center text-white/60">❌ No active products. Check back soon!</p>
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
                <p className="text-sm text-white/70">
                  {product.description || "Exclusive SPL@T merch drop."}
                </p>
                <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
                <Link
                  href={`/storefront/${product.id}`}
                  className="mt-4 inline-block w-full rounded-full bg-[#851825] py-2 text-center text-sm font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#6f1320]"
                >
                  View
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
