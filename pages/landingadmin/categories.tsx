"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "@/components/ui/Button";
import LayoutWrapper from "./_layoutWrapper";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey, { db: { schema: "marketing" } });

export default function LandingAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch categories error", error);
      setMessage("❌ Failed to load categories.");
      return;
    }
    setCategories(data || []);
  }

  async function addCategory() {
    if (!name || !slug) {
      setMessage("⚠️ Name and slug are required.");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("categories")
      .insert([{ name, slug, description }]);
    setLoading(false);
    if (error) {
      console.error("Add category error", error);
      setMessage("❌ Failed to add category.");
    } else {
      setMessage("✅ Category added!");
      setName("");
      setSlug("");
      setDescription("");
      fetchCategories();
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      console.error("Delete category error", error);
      setMessage("❌ Failed to delete category.");
    } else {
      setMessage("🗑️ Category deleted.");
      fetchCategories();
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <LayoutWrapper>
      <div className="p-8 bg-neutral-950 text-acid-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🏷️ SPL@T Merch Categories</h1>
      <p className="mb-4 opacity-70">{message}</p>

      <div className="p-4 border border-neutral-800 rounded-2xl mb-8 bg-neutral-900">
        <h2 className="text-xl font-semibold mb-2">Add New Category</h2>
        <div className="grid gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="p-2 bg-neutral-800 rounded-md"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug (e.g. t-shirts)"
            className="p-2 bg-neutral-800 rounded-md"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            className="p-2 bg-neutral-800 rounded-md"
          />
          <Button
            onClick={addCategory}
            disabled={loading}
            className="mt-2 bg-acid-white text-black font-semibold"
          >
            {loading ? "Saving..." : "Add Category"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 border border-neutral-800 rounded-2xl bg-neutral-900 shadow-md"
          >
            <h3 className="text-lg font-semibold">{cat.name}</h3>
            <p className="text-sm opacity-80 mb-2">{cat.slug}</p>
            {cat.description && (
              <p className="text-xs opacity-60 mb-2">{cat.description}</p>
            )}
            <Button
              onClick={() => deleteCategory(cat.id)}
              className="bg-red-600 text-white mt-2"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      </div>
    </LayoutWrapper>
  );
}
