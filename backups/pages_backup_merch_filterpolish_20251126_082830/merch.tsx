import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface Product {
  id: string;
  name: string;
  category: string;
  image_url: string;
  is_active: boolean;
}

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const fetchProducts = async () => {
      console.log("🧩 Fetching from marketing.products (browser-safe)");
      const { data, error } = await supabase
        .from("marketing.products")
        .select("id, name, category, image_url, is_active")
        .eq("is_active", true)
        .order("category", { ascending: true });

      if (error) {
        console.error("🚨 Merch product load error –", error);
        setError(error.message);
      } else {
        console.log("✅ Merch products loaded:", data);
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-3 text-center">SPL@T Merch Store</h1>
      <p className="text-center text-lg text-gray-300 mb-12">
        🔥 Exclusive Drops & Bold Collabs
      </p>

      {loading && <p className="text-center text-gray-400">Loading merch...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-400">
          ❌ No active products at the moment. New drops are coming soon.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform overflow-hidden"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-400">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
