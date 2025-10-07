import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function LandingAdminDashboard() {
  const [metrics, setMetrics] = useState({ emails: 0, ambassadors: 0, merch: 0, promosCount: 0 });

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then((r) => r.json())
      .then(setMetrics)
      .catch((e) => console.error("Metrics load failed:", e));
  }, []);

  const MetricCard = ({ label, value }: { label: string; value: number }) => (
    <Card className="bg-black text-white flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg">
      <span className="text-xs uppercase tracking-widest text-acid-white/70">{label}</span>
      <span className="text-5xl font-extrabold text-deep-crimson">{value}</span>
    </Card>
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard label="Email Signups" value={metrics.emails} />
      <MetricCard label="Ambassadors" value={metrics.ambassadors} />
      <MetricCard label="Merch Sales" value={metrics.merch} />
      <MetricCard label="Active Promos" value={metrics.promosCount} />
    </div>
  );
}
