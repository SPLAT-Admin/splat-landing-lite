import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
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
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );

    const fetchProducts = async () => {
      console.log("🧩 Fetching active merch from marketing.products...");
      const { data, error } = await supabase
        .from("marketing.products")
        .select("id, name, category, image_url, is_active")
        .eq("is_active", true)
        .order("category", { ascending: true });

      if (error) {
        console.error("🚨 Merch fetch error:", error);
        setError(error.message);
      } else {
        console.log("✅ Loaded products:", data);
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filtered =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold mb-4 text-center">SPL@T Merch Store</h1>
      <p className="text-center text-lg text-gray-300 mb-12">
        🔥 Exclusive Drops & Bold Collabs — Loud, Limited, and Never Boring.
      </p>

      {/* Category Filter Bar */}
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
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-400">
          ❌ No {filter === "All" ? "active" : filter.toLowerCase()} products available.
          <br /> Check back soon for new drops.
        </p>
      )}

      {/* Product Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {filtered.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden border border-zinc-800 hover:scale-[1.03] hover:border-pink-500 transition-transform"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                <p className="text-sm text-gray-400">{product.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
