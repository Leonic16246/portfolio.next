import type { SupabaseClient } from '@supabase/supabase-js'


export async function isAdmin(supabase: SupabaseClient): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_admin')
  return !error && data === true
}
