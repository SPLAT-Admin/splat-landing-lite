import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TimelinePoint {
  date: string;
  count: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<TimelinePoint[]>([]);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((timeline) => setData(Array.isArray(timeline) ? timeline : []))
      .catch((error) => console.error("Failed to load analytics:", error));
  }, []);

  const total = data.reduce((sum, point) => sum + (point.count || 0), 0);
  const today = data.length ? data[data.length - 1].count : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="bg-black text-white flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg">
          <span className="text-xs uppercase tracking-widest text-acid-white/70">
            Signups Today
          </span>
          <span className="text-5xl font-extrabold text-deep-crimson">{today}</span>
        </Card>
        <Card className="bg-black text-white flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg">
          <span className="text-xs uppercase tracking-widest text-acid-white/70">
            Total Signups
          </span>
          <span className="text-5xl font-extrabold text-deep-crimson">{total}</span>
        </Card>
      </div>

      <Card className="bg-neutral-950 p-6 rounded-2xl">
        <h2 className="text-xl mb-4 font-bold text-deep-crimson">Daily Email Signups</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8A0E1D" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
