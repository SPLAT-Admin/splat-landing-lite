import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
}

if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
}

// Public client (safe for browser use)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let supabaseServiceSingleton: SupabaseClient | null = null;

export function getSupabaseServiceClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("Supabase service client is only available server-side.");
  }

  if (supabaseServiceSingleton) {
    return supabaseServiceSingleton;
  }

  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseServiceKey) {
    throw new Error(
      "Missing Supabase service role key. Set SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY) in your environment."
    );
  }

  supabaseServiceSingleton = createClient(supabaseUrl, supabaseServiceKey);
  return supabaseServiceSingleton;
}
