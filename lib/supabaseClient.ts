import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client (safe for browser use)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service client (only for server-side API use)
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
