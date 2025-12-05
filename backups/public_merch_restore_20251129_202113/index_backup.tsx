"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);

  async function fetchData() {
    setLoading(true);
    const [{ data: cats }, { data: prods }] = await Promise.all([
      supabase.from("categories").select("id,name,slug").order("name"),
      supabase
        .from("products")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false }),
    ]);
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
    return () => supabase.removeChannel(channel);
  }, []);

  const featured = products.filter((p) => p.featured && p.published);
  const visibleProducts = activeCategory
    ? products.filter((p) => p.category_id === activeCategory && p.published)
    : products.filter((p) => p.published);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!carouselRef.current || hovering || featured.length === 0) return;
    const interval = setInterval(() => {
      const c = carouselRef.current!;
      if (c.scrollLeft + c.clientWidth >= c.scrollWidth - 10) {
        c.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        c.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [featured.length, hovering]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-acid-white flex items-center justify-center">
        <p>Loading merch...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-acid-white p-8 space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-center mb-2">🛍️ SPL@T Merch</h1>
        <p className="text-center text-acid-white/70">Curated drops, bold fits, and featured heat.</p>
      </div>

      {featured.length > 0 && (
        <section className="relative">
          <h2 className="text-2xl font-semibold mb-4 text-center">🌟 Featured Merch</h2>

          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent z-10 rounded-l-2xl" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-950 via-neutral-950/70 to-transparent z-10 rounded-r-2xl" />

          <Button
            variant="ghost"
            onClick={() => scrollCarousel("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20"
          >
            <ChevronLeft />
          </Button>

          <div
            ref={carouselRef}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
          >
            {featured.map((item) => (
              <div
                key={item.id}
                className="min-w-[260px] bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-md hover:scale-[1.03] transition-transform cursor-pointer"
                onClick={() => (window.location.href = `/merch/${item.id}`)}
              >
                <img
                  src={item.image_url || "/placeholder.png"}
                  alt={item.title}
                  className="rounded-xl w-full h-48 object-cover mb-3"
                />
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm opacity-70 line-clamp-2">{item.description}</p>
                <p className="font-bold mt-2">${item.price?.toFixed(2) ?? "—"}</p>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={() => scrollCarousel("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20"
          >
            <ChevronRight />
          </Button>
        </section>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={() => setActiveCategory(null)}
          className={
            !activeCategory ? "bg-acid-white text-black font-semibold" : "bg-neutral-800 text-acid-white"
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
              className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900 shadow hover:scale-[1.02] transition-transform cursor-pointer"
              onClick={() => (window.location.href = `/merch/${p.id}`)}
            >
              <img
                src={p.image_url || "/placeholder.png"}
                alt={p.title}
                className="rounded-md mb-3 w-full h-56 object-cover"
              />
              <h2 className="font-semibold text-lg mb-1">{p.title}</h2>
              <p className="text-sm opacity-70 mb-2 line-clamp-2">{p.description || ""}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-acid-white">
                  ${p.price?.toFixed(2) ?? "—"}
                </span>
                {p.featured && <span className="text-xs text-acid-white/70 font-semibold">★ Featured</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
