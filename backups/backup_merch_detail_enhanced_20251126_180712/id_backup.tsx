"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey, { db: { schema: "marketing" } });

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchProduct() {
    if (!id) return;
    setLoading(true);

    const { data: prod, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .single();

    if (error) {
      console.error("❌ Product fetch error:", error);
      setProduct(null);
      setLoading(false);
      return;
    }

    setProduct(prod);

    if (prod?.category_id) {
      const { data: cat, error: catError } = await supabase
        .from("categories")
        .select("id,name")
        .eq("id", prod.category_id)
        .single();
      if (catError) {
        console.error("⚠️ Category fetch error:", catError);
      }
      setCategory(cat || null);
    } else {
      setCategory(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-acid-white">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-acid-white space-y-4">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Button onClick={() => router.push("/merch")} className="bg-acid-white text-black">
          ← Back to Merch
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-acid-white p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={product.image_url || "/placeholder.png"}
            alt={product.title}
            className="rounded-2xl w-full max-w-md object-cover shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-3">{product.title}</h1>
          {category && (
            <p className="text-acid-white/60 text-sm mb-4">
              Category: <span className="font-semibold">{category.name}</span>
            </p>
          )}

          <p className="text-acid-white/80 mb-6 leading-relaxed">
            {product.description || "No description available."}
          </p>

          <div className="text-2xl font-bold mb-6">
            ${product.price?.toFixed(2) ?? "—"}
          </div>

          <Button
            onClick={() => window.open(`https://printify.com/app/products/${product.id}`, "_blank")}
            className="bg-acid-white text-black font-semibold text-lg px-6 py-3 rounded-full shadow-md hover:scale-[1.03] transition-transform"
          >
            🛒 Shop Now
          </Button>

          <div className="mt-6">
            <Button onClick={() => router.push("/merch")} className="bg-neutral-800 text-acid-white">
              ← Back to Merch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
