import { test, expect } from '@playwright/test'

test('logged-out user cannot reach the blog admin', async ({ page }) => {
  // The proxy middleware (src/lib/supabase/proxy.ts) redirects unauthenticated
  // visits to /admin/* back to the home page before any admin UI renders.
  await page.goto('/admin/blog')
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Admin Dashboard')).not.toBeVisible()
})
