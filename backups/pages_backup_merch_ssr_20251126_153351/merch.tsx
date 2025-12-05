"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  is_active: boolean;
}

const CATEGORIES = ["All", "Apparel", "Hats", "Drinkware", "Accessories", "Seasonal"];

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    const loadMerch = async () => {
      try {
        console.log("🛍 Fetching merch feed from /api/public-merch-feed...");
        const res = await fetch("/api/public-merch-feed", { cache: "no-store" });
        const json = await res.json();
        console.log("✅ API response:", json);

        if (!res.ok || !json.ok) throw new Error(json.error || "Invalid merch response");
        setProducts(json.products || []);
      } catch (err: any) {
        console.error("🚨 Merch fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMerch();
  }, []);

  const filtered =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold mb-4 text-center">SPL@T Merch Store</h1>
      <p className="text-center text-lg text-gray-300 mb-12">
        🔥 Exclusive Drops & Bold Collabs
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border transition-all ${
              filter === cat
                ? "bg-pink-600 border-pink-600 text-white"
                : "border-gray-600 text-gray-300 hover:border-pink-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-gray-400 animate-pulse">Loading merch...</p>
      )}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {!loading && products.length > 0 && (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden border border-zinc-800 hover:scale-[1.03] hover:border-pink-500 transition-transform"
              >
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1">{p.name}</h2>
                  <p className="text-sm text-gray-400">{p.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          ❌ No products available right now. New drops coming soon!
        </p>
      )}
    </div>
  );
}
