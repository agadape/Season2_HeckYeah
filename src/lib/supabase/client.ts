import { createBrowserClient } from '@supabase/ssr';
// import { Database } from '@/types/database'; // We'll add this later

export function createClient() {
  return createBrowserClient( // Add <Database> generic here once generated
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
