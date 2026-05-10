import { createClient } from '@supabase/supabase-js'

let _supabase = null

export function getSupabaseServer() {
  if (_supabase) return _supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key || url === 'your_supabase_url_here') return null
  _supabase = createClient(url, key)
  return _supabase
}

// Legacy named export for backwards compat
export const supabase = {
  get _() { return getSupabaseServer() }
}
