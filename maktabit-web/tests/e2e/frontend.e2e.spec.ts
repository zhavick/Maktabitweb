import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3390')

    await expect(page).toHaveTitle(/MaktabIT Technology/)

    const heading = page.locator('h1').first()

    await expect(heading).toContainText('MaktabIT')
  })
})
