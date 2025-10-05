"use client";
import AdminLayout from "@/components/layouts/AdminLayout";
import { withAdminAuth } from "@/components/withAdminAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

function Promos() {
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", subtitle: "", cta_label: "", cta_href: "" });
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  async function fetchPromos() {
    setLoading(true);
    const { data, error } = await supabase.from("promos").select("*").order("created_at", { ascending: false });
    if (error) alert("Error loading promos: " + error.message);
    else setPromos(data || []);
    setLoading(false);
  }

  async function togglePromo(id: string, current: boolean) {
    const { error } = await supabase.from("promos").update({ is_active: !current }).eq("id", id);
    if (error) alert("Update failed: " + error.message);
    else fetchPromos();
  }

  async function createPromo(e: any) {
    e.preventDefault();
    setCreating(true);
    const { error } = await supabase.from("promos").insert([form]);
    if (error) alert("Create failed: " + error.message);
    else {
      setForm({ title: "", subtitle: "", cta_label: "", cta_href: "" });
      fetchPromos();
    }
    setCreating(false);
  }

  async function saveEdit(id: string) {
    const { error } = await supabase.from("promos").update(editForm).eq("id", id);
    if (error) alert("Edit failed: " + error.message);
    else {
      setEditing(null);
      fetchPromos();
    }
  }

  useEffect(() => {
    fetchPromos();
  }, []);

  if (loading) return <p className="p-6">Loading promos...</p>;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold">
        Promo CMS 🎯
      </motion.h1>

      {/* Create New Promo */}
      <form onSubmit={createPromo} className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold">Create New Promo</h2>
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="border p-2 rounded w-full" />
        <input type="text" placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="border p-2 rounded w-full" />
        <input type="text" placeholder="CTA Label" value={form.cta_label} onChange={(e) => setForm({ ...form, cta_label: e.target.value })} className="border p-2 rounded w-full" />
        <input type="url" placeholder="CTA Link (https://...)" value={form.cta_href} onChange={(e) => setForm({ ...form, cta_href: e.target.value })} className="border p-2 rounded w-full" />
        <button type="submit" disabled={creating} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold w-full hover:bg-red-700 transition">
          {creating ? "Creating..." : "Create Promo"}
        </button>
      </form>

      {/* Promo List */}
      {promos.length === 0 ? (
        <p>No promos found.</p>
      ) : (
        <div className="space-y-4">
          {promos.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-md p-4"
            >
              {editing === promo.id ? (
                <div className="space-y-2">
                  <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="border p-2 rounded w-full" />
                  <input type="text" value={editForm.subtitle} onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })} className="border p-2 rounded w-full" />
                  <input type="text" value={editForm.cta_label} onChange={(e) => setEditForm({ ...editForm, cta_label: e.target.value })} className="border p-2 rounded w-full" />
                  <input type="url" value={editForm.cta_href} onChange={(e) => setEditForm({ ...editForm, cta_href: e.target.value })} className="border p-2 rounded w-full" />
                  <div className="flex space-x-2">
                    <button onClick={() => saveEdit(promo.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg">Save</button>
                    <button onClick={() => setEditing(null)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{promo.title}</h2>
                    {promo.subtitle && <p className="text-gray-500">{promo.subtitle}</p>}
                    <p className={`mt-1 text-sm ${promo.is_active ? "text-green-600" : "text-red-600"}`}>{promo.is_active ? "Active" : "Inactive"}</p>
                    {promo.cta_label && <a href={promo.cta_href} target="_blank" className="text-blue-600 underline text-sm">{promo.cta_label}</a>}
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => togglePromo(promo.id, promo.is_active)} className={`px-3 py-1 rounded-lg font-bold transition ${promo.is_active ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}`}>
                      {promo.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => { setEditing(promo.id); setEditForm(promo); }} className="px-3 py-1 rounded-lg bg-yellow-500 text-white">Edit</button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(Promos);
