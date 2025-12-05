"use client";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  is_active: boolean;
}

export default function MerchStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMerch() {
      try {
        const res = await fetch("/api/public-merch-feed");
        if (!res.ok) throw new Error("Failed to load merch feed");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err: any) {
        console.error("❌ Merch fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMerch();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-acid-white p-8 space-y-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">🛍️ SPL@T Merch Store</h1>
        <p className="text-acid-white/70">Fresh from Printify — all drops are live.</p>
      </header>

      {loading && <p className="text-center text-acid-white/60">Loading merch...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-acid-white/60">No merch available.</p>
          ) : (
            products.map((p) => (
              <div
                key={p.id}
                className="rounded-xl bg-neutral-900 border border-neutral-800 p-4 flex flex-col hover:shadow-lg hover:shadow-acid-white/10 transition"
              >
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="rounded-md mb-3 w-full h-56 object-cover"
                />
                <h2 className="font-semibold text-lg">{p.name}</h2>
                <p className="text-sm text-acid-white/60">{p.category}</p>
                <div className="mt-auto pt-4">
                  <button className="w-full bg-acid-white text-black rounded-md py-2 font-semibold hover:bg-acid-white/90 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
