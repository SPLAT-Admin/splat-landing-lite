import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Typography } from "@/components/Typography";

interface Promo {
  id?: string;
  title: string;
  subtitle?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
  is_active?: boolean;
}

const fallbackPromo: Promo = {
  title: "Flash Drop Incoming",
  subtitle: "Join the SPL@T waitlist to get the next drop before it splashes.",
  cta_label: "Join the Waitlist",
  cta_href: "/signup",
};

export default function Hero() {
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    let mounted = true;

    const resolveClient = (): SupabaseClient | null => {
      try {
        return getSupabaseClient();
      } catch (error) {
        console.warn("Hero supabase unavailable", error);
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
        console.error("Hero promo load error", error);
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
  const headingText = (() => {
    const text = activePromo.title?.trim() || fallbackPromo.title;
    return text.includes("💦") ? text : `💦 ${text}`;
  })();

  if (!activePromo) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-deep-crimson via-jet-black to-jet-black text-center py-24 px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <Typography
          as="h1"
          variant="title"
          className="text-[44pt] font-bold text-deep-crimson"
        >
          {headingText}
        </Typography>
        {activePromo.subtitle ? (
          <Typography
            as="p"
            variant="body"
            className="text-[22pt] font-bold text-acid-white"
          >
            {activePromo.subtitle}
          </Typography>
        ) : null}
        {activePromo.cta_label && activePromo.cta_href ? (
          <a
            href={activePromo.cta_href}
            className="inline-flex items-center justify-center rounded-full bg-acid-white px-9 py-3 font-bold uppercase tracking-[0.3em] text-deep-crimson shadow-lg transition-transform hover:scale-105"
          >
            {activePromo.cta_label}
          </a>
        ) : null}
        <Typography variant="body" className="text-sm uppercase tracking-[0.4em] text-acid-white/60">
          Bold. Fast. Unapologetic.
        </Typography>
      </div>
    </section>
  );
}
