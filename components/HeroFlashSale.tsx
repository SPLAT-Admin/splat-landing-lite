import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabaseClient";

interface Promo {
  id?: string;
  title: string;
  subtitle?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
  is_active?: boolean;
}

const fallbackPromo: Promo = {
  title: "💦 Flash Drop Incoming",
  subtitle: "Join the SPL@T waitlist to get the next drop before it splashes.",
  cta_label: "Join the Waitlist",
  cta_href: "/signup",
};

export default function HeroFlashSale() {
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    let mounted = true;

    const resolveClient = (): SupabaseClient | null => {
      try {
        return getSupabaseClient();
      } catch (error) {
        console.warn("HeroFlashSale supabase unavailable", error);
        return null;
      }
    };

    const supabase = resolveClient();
    if (!supabase) {
      return () => {
        mounted = false;
      };
    }

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
      } else if (data) {
        setPromo(data);
      }
    };

    void loadPromo();

    return () => {
      mounted = false;
    };
  }, []);

  const activePromo = promo ?? fallbackPromo;

  if (!activePromo) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-r from-[#851825] to-black text-white py-20 px-6 text-center">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">{activePromo.title}</h1>
        {activePromo.subtitle ? (
          <p className="text-lg text-white/80">{activePromo.subtitle}</p>
        ) : null}
        {activePromo.cta_label && activePromo.cta_href ? (
          <a
            href={activePromo.cta_href}
            className="mt-4 inline-block rounded-xl bg-white px-8 py-3 font-bold uppercase tracking-[0.3em] text-[#851825] shadow-lg transition hover:scale-105"
          >
            {activePromo.cta_label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
