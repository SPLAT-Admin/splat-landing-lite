"use client";
import { withAdminAuth } from "@/components/withAdminAuth";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [salesOverTime, setSalesOverTime] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      const { data: orders } = await supabase.from("orders").select("id,total_amount,status,created_at,product_id");
      const { data: customers } = await supabase.from("customers").select("id");
      const { data: ambassadors } = await supabase.from("ambassador").select("id,status");
      const { data: promos } = await supabase.from("promos").select("id,is_active");
      const { data: products } = await supabase.from("products").select("id,name");

      const revenue = orders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;
      const completed = orders?.filter(o => o.status === "completed").length || 0;

      const salesByDay: Record<string, number> = {};
      orders?.forEach(o => {
        const day = new Date(o.created_at).toLocaleDateString();
        salesByDay[day] = (salesByDay[day] || 0) + Number(o.total_amount);
      });
      const salesOverTimeData = Object.entries(salesByDay).map(([day, amount]) => ({ day, amount }));

      const productCount: Record<string, number> = {};
      orders?.forEach(o => {
        if (o.product_id) productCount[o.product_id] = (productCount[o.product_id] || 0) + 1;
      });
      const topProductsData = Object.entries(productCount)
        .map(([id, count]) => ({ name: products?.find(p => p.id === id)?.name || "Unknown", count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setStats({
        totalOrders: orders?.length || 0,
        completedOrders: completed,
        revenue,
        customers: customers?.length || 0,
        ambassadors: ambassadors?.length || 0,
        promos: promos?.filter(p => p.is_active).length || 0
      });
      setSalesOverTime(salesOverTimeData);
      setTopProducts(topProductsData);
    }
    fetchStats();
  }, []);

  if (!stats) return <AdminLayout><p className="p-6">Loading dashboard...</p></AdminLayout>;

  return (
    <AdminLayout>
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-6">
        SPL@T Command Center 💦
      </motion.h1>

      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Total Orders", value: stats.totalOrders },
            { label: "Completed Orders", value: stats.completedOrders },
            { label: "Total Revenue", value: `$${stats.revenue}` },
            { label: "Customers", value: stats.customers },
            { label: "Ambassadors", value: stats.ambassadors },
            { label: "Active Promos", value: stats.promos },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-black text-white rounded-2xl shadow-xl">
                <CardContent className="p-4">
                  <p className="text-sm uppercase text-gray-400">{s.label}</p>
                  <p className="text-2xl font-bold">{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Sales Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesOverTime}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#dc2626" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Top Products</h2>
          <ul className="space-y-2">
            {topProducts.length === 0 ? (
              <li className="text-gray-500">No product sales yet.</li>
            ) : (
              topProducts.map((p) => (
                <li key={p.name} className="flex justify-between border-b pb-1">
                  <span>{p.name}</span>
                  <span className="font-bold">{p.count} sold</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(Dashboard);
