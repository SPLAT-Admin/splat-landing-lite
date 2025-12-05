import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  category?: string | null;
};

export default function Merch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("marketing.products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Error fetching products:", error);
      } else {
        console.log("✅ Products loaded:", data);
        setProducts((data as Product[]) || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-10 text-center">⏳ Loading products...</div>;

  if (!products.length)
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold mb-3">SPL@T Merch Store</h1>
        <p>🔥 Exclusive Drops & Bold Collabs</p>
        <p className="text-gray-600 mt-4">
          ❌ No active products at the moment. New drops are coming soon.<br />
          Expect staples like T-shirts, hoodies, hats, and a seasonal Christmas stocking 🎄💦.
        </p>
      </div>
    );

  const categories = ["All", ...new Set(products.map((p) => p.category || "Uncategorized"))];
  const filtered =
    category === "All" ? products : products.filter((p) => (p.category || "Uncategorized") === category);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">SPL@T Merch Store</h1>
      <p className="text-center text-gray-600 mb-6">🔥 Exclusive Drops & Bold Collabs</p>

      <div className="flex gap-3 justify-center mb-6 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              category === c
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="rounded-xl shadow-lg p-4 bg-white hover:scale-105 transition-transform"
          >
            <img
              src={p.image_url || "/splat-logo.png"}
              alt={p.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="font-semibold mt-2 text-lg">{p.name}</h2>
            <p className="text-sm text-gray-500">{p.category || "Uncategorized"}</p>
            <p className="text-gray-700 font-semibold">${p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
