"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Promo = {
  id: string;
  title: string;
  subtitle?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
};

export function HeroFlashSale() {
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPromo = async () => {
      const { data, error } = await supabase
        .from("promos")
        .select("id,title,subtitle,cta_label,cta_href")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!isMounted) return;

      if (!error && data) {
        setPromo(data as Promo);
      } else {
        setPromo(null);
      }
    };

    loadPromo();

    const channel = supabase
      .channel("public:promos")
      .on("postgres_changes", { event: "*", schema: "public", table: "promos" }, () => {
        void loadPromo();
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  if (!promo) return null;

  return (
    <section className="relative bg-gradient-to-br from-red-700 to-black text-white rounded-2xl p-10 shadow-2xl">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">{promo.title}</h1>
        {promo.subtitle && <p className="text-lg opacity-90">{promo.subtitle}</p>}
        {promo.cta_label && promo.cta_href && (
          <div className="pt-6">
            <Link
              href={promo.cta_href}
              className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 transition-transform"
            >
              {promo.cta_label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
