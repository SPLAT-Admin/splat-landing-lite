"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Button from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  price?: number;
  visible?: boolean;
  category_id?: string | null;
  external_id?: string | null;
  shop_url?: string | null;
}

interface Category {
  id: string;
  name: string;
}

type FieldStatus = "saving" | "saved" | "error" | "";

export default function LandingAdminMerch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<string>("");
  const [syncing, setSyncing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [fieldDrafts, setFieldDrafts] = useState<Record<string, string>>({});
  const [fieldSaving, setFieldSaving] = useState<Record<string, FieldStatus>>({});
  const fieldTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  async function fetchProducts(sync = false) {
    try {
      const res = await fetch(`/api/landingadmin/printify${sync ? "?sync=true" : ""}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch products");
      setProducts(data.products || []);
      setCategories(data.categories || []);
      setMessage(sync ? "✅ Synced with Supabase" : "");
    } catch (err: any) {
      console.error("⚠️ fetch error:", err);
      setMessage(err.message);
    }
  }

  const scheduleFieldSave = useCallback((id: string, field: string, value: any) => {
    const key = `${id}-${field}`;
    setFieldSaving((prev) => ({ ...prev, [key]: "saving" }));
    if (fieldTimers.current[key]) clearTimeout(fieldTimers.current[key]);
    fieldTimers.current[key] = setTimeout(async () => {
      try {
        const payload: Record<string, any> = { id, [field]: value };
        const res = await fetch("/api/landingadmin/printify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to save field");
        setFieldSaving((prev) => ({ ...prev, [key]: "saved" }));
        setTimeout(() => setFieldSaving((prev) => ({ ...prev, [key]: "" })), 1200);
      } catch (err) {
        console.error("❌ save error:", err);
        setFieldSaving((prev) => ({ ...prev, [key]: "error" }));
      }
    }, 800);
  }, []);

  const handleFieldChange = (id: string, field: string, value: string) => {
    setFieldDrafts((prev) => ({ ...prev, [`${id}-${field}`]: value }));
    if (field === "price") {
      const parsed = parseFloat(value);
      if (Number.isNaN(parsed)) return;
      scheduleFieldSave(id, field, parsed);
      return;
    }
    scheduleFieldSave(id, field, value);
  };

  useEffect(() => {
    fetchProducts();
    return () => Object.values(fieldTimers.current).forEach(clearTimeout);
  }, []);

  return (
    <div className="p-8 bg-neutral-950 text-acid-white min-h-screen space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🛍️ SPL@T Merch Manager</h1>
        <Button
          onClick={() => {
            setSyncing(true);
            fetchProducts(true).finally(() => setSyncing(false));
          }}
          className="bg-acid-white text-black font-semibold"
        >
          {syncing ? "🔄 Syncing..." : "🔁 Sync with Supabase"}
        </Button>
      </header>

      <p className="text-acid-white/70">{message}</p>

      <section>
        {products.length === 0 ? (
          <p className="opacity-70">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-4 border border-neutral-800 rounded-xl bg-neutral-900"
              >
                <img
                  src={p.image_url || "/file.svg"}
                  alt={p.name}
                  className="rounded-md mb-3 w-full h-48 object-cover"
                />
                <label className="block text-sm opacity-80">Title</label>
                <input
                  value={fieldDrafts[`${p.id}-name`] ?? p.name ?? ""}
                  onChange={(e) => handleFieldChange(p.id, "name", e.target.value)}
                  className="p-2 bg-neutral-800 rounded-md w-full mb-2"
                />
                <label className="block text-sm opacity-80">Price (USD)</label>
                <input
                  type="number"
                  value={fieldDrafts[`${p.id}-price`] ?? (p.price ?? "")}
                  onChange={(e) => handleFieldChange(p.id, "price", e.target.value)}
                  className="p-2 bg-neutral-800 rounded-md w-full mb-2"
                />
                <label className="block text-sm opacity-80">Category</label>
                <select
                  value={p.category_id ?? ""}
                  onChange={(e) => handleFieldChange(p.id, "category_id", e.target.value)}
                  className="p-2 bg-neutral-800 rounded-md w-full"
                >
                  <option value="">— None —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
