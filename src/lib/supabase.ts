import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use this client for public requests (like showing products on the frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Use this client for admin/backend requests only (like creating or deleting products)
// NEVER EXPOSE THIS CLIENT TO THE BROWSER
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
