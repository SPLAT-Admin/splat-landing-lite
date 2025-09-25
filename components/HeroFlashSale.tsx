import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

const supabase = getSupabaseClient();

interface Promo {
  id: string;
  title: string;
  subtitle?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
  is_active: boolean;
}

export default function HeroFlashSale() {
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadPromo = async () => {
      const { data, error } = await supabase
        .from("promos")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        console.error("HeroFlashSale promo load error", error);
      } else {
        setPromo(data);
      }
    };

    void loadPromo();

    return () => {
      mounted = false;
    };
  }, [supabase]); // ✅ fixed dependency warning

  if (!promo) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-r from-[#851825] to-black text-white py-20 px-6 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">{promo.title}</h1>
        {promo.subtitle && (
          <p className="mt-4 text-lg text-white/80">{promo.subtitle}</p>
        )}
        {promo.cta_label && promo.cta_href && (
          <a
            href={promo.cta_href}
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-bold text-[#851825] shadow-lg transition hover:scale-105"
          >
            {promo.cta_label}
          </a>
        )}
      </div>
    </section>
  );
}
