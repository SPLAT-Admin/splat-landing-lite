"use client";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { withAdminAuth } from "@/components/withAdminAuth";
import { supabase } from "@/lib/supabaseClient";

interface Promo {
  id: string;
  title: string;
  cta_label?: string;
  is_active: boolean;
  created_at: string;
}

function PromosPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("promos")
        .select("id,title,cta_label,is_active,created_at")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Failed to load promos", error.message);
        setPromos([]);
      } else {
        setPromos(data || []);
      }
      setLoading(false);
    }

    load();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Promos</h1>
        {loading ? (
          <p className="text-gray-400">Loading promos…</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/70">
            <table className="w-full text-left text-sm text-gray-200">
              <thead className="bg-white/5 uppercase text-xs tracking-wider text-acid-white/70">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">CTA Label</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {promos.map((promo) => (
                  <tr key={promo.id} className="border-t border-white/10">
                    <td className="px-4 py-3 font-semibold">{promo.title}</td>
                    <td className="px-4 py-3">
                      <span className={promo.is_active ? "text-emerald-400" : "text-red-400"}>
                        {promo.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{promo.cta_label || "—"}</td>
                    <td className="px-4 py-3">
                      {promo.created_at ? new Date(promo.created_at).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
                {promos.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>
                      No promos found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(PromosPage);
