"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

interface Product {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  published?: boolean;
  category_id?: string;
  price?: number;
  shop_url?: string;
}
interface Category {
  id: string;
  name: string;
}

type FieldStatus = "saving" | "saved" | "error" | "";

export default function LandingAdminMerch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [fieldDrafts, setFieldDrafts] = useState<Record<string, string>>({});
  const [fieldSaving, setFieldSaving] = useState<Record<string, FieldStatus>>({});
  const fieldTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    image_url: "",
    blueprint_id: "",
    print_provider_id: "",
    price: "",
    category_id: "",
  });

  async function fetchProducts(sync = false) {
    setLoading(true);
    try {
      const res = await fetch(`/api/landingadmin/printify${sync ? "?sync=true" : ""}`);
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Failed to load merch");
      }
      const nextProducts: Product[] = data.products || [];
      setProducts(nextProducts);
      setCategories(data.categories || []);
      setFieldDrafts(
        nextProducts.reduce<Record<string, string>>((acc, p) => {
          acc[`${p.id}-title`] = p.title || "";
          acc[`${p.id}-price`] = typeof p.price === "number" ? p.price.toString() : "";
          acc[`${p.id}-shop_url`] = p.shop_url || "";
          return acc;
        }, {})
      );
      if (sync) setMessage("✅ Synced with Supabase");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Failed to fetch merch");
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
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Unable to update product");
    }
  }

  async function updateCategory(id: string, category_id: string) {
    try {
      const res = await fetch("/api/landingadmin/printify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, category_id }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Failed to update category");
      }
      setMessage(data.message || "Done");
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Unable to update category");
    }
  }

  const scheduleFieldSave = useCallback((id: string, field: string, value: any) => {
    const key = `${id}-${field}`;
    setFieldSaving((prev) => ({ ...prev, [key]: "saving" }));
    if (fieldTimers.current[key]) {
      clearTimeout(fieldTimers.current[key]);
    }
    fieldTimers.current[key] = setTimeout(async () => {
      try {
        const payload: Record<string, any> = { id };
        payload[field] = value;
        const res = await fetch("/api/landingadmin/printify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || data.ok === false) {
          throw new Error(data.error || "Failed to save field");
        }
        setFieldSaving((prev) => ({ ...prev, [key]: "saved" }));
        setTimeout(() => {
          setFieldSaving((prev) => ({ ...prev, [key]: "" }));
        }, 1500);
      } catch (err: any) {
        console.error("❌ Field save error:", err);
        setFieldSaving((prev) => ({ ...prev, [key]: "error" }));
      }
    }, 800);
  }, []);

  const handleFieldChange = (id: string, field: "title" | "price" | "shop_url", value: string) => {
    const key = `${id}-${field}`;
    setFieldDrafts((prev) => ({ ...prev, [key]: value }));
    if (field === "price") {
      if (value === "") {
        scheduleFieldSave(id, field, null);
        return;
      }
      const parsed = parseFloat(value);
      if (Number.isNaN(parsed)) return;
      scheduleFieldSave(id, field, parsed);
      return;
    }
    scheduleFieldSave(id, field, value);
  };

  async function createProduct() {
    if (!newProduct.title || !newProduct.blueprint_id || !newProduct.print_provider_id) {
      setMessage("⚠️ Missing required fields (Title, Blueprint ID, Print Provider ID).");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/landingadmin/printify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          product: {
            title: newProduct.title,
            description: newProduct.description,
            images: newProduct.image_url ? [{ src: newProduct.image_url }] : [],
            blueprint_id: parseInt(newProduct.blueprint_id, 10),
            print_provider_id: parseInt(newProduct.print_provider_id, 10),
            variants: [{ id: 1, price: parseFloat(newProduct.price || "0") * 100 }],
            category_id: newProduct.category_id || null,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Failed to create product");
      }
      setMessage(data.message || "Done");
      setNewProduct({
        title: "",
        description: "",
        image_url: "",
        blueprint_id: "",
        print_provider_id: "",
        price: "",
        category_id: "",
      });
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Unable to create product");
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    return () => {
      Object.values(fieldTimers.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="p-8 bg-neutral-950 text-acid-white min-h-screen space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🛍️ SPL@T Merch — Create + Manage</h1>
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

      <p className="text-acid-white/80">{message}</p>

      <section className="p-4 border border-neutral-800 rounded-2xl bg-neutral-900">
        <h2 className="text-xl font-semibold mb-3">Create New Product</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <input
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            className="p-2 bg-neutral-800 rounded-md"
          />
          <input
            placeholder="Image URL"
            value={newProduct.image_url}
            onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
            className="p-2 bg-neutral-800 rounded-md"
          />
          <input
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="p-2 bg-neutral-800 rounded-md sm:col-span-2 md:col-span-3"
          />
          <input
            placeholder="Blueprint ID"
            value={newProduct.blueprint_id}
            onChange={(e) => setNewProduct({ ...newProduct, blueprint_id: e.target.value })}
            className="p-2 bg-neutral-800 rounded-md"
          />
          <input
            placeholder="Print Provider ID"
            value={newProduct.print_provider_id}
            onChange={(e) => setNewProduct({ ...newProduct, print_provider_id: e.target.value })}
            className="p-2 bg-neutral-800 rounded-md"
          />
          <input
            placeholder="Price (USD)"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-2 bg-neutral-800 rounded-md"
          />
          <select
            value={newProduct.category_id}
            onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
            className="p-2 bg-neutral-800 rounded-md"
          >
            <option value="">— Category —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={createProduct}
          disabled={creating}
          className="mt-4 bg-acid-white text-black font-semibold"
        >
          {creating ? "Creating..." : "➕ Create Product"}
        </Button>
      </section>

      <section>
        {loading ? (
          <p className="text-acid-white/70">Loading products...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-4 border border-neutral-800 rounded-xl bg-neutral-900"
              >
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="rounded-md mb-3 w-full h-48 object-cover"
                />
                <label className="block text-sm opacity-80">Title</label>
                <div className="relative">
                  <input
                    type="text"
                    value={fieldDrafts[`${p.id}-title`] ?? ""}
                    onChange={(e) => handleFieldChange(p.id, "title", e.target.value)}
                    className="mt-1 p-2 w-full bg-neutral-800 rounded-md text-acid-white pr-24"
                  />
                  {fieldSaving[`${p.id}-title`] === "saving" && (
                    <span className="absolute right-3 top-3 text-xs text-yellow-400 animate-pulse">
                      Saving…
                    </span>
                  )}
                  {fieldSaving[`${p.id}-title`] === "saved" && (
                    <span className="absolute right-3 top-3 text-xs text-green-400">✅ Saved</span>
                  )}
                  {fieldSaving[`${p.id}-title`] === "error" && (
                    <span className="absolute right-3 top-3 text-xs text-red-400">⚠️ Error</span>
                  )}
                </div>

                <label className="block mt-3 text-sm opacity-80">Category</label>
                <select
                  value={p.category_id || ""}
                  onChange={(e) => updateCategory(p.id, e.target.value)}
                  className="mt-1 p-2 w-full bg-neutral-800 rounded-md text-acid-white"
                >
                  <option value="">— None —</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <label className="block mt-4 text-sm opacity-80">Price (USD)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={fieldDrafts[`${p.id}-price`] ?? ""}
                    onChange={(e) => handleFieldChange(p.id, "price", e.target.value)}
                    className="mt-1 p-2 w-full bg-neutral-800 rounded-md text-acid-white pr-24"
                  />
                  {fieldSaving[`${p.id}-price`] === "saving" && (
                    <span className="absolute right-3 top-3 text-xs text-yellow-400 animate-pulse">
                      Saving…
                    </span>
                  )}
                  {fieldSaving[`${p.id}-price`] === "saved" && (
                    <span className="absolute right-3 top-3 text-xs text-green-400">✅ Saved</span>
                  )}
                  {fieldSaving[`${p.id}-price`] === "error" && (
                    <span className="absolute right-3 top-3 text-xs text-red-400">⚠️ Error</span>
                  )}
                </div>

                <label className="block mt-4 text-sm opacity-80">Shop URL</label>
                <div className="relative">
                  <input
                    type="url"
                    value={fieldDrafts[`${p.id}-shop_url`] ?? ""}
                    onChange={(e) => handleFieldChange(p.id, "shop_url", e.target.value)}
                    className="mt-1 p-2 w-full bg-neutral-800 rounded-md text-acid-white pr-24"
                    placeholder="https://yourstore.com/product-link"
                  />
                  {fieldSaving[`${p.id}-shop_url`] === "saving" && (
                    <span className="absolute right-3 top-3 text-xs text-yellow-400 animate-pulse">
                      Saving…
                    </span>
                  )}
                  {fieldSaving[`${p.id}-shop_url`] === "saved" && (
                    <span className="absolute right-3 top-3 text-xs text-green-400">✅ Saved</span>
                  )}
                  {fieldSaving[`${p.id}-shop_url`] === "error" && (
                    <span className="absolute right-3 top-3 text-xs text-red-400">⚠️ Error</span>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => togglePublish(p.id, true)}
                    className="bg-green-600 text-white w-full"
                  >
                    Publish
                  </Button>
                  <Button
                    onClick={() => togglePublish(p.id, false)}
                    className="bg-red-600 text-white w-full"
                  >
                    Unpublish
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
