"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "@/components/ui/Button";

interface Product {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  price?: number;
  category_id?: string;
  published?: boolean;
  featured?: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey, { db: { schema: "marketing" } });

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);

    const [{ data: cats, error: catErr }, { data: prods, error: prodErr }] = await Promise.all([
      supabase.from("categories").select("id,name,slug").order("name"),
      supabase
        .from("products")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false }),
    ]);

    if (catErr) console.error("Categories fetch error", catErr);
    if (prodErr) console.error("Products fetch error", prodErr);

    setCategories(cats || []);
    setProducts(prods || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("realtime:products")
      .on(
        "postgres_changes",
        { event: "*", schema: "marketing", table: "products" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const visibleProducts = activeCategory
    ? products.filter((p) => p.category_id === activeCategory)
    : products;

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-acid-white flex items-center justify-center">
        <p>Loading merch...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-acid-white p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-center mb-2">🛍️ SPL@T Merch</h1>
        <p className="text-center text-acid-white/70">
          Choose your vibe and rep the SPL@TVerse.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <Button
          onClick={() => setActiveCategory(null)}
          className={
            !activeCategory
              ? "bg-acid-white text-black font-semibold"
              : "bg-neutral-800 text-acid-white"
          }
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={
              activeCategory === cat.id
                ? "bg-acid-white text-black font-semibold"
                : "bg-neutral-800 text-acid-white"
            }
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <p className="text-center opacity-70">No products in this category yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900 shadow hover:scale-[1.02] transition-transform"
            >
              <img
                src={p.image_url || "/placeholder.png"}
                alt={p.title}
                className="rounded-md mb-3 w-full h-56 object-cover"
              />
              <h2 className="font-semibold text-lg mb-1">{p.title}</h2>
              <p className="text-sm opacity-70 mb-3 line-clamp-2">
                {p.description || ""}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-acid-white">
                  ${p.price?.toFixed(2) ?? "—"}
                </span>
                {p.featured && (
                  <span className="text-xs text-deep-crimson font-semibold">
                    ★ Featured
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
