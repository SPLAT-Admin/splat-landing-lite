"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Typography } from "@/components/Typography";

interface Promo {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
}

export default function Hero() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPromos = async () => {
      const { data, error } = await supabase.from("promos").select("*");
      if (error) console.error("Error fetching promos:", error.message);
      else setPromos(data || []);
    };
    fetchPromos();
  }, [supabase]);

  return (
    <section className="relative bg-black text-white py-16 px-4 text-center overflow-hidden">
      <div className="container mx-auto">
        {promos.length > 0 ? (
          promos.map((promo) => (
            <div key={promo.id} className="mb-8">
              <Typography variant="heading" className="text-5xl font-bold mb-4">
                {promo.title}
              </Typography>
              <Typography variant="body" className="text-lg mb-6 text-gray-300">
                {promo.subtitle}
              </Typography>
              {promo.image_url && (
                <div className="mx-auto max-w-3xl">
                  <Image
                    src={promo.image_url}
                    alt={promo.title}
                    width={1200}
                    height={600}
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            <Typography variant="heading" className="text-5xl font-bold mb-4">
              Welcome to SPL@T
            </Typography>
            <Typography variant="body" className="text-lg text-gray-300">
              Get wet. Get noticed. Get connected.
            </Typography>
          </>
        )}
      </div>
    </section>
  );
}
