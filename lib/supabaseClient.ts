import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
}

if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
}

if (!supabaseServiceKey) {
  throw new Error('Missing Supabase service role key. Set SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY) in your environment.');
}

// Public client (safe for browser use)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service client (only for server-side API use)
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
