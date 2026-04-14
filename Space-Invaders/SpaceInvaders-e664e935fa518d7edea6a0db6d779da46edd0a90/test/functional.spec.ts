import { test, expect } from '@playwright/test';

test.describe('Space Invaders - Tests Fonctionnels', () => {
  test('1. Le jeu doit charger et afficher le titre', async ({ page }) => {
    await page.goto('/');
    const canvas = await page.locator('#canvas');
    await expect(canvas).toBeVisible();
  });

  test('2. Le jeu doit démarrer après une action clavier', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Enter');

    await expect(page.locator('text=Space Invaders')).toBeVisible();
  });

  test('3. Le score doit être présent à l\'écran', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Enter');
    await expect(page.locator('body')).toContainText(/Score/i);
  });
});
