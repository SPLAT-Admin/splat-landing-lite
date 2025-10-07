import { supabase } from "@/lib/supabaseClient";

/** email signups: today + total */
export async function getEmailSignupStats() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { count: total } = await supabase
    .from("email_signups")
    .select("*", { count: "exact", head: true });

  const { count: today } = await supabase
    .from("email_signups")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOfDay.toISOString());

  return { total: total || 0, today: today || 0 };
}

export async function getAmbassadorCount() {
  const { count } = await supabase
    .from("ambassador")
    .select("*", { count: "exact", head: true });
  return count || 0;
}

export async function getMerchSalesCount() {
  const { count } = await supabase
    .from("merch_sales")
    .select("*", { count: "exact", head: true });
  return count || 0;
}

export async function getActivePromos() {
  const { data } = await supabase
    .from("promos")
    .select("*")
    .eq("is_active", true);
  return data || [];
}

/** signups by date for charting */
export async function getSignupTimeline() {
  const { data, error } = await supabase.rpc("get_signups_by_day");
  if (error) {
    // fallback if RPC not defined
    const { data } = await supabase
      .from("email_signups")
      .select("created_at");
    const map = new Map<string, number>();
    data?.forEach((r) => {
      const day = r.created_at.slice(0, 10);
      map.set(day, (map.get(day) || 0) + 1);
    });
    return Array.from(map, ([date, count]) => ({ date, count }));
  }
  return data || [];
}
