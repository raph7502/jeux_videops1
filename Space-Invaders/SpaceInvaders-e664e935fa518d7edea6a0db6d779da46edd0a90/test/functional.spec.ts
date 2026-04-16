import {test, expect} from '@playwright/test';

test.describe('Space Invaders - Tests Fonctionnels', () => {
  test('1. Le jeu doit charger et afficher le canvas', async ({page}) => {
    await page.goto('/');
    const canvas = page.locator('#canvas');
    await expect(canvas).toBeVisible();
  });

  test('2. Le menu principal affiche le titre du jeu', async ({page}) => {
    await page.goto('/');
    const title = page.locator('#menu h1');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Space Invaders');
  });

  test('3. Le score est présent dans le DOM au chargement', async ({page}) => {
    await page.goto('/');
    const scoreEl = page.locator('.score');
    await expect(scoreEl).toBeAttached();
    await expect(scoreEl).toContainText(/Score/i);
  });
});
