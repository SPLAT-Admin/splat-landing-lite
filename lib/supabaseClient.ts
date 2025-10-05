import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `❌ Supabase config missing:\n     NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl || "undefined"}\n     NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey ? "present" : "undefined"}`
  );
}

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const supabase = supabaseClient;

export function getSupabaseClient() {
  return supabaseClient;
}

export function getSupabaseServiceClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      `❌ Service role config missing:\n       NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl || "undefined"}\n       SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceKey ? "present" : "undefined"}`
    );
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}
