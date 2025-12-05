"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LandingAdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalSignups: 0,
    activePromos: 0,
  });
  const [trends, setTrends] = useState<{ date: string; sales: number; signups: number }[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchDashboard() {
    setLoading(true);
    try {
      const [{ data: sales }, { data: signups }, { data: products }, { data: promos }] =
        await Promise.all([
          supabase.schema("marketing").from("sales").select("amount, created_at"),
          supabase.schema("marketing").from("email_signups").select("created_at"),
          supabase.schema("marketing").from("products").select("id"),
          supabase.schema("marketing").from("promos").select("id, is_active"),
        ]);

      const totalSales =
        sales?.reduce((sum, s) => sum + (parseFloat(s.amount as any) || 0), 0) || 0;
      const totalSignups = signups?.length || 0;
      const totalProducts = products?.length || 0;
      const activePromos = promos?.filter((p) => p.is_active).length || 0;

      const salesByDay: Record<string, number> = {};
      const signupsByDay: Record<string, number> = {};
      sales?.forEach((s) => {
        const day = new Date(s.created_at).toISOString().split("T")[0];
        salesByDay[day] = (salesByDay[day] || 0) + (parseFloat(s.amount as any) || 0);
      });
      signups?.forEach((s) => {
        const day = new Date(s.created_at).toISOString().split("T")[0];
        signupsByDay[day] = (signupsByDay[day] || 0) + 1;
      });

      const uniqueDays = Array.from(
        new Set([...Object.keys(salesByDay), ...Object.keys(signupsByDay)])
      ).sort();

      const trendData = uniqueDays.map((day) => ({
        date: day,
        sales: salesByDay[day] || 0,
        signups: signupsByDay[day] || 0,
      }));

      setMetrics({ totalSales, totalSignups, totalProducts, activePromos });
      setTrends(trendData.slice(-7));
    } catch (err) {
      console.error("❌ Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="p-8 text-acid-white space-y-8">
      <header>
        <h1 className="text-3xl font-bold">🎯 Campaign Command Dashboard</h1>
        <p className="opacity-75 mt-1">
          Live snapshot of SPL@T’s marketing ecosystem — sales, signups, promos & merch.
        </p>
      </header>

      {loading ? (
        <p className="opacity-60">Loading dashboard...</p>
      ) : (
        <>
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-neutral-900 border border-neutral-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">💵 Sales</h2>
                <p className="text-2xl font-bold mt-2">${metrics.totalSales.toFixed(2)}</p>
                <Link href="/landingadmin/sales" className="text-xs underline opacity-70 hover:opacity-100">
                  View Sales →
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border border-neutral-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">📈 Signups</h2>
                <p className="text-2xl font-bold mt-2">{metrics.totalSignups}</p>
                <Link href="/landingadmin/emails" className="text-xs underline opacity-70 hover:opacity-100">
                  Manage Emails →
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border border-neutral-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">🛍️ Products</h2>
                <p className="text-2xl font-bold mt-2">{metrics.totalProducts}</p>
                <Link href="/landingadmin/merch" className="text-xs underline opacity-70 hover:opacity-100">
                  Manage Merch →
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border border-neutral-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">🎨 Active Promos</h2>
                <p className="text-2xl font-bold mt-2">{metrics.activePromos}</p>
                <Link href="/landingadmin/promos" className="text-xs underline opacity-70 hover:opacity-100">
                  Manage Promos →
                </Link>
              </CardContent>
            </Card>
          </section>

          <section className="p-4 border border-neutral-800 rounded-xl bg-neutral-900">
            <h2 className="text-xl font-semibold mb-4">📊 7-Day Performance Trends</h2>
            {trends.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trends}>
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "none" }} />
                  <Line type="monotone" dataKey="sales" stroke="#10B981" name="Sales ($)" />
                  <Line type="monotone" dataKey="signups" stroke="#FACC15" name="Signups" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-acid-white/70">No trend data available yet.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
