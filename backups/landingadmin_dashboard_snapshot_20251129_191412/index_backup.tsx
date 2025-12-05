"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CampaignCommand() {
  const [sales, setSales] = useState([]);
  const [signups, setSignups] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const [salesRes, signupsRes, promosRes] = await Promise.all([
      fetch("/api/landingadmin/metrics/sales"),
      fetch("/api/landingadmin/metrics/signups"),
      fetch("/api/landingadmin/promos")
    ]);
    const salesData = await salesRes.json();
    const signupsData = await signupsRes.json();
    const promosData = await promosRes.json();
    setSales(salesData.data || []);
    setSignups(signupsData.data || []);
    setPromos(promosData.promos || []);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  if (loading) return <p className="p-8">Loading metrics...</p>;

  const totalRevenue = sales.reduce((sum, s) => sum + (s.total_amount || 0), 0);
  const totalSignups = signups.reduce((sum, s) => sum + (s.signup_count || 0), 0);
  const activePromos = promos.filter(p => p.is_active).length;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-6">🎯 Campaign Command Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card><CardContent className="p-6"><h2 className="text-xl font-semibold">💵 Total Revenue</h2><p className="text-3xl font-bold mt-2">${totalRevenue.toFixed(2)}</p></CardContent></Card>
        <Card><CardContent className="p-6"><h2 className="text-xl font-semibold">📧 Total Email Signups</h2><p className="text-3xl font-bold mt-2">{totalSignups}</p></CardContent></Card>
        <Card><CardContent className="p-6"><h2 className="text-xl font-semibold">🚀 Active Promos</h2><p className="text-3xl font-bold mt-2">{activePromos}</p></CardContent></Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Daily Revenue</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total_amount" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Email Signups</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={signups}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="signup_count" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Promo Toggle */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Promos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promos.map(p => (
            <Card key={p.id}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.subtitle}</p>
                </div>
                <Button
                  onClick={async () => {
                    await fetch("/api/landingadmin/promos/toggle", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ id: p.id, is_active: !p.is_active })
                    });
                    loadData();
                  }}
                  className={p.is_active ? "bg-green-600 text-white" : "bg-gray-300 text-black"}
                >
                  {p.is_active ? "Active" : "Inactive"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
