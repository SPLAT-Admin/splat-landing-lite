import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ Guard: fail clearly if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `❌ Supabase config missing:
     NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl || "undefined"}
     NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey ? "present" : "undefined"}`
  );
}

// ✅ Shared client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
