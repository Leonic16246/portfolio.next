import { describe, it, expect, vi } from 'vitest'
import { isAdmin } from './is-admin'
import type { SupabaseClient } from '@supabase/supabase-js'

function mockSupabase(rpcResult: { data: unknown; error: unknown }) {
  return {
    rpc: vi.fn().mockResolvedValue(rpcResult),
  } as unknown as SupabaseClient
}

describe('isAdmin', () => {
  it('returns true when rpc succeeds with data === true', async () => {
    const supabase = mockSupabase({ data: true, error: null })
    await expect(isAdmin(supabase)).resolves.toBe(true)
  })

  it('returns false when rpc succeeds but data is false', async () => {
    const supabase = mockSupabase({ data: false, error: null })
    await expect(isAdmin(supabase)).resolves.toBe(false)
  })

  it('returns false when rpc errors, even if data is true', async () => {
    const supabase = mockSupabase({ data: true, error: new Error('boom') })
    await expect(isAdmin(supabase)).resolves.toBe(false)
  })
})