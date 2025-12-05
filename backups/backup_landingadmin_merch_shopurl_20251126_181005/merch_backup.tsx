"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

interface Product {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  published?: boolean;
  category_id?: string;
  price?: number;
}
interface Category {
  id: string;
  name: string;
}

export default function LandingAdminMerch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");

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
      setProducts(data.products || []);
      setCategories(data.categories || []);
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
    setMessage("Saving category...");
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
  }, []);

  return (
    <div className="p-8 bg-neutral-950 text-acid-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
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
      </div>

      <p className="mb-4 text-acid-white/80">{message}</p>

      <div className="p-5 border border-neutral-800 rounded-2xl mb-8 bg-neutral-900 shadow-lg">
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
      </div>

      {loading ? (
        <p className="text-acid-white/60">Loading products...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-4 border border-neutral-800 rounded-xl bg-neutral-900 shadow hover:scale-[1.02] transition-transform"
            >
              <img
                src={p.image_url || "/placeholder.png"}
                alt={p.title}
                className="rounded-md mb-3 w-full h-48 object-cover"
              />
              <h2 className="font-semibold text-lg mb-1">{p.title}</h2>
              <p className="text-sm opacity-70 mb-2 line-clamp-2">{p.description}</p>

              <label className="block mt-2 text-sm opacity-80">Category</label>
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
    </div>
  );
}
