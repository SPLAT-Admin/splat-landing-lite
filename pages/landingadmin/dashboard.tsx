"use client";
import { useState, useEffect } from "react";
import LandingAdminLayout from "./_layout";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardPage() {
  const supabase = createClientComponentClient();

  const [metrics, setMetrics] = useState({
    salesTotal: 0,
    salesCount: 0,
    signupCount: 0,
    recentSales: [] as any[],
    recentSignups: [] as any[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all merch sales (real + seed)
        const { data: sales, error: salesError } = await supabase
          .from("merch_sales")
          .select("amount, created_at")
          .order("created_at", { ascending: true });

        if (salesError) console.error("Merch sales error:", salesError);

        const salesTotal =
          sales?.reduce((sum, s) => sum + (s.amount || 0), 0) || 0;

        // Aggregate sales by day for chart
        const groupedSales =
          sales?.reduce((acc: any, s) => {
            const date = new Date(s.created_at).toLocaleDateString("en-US", {
              weekday: "short",
            });
            acc[date] = (acc[date] || 0) + (s.amount || 0);
            return acc;
          }, {}) || {};

        const merchData = Object.entries(groupedSales).map(([day, sales]) => ({
          day,
          sales,
        }));

        // Fetch email signups
        const { data: signups, error: signupError } = await supabase
          .from("email_signups")
          .select("created_at")
          .order("created_at", { ascending: true });

        if (signupError) console.error("Signup error:", signupError);

        const signupCount = signups?.length || 0;

        // Aggregate signups by week for chart
        const groupedSignups =
          signups?.reduce((acc: any, s) => {
            const date = new Date(s.created_at).toLocaleDateString("en-US", {
              weekday: "short",
            });
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {}) || {};

        const signupData = Object.entries(groupedSignups).map(
          ([stage, count]) => ({
            stage,
            count,
          })
        );

        setMetrics({
          salesTotal,
          salesCount: sales?.length || 0,
          signupCount,
          recentSales: merchData,
          recentSignups: signupData,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, [supabase]);

  return (
    <LandingAdminLayout>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-600">Total Merch Sales</h3>
          <p className="text-3xl font-bold text-red-600">
            ${metrics.salesTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-600">Total Orders</h3>
          <p className="text-3xl font-bold text-red-600">
            {metrics.salesCount}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-600">Email Signups</h3>
          <p className="text-3xl font-bold text-red-600">
            {metrics.signupCount}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-600">Support Tickets</h3>
          <p className="text-3xl font-bold text-red-600">17</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Weekly Merch Sales</h3>
          {metrics.recentSales.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={metrics.recentSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#dc2626"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-sm">No sales data yet.</p>
          )}
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Signup Activity</h3>
          {metrics.recentSignups.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={metrics.recentSignups}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-sm">No signups yet.</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h3 className="font-semibold mb-2">Recent Activity</h3>
        <ul className="text-gray-700 space-y-2">
          <li>🛒 {metrics.salesCount} total orders recorded</li>
          <li>📧 {metrics.signupCount} email signups registered</li>
          <li>👤 Active admin: trent@usesplat.com</li>
          <li>❗ System status: All clear</li>
        </ul>
      </div>
    </LandingAdminLayout>
  );
}
