"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, Users, Mail, Megaphone } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface GraphPoint {
  day: string;
  sales: number;
  signups: number;
}

export default function LandingAdminDashboard() {
  const [stats, setStats] = useState({
    salesTotal: 0,
    memberships: 0,
    emails: 0,
    promos: 0,
    graph: [] as GraphPoint[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const [{ data: sales }, { data: members }, { data: emails }, { data: promos }] =
        await Promise.all([
          supabase.from("marketing_sales_view").select("*"),
          supabase.from("marketing_memberships_view").select("*"),
          supabase.from("marketing_signups_daily").select("*"),
          supabase.from("marketing.promos").select("*"),
        ]);

      const salesTotal = sales?.[0]?.total || 0;
      const memberships = members?.[0]?.active_count || 0;
      const emailsTotal = emails?.reduce((sum: number, row: any) => sum + (row.count || 0), 0) || 0;

      const graph: GraphPoint[] = (emails || []).map((row: any) => ({
        day: row.day,
        sales: sales?.find((s: any) => s.day === row.day)?.total_day || 0,
        signups: row.count || 0,
      }));

      setStats({
        salesTotal,
        memberships,
        emails: emailsTotal,
        promos: promos?.length || 0,
        graph,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-acid-white p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">💎 Campaign Command Dashboard</h1>
        <p className="opacity-70">Real-time view of SPL@T sales, memberships, signups, and promos.</p>
      </div>

      {loading ? (
        <p>Loading metrics...</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-neutral-900 border border-neutral-800 text-center">
              <CardContent className="p-6 space-y-2">
                <DollarSign className="w-10 h-10 mx-auto text-acid-white" />
                <p className="text-xl font-bold">${stats.salesTotal.toLocaleString()}</p>
                <p className="text-sm opacity-70">Total Sales</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border border-neutral-800 text-center">
              <CardContent className="p-6 space-y-2">
                <Users className="w-10 h-10 mx-auto text-acid-white" />
                <p className="text-xl font-bold">{stats.memberships}</p>
                <p className="text-sm opacity-70">Active Memberships</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border border-neutral-800 text-center">
              <CardContent className="p-6 space-y-2">
                <Mail className="w-10 h-10 mx-auto text-acid-white" />
                <p className="text-xl font-bold">{stats.emails}</p>
                <p className="text-sm opacity-70">Email Signups</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border border-neutral-800 text-center">
              <CardContent className="p-6 space-y-2">
                <Megaphone className="w-10 h-10 mx-auto text-acid-white" />
                <p className="text-xl font-bold">{stats.promos}</p>
                <p className="text-sm opacity-70">Active Promos</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-neutral-900 border border-neutral-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">📈 7-Day Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.graph} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip contentStyle={{ background: "#111", border: "none" }} />
                  <Line type="monotone" dataKey="sales" stroke="#10b981" name="Sales ($)" strokeWidth={3} />
                  <Line type="monotone" dataKey="signups" stroke="#3b82f6" name="Signups" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
