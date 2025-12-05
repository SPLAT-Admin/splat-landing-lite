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
  const [message, setMessage] = useState("");
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
    price: "",
    category_id: "",
  });

  // 🧠 Fetch from the marketing schema
  async function fetchProducts(sync = false) {
    setLoading(true);
    try {
      const res = await fetch(`/api/landingadmin/printify${sync ? "?sync=true" : ""}`);
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data.error || "Failed to load products");
      setProducts(data.products || []);
      setCategories(data.categories || []);
      setMessage(sync ? "✅ Synced with Supabase" : "");
      // Initialize draft fields
      const drafts: Record<string, string> = {};
      for (const p of data.products || []) {
        drafts[`${p.id}-title`] = p.title || "";
        drafts[`${p.id}-price`] = p.price?.toString() || "";
        drafts[`${p.id}-shop_url`] = p.shop_url || "";
      }
      setFieldDrafts(drafts);
    } catch (err: any) {
      console.error("❌ fetchProducts:", err);
      setMessage(err.message || "Error loading merch");
    } finally {
      setLoading(false);
    }
  }

  // 🧩 Publish toggle
  async function togglePublish(id: string, publish: boolean) {
    setMessage(publish ? "Publishing..." : "Unpublishing...");
    try {
      const res = await fetch("/api/landingadmin/printify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: publish }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data.error);
      setMessage(data.message || "Updated!");
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Unable to publish product");
    }
  }

  // 🧩 Category update
  async function updateCategory(id: string, category_id: string) {
    try {
      const res = await fetch("/api/landingadmin/printify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, category_id }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data.error);
      setMessage("✅ Category updated");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Unable to update category");
    }
  }

  // 🧠 Autosave field handler
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
        const data = await res.json();
        if (!res.ok || data.ok === false) throw new Error(data.error);
        setFieldSaving((prev) => ({ ...prev, [key]: "saved" }));
        setTimeout(() => setFieldSaving((prev) => ({ ...prev, [key]: "" })), 1500);
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
      const parsed = parseFloat(value);
      if (Number.isNaN(parsed)) return;
      scheduleFieldSave(id, field, parsed);
    } else {
      scheduleFieldSave(id, field, value);
    }
  };

  // 🧱 Create new product (marketing schema)
  async function createProduct() {
    if (!newProduct.title || !newProduct.price) {
      setMessage("⚠️ Missing required fields (title, price).");
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
            image_url: newProduct.image_url,
            price: parseFloat(newProduct.price),
            category_id: newProduct.category_id || null,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data.error);
      setMessage("✅ Product created");
      setNewProduct({ title: "", description: "", image_url: "", price: "", category_id: "" });
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
    return () => Object.values(fieldTimers.current).forEach(clearTimeout);
  }, []);

  return (
    <div className="p-8 bg-neutral-950 text-acid-white min-h-screen space-y-8">
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

      <p className="text-acid-white/80">{message}</p>

      {/* Create product */}
      <section className="p-4 border border-neutral-800 rounded-2xl bg-neutral-900">
        <h2 className="text-xl font-semibold mb-3">Create Product</h2>
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

      {/* Product grid */}
      <section>
        {loading ? (
          <p className="text-acid-white/70">Loading products...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="p-4 border border-neutral-800 rounded-xl bg-neutral-900">
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="rounded-md mb-3 w-full h-48 object-cover"
                />

                <label className="block text-sm opacity-80">Title</label>
                <input
                  type="text"
                  value={fieldDrafts[`${p.id}-title`] ?? ""}
                  onChange={(e) => handleFieldChange(p.id, "title", e.target.value)}
                  className="mt-1 p-2 w-full bg-neutral-800 rounded-md text-acid-white"
                />

                <label className="block mt-3 text-sm opacity-80">Category</label>
                <select
                  value={p.category_id || ""}
                  onChange={(e) => updateCategory(p.id, e.target.value)}
                  className="mt-1 p-2 w-full bg-neutral-800 rounded-md text-acid-white"
                >
                  <option value="">— None —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <label className="block mt-4 text-sm opacity-80">Price (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={fieldDrafts[`${p.id}-price`] ?? ""}
                  onChange={(e) => handleFieldChange(p.id, "price", e.target.value)}
                  className="mt-1 p-2 w-full bg-neutral-800 rounded-md text-acid-white"
                />

                <label className="block mt-4 text-sm opacity-80">Shop URL</label>
                <input
                  type="url"
                  value={fieldDrafts[`${p.id}-shop_url`] ?? ""}
                  onChange={(e) => handleFieldChange(p.id, "shop_url", e.target.value)}
                  className="mt-1 p-2 w-full bg-neutral-800 rounded-md text-acid-white"
                />

                <div className="flex gap-2 mt-4">
                  <Button onClick={() => togglePublish(p.id, true)} className="bg-green-600 w-full">
                    Publish
                  </Button>
                  <Button onClick={() => togglePublish(p.id, false)} className="bg-red-600 w-full">
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
