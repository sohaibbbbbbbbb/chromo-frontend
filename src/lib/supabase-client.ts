import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string

if (!supabaseUrl || !supabaseKey)
  throw new Error('Missing Supabase environment variables')

const supabase = createBrowserClient(supabaseUrl, supabaseKey);
export default supabase;