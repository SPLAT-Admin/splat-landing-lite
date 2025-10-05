"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchPrinifyProducts } from "@/lib/prinifyClient";

export default function MerchShowcase() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchPrinifyProducts().then((data) => setItems(data.products || []));
  }, []);

  if (!items.length)
    return (
      <section className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold">SPL@T Merch Coming Soon 👕</h2>
      </section>
    );

  return (
    <section className="bg-black text-white py-16">
      <h2 className="text-4xl font-bold text-center mb-10">SPL@T Merch 👕</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-6">
        {items.map((p) => (
          <div key={p.id} className="text-center">
            <div className="relative aspect-square mb-4">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <p className="font-semibold">{p.name}</p>
            <p className="text-gray-400">${p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
