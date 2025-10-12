"use client";
import { useEffect, useState } from "react";
import LandingAdminLayout from "./_layout";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface MetricsResponse {
  emailsTotal: number;
  emailsToday: number;
  ambassadors: number;
  merch: number;
  promosCount: number;
}

interface TimelinePoint {
  date: string;
  count: number;
}

export default function Analytics() {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [timeline, setTimeline] = useState<TimelinePoint[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [metricsRes, timelineRes] = await Promise.all([
          fetch("/api/admin/metrics"),
          fetch("/api/admin/analytics"),
        ]);

        if (metricsRes.ok) {
          const data = await metricsRes.json();
          setMetrics(data);
        }
        if (timelineRes.ok) {
          const tData = await timelineRes.json();
          setTimeline(Array.isArray(tData) ? tData : []);
        }
      } catch (error) {
        console.error("Failed to load analytics", error);
      }
    }

    load();
  }, []);

  return (
    <LandingAdminLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Total Signups" value={metrics?.emailsTotal} />
          <StatCard label="Signups Today" value={metrics?.emailsToday} />
          <StatCard label="Ambassadors" value={metrics?.ambassadors} />
          <StatCard label="Merch Sales" value={metrics?.merch} />
        </div>

        <Card className="bg-neutral-950 p-6 rounded-2xl">
          <h2 className="text-xl mb-4 font-bold text-deep-crimson">Signup Activity (30 days)</h2>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeline} margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="date" stroke="#aaa" hide={timeline.length > 30} />
                <YAxis stroke="#aaa" allowDecimals={false} width={60} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #333" }} />
                <Line type="monotone" dataKey="count" stroke="#ff003c" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </LandingAdminLayout>
  );
}

function StatCard({ label, value }: { label: string; value?: number }) {
  return (
    <Card className="bg-black text-white flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg">
      <span className="text-xs uppercase tracking-widest text-acid-white/60">{label}</span>
      <span className="text-4xl font-extrabold text-deep-crimson">
        {typeof value === "number" ? value : "—"}
      </span>
    </Card>
  );
}
