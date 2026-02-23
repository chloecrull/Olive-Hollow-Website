import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using environment variables.
// If the project URL or key are not defined the client will still be created
// but queries will fail. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
// in your .env.local file when running locally or in your deployment environment.
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);