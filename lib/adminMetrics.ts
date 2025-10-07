import { supabase } from "@/lib/supabaseClient";

/** Count total email signups */
export async function getEmailSignupCount() {
  const { count, error } = await supabase
    .from("email_signups")
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count || 0;
}

/** Count total ambassadors */
export async function getAmbassadorCount() {
  const { count, error } = await supabase
    .from("ambassador")
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count || 0;
}

/** Count total merch sales */
export async function getMerchSalesCount() {
  const { count, error } = await supabase
    .from("merch_sales")
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count || 0;
}

/** Fetch active promos */
export async function getActivePromos() {
  const { data, error } = await supabase
    .from("promos")
    .select("*")
    .eq("is_active", true);
  if (error) throw error;
  return data || [];
}
