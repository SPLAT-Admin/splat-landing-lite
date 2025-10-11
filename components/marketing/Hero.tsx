"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";

interface Promo {
  id: string;
  title: string;
  subtitle: string;
  image_url?: string;
}

export default function Hero() {
  const supabase = createClientComponentClient();
  const [promos, setPromos] = useState<Promo[]>([]);

  useEffect(() => {
    const fetchPromos = async () => {
      const { data } = await supabase.from("promos").select("*").limit(1);
      if (data) setPromos(data);
    };
    fetchPromos();
  }, [supabase]);

  const promo = promos[0];

  return (
    <section className="relative bg-neutral-950 text-white px-6 py-24 text-center overflow-hidden">
      {promo?.image_url && (
        <Image
          src={promo.image_url}
          alt={promo.title}
          fill
          className="object-cover opacity-20"
          priority
        />
      )}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">{promo?.title || "Welcome to SPL@T"}</h1>
        <p className="text-lg text-gray-300 mb-10">
          {promo?.subtitle || "Join the SPL@T movement — sign up for exclusive updates."}
        </p>
        <Link
          href="/signup"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-xl shadow-lg transition"
        >
          Join SPL@T Today
        </Link>
      </div>
    </section>
  );
}
