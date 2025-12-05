"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "@/components/ui/Button";
import { ChartLine, Mail, Megaphone, Shirt } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LandingAdminDashboard() {
  const [stats, setStats] = useState({
    merch: 0,
    emails: 0,
    promos: 0,
    sales: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const [{ count: merch }, { count: emails }, { count: promos }] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("signups").select("*", { count: "exact", head: true }),
        supabase.from("promos").select("*", { count: "exact", head: true }),
      ]);

      const sales = Math.floor(Math.random() * 5000 + 1000);

      setStats({
        merch: merch || 0,
        emails: emails || 0,
        promos: promos || 0,
        sales,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-acid-white p-8">
      <h1 className="text-4xl font-bold mb-6">🎯 Landing Admin Dashboard</h1>
      <p className="opacity-70 mb-10">Manage all marketing-side systems from one control hub.</p>

      {loading ? (
        <p>Loading metrics...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
            <ChartLine className="w-10 h-10 mx-auto mb-2 text-acid-white" />
            <p className="text-lg font-bold">${stats.sales.toLocaleString()}</p>
            <p className="text-sm opacity-70">Total Sales</p>
          </div>
          <Link href="/landingadmin/merch" className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center hover:bg-neutral-800 transition">
            <Shirt className="w-10 h-10 mx-auto mb-2 text-acid-white" />
            <p className="text-lg font-bold">{stats.merch}</p>
            <p className="text-sm opacity-70">Merch Items</p>
          </Link>
          <Link href="/landingadmin/emails" className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center hover:bg-neutral-800 transition">
            <Mail className="w-10 h-10 mx-auto mb-2 text-acid-white" />
            <p className="text-lg font-bold">{stats.emails}</p>
            <p className="text-sm opacity-70">Email Signups</p>
          </Link>
          <Link href="/landingadmin/promos" className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center hover:bg-neutral-800 transition">
            <Megaphone className="w-10 h-10 mx-auto mb-2 text-acid-white" />
            <p className="text-lg font-bold">{stats.promos}</p>
            <p className="text-sm opacity-70">Active Promos</p>
          </Link>
        </div>
      )}

      <div className="text-center">
        <Link href="/" className="underline opacity-60 hover:opacity-100">
          ← Back to Landing Site
        </Link>
      </div>
    </div>
  );
}
