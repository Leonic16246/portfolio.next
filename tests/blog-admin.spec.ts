import { test, expect } from '@playwright/test'

test('logged-out user does not see the account menu', async ({ page }) => {
  await page.goto('/')
  // Header always renders the account button (avoids layout shift) but
  // hides it via the `invisible` class until a session is loaded.
  await expect(page.getByLabel('Account menu')).not.toBeVisible()
  await expect(page.getByText('Log out')).not.toBeVisible()
})