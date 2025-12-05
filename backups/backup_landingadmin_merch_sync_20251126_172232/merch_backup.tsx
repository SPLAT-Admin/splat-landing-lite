"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

interface Product {
  id: string;
  title: string;
  visible: boolean;
  images: { src: string }[];
}

export default function LandingAdminMerch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/landingadmin/printify");
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Failed to fetch products");
      }
      setProducts(data.products || []);
    } catch (err: any) {
      console.error("Printify fetch failed", err);
      setMessage(err.message || "Unable to load products");
    } finally {
      setLoading(false);
    }
  }

  async function togglePublish(id: string, publish: boolean) {
    setMessage(publish ? "Publishing..." : "Unpublishing...");
    try {
      const res = await fetch("/api/landingadmin/printify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, publish }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Failed to update product");
      }
      setMessage(data.message || "Done");
      await fetchProducts();
    } catch (err: any) {
      console.error("Publish toggle failed", err);
      setMessage(err.message || "Unable to update product");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-neutral-950 text-acid-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🛍️ SPL@T Merch — Printify Control</h1>
      <p className="mb-4 opacity-70">{message}</p>

      {loading ? (
        <p>Loading from Printify...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="p-4 border rounded-lg shadow bg-neutral-900">
              {p.images?.[0]?.src ? (
                <img
                  src={p.images[0].src}
                  alt={p.title}
                  className="rounded-md mb-3 w-full h-48 object-cover"
                />
              ) : (
                <div className="rounded-md mb-3 w-full h-48 bg-neutral-800 flex items-center justify-center text-neutral-500">
                  No Image
                </div>
              )}
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-neutral-400">Visible: {p.visible ? "Yes" : "No"}</p>

              <Button
                onClick={() => togglePublish(p.id, true)}
                className="mt-3 bg-green-600 text-white w-full"
              >
                Publish
              </Button>
              <Button
                onClick={() => togglePublish(p.id, false)}
                className="mt-2 bg-red-600 text-white w-full"
              >
                Unpublish
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
