"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent } from "@/components/ui/card";

export default function Analytics() {
  const supabase = createClientComponentClient();
  const [daily, setDaily] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { count: totalCount } = await supabase
        .from("email_signups")
        .select("*", { count: "exact", head: true });
      setTotal(totalCount || 0);

      const today = new Date().toISOString().slice(0, 10);
      const { count: dailyCount } = await supabase
        .from("email_signups")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today);
      setDaily(dailyCount || 0);
    };
    load();
  }, [supabase]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Daily Sign-ups</h2>
          <p className="text-4xl font-bold mt-2">{daily}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Total Sign-ups</h2>
          <p className="text-4xl font-bold mt-2">{total}</p>
        </CardContent>
      </Card>
    </div>
  );
}
