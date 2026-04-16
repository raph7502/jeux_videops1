import {test, expect} from '@playwright/test';

test('le canvas WebGL est présent dans le DOM', async ({page}) => {
  await page.goto('/');
  const canvas = page.locator('canvas#canvas');
  await expect(canvas).toBeAttached();
});

test('le titre du jeu s\'affiche au chargement', async ({page}) => {
  await page.goto('/');
  const title = page.locator('h1');
  await expect(title).toBeVisible();
  await expect(title).toContainText('Two');
});

test('l\'écran de fin est masqué au démarrage', async ({page}) => {
  await page.goto('/');
  const endScreen = page.locator('.e');
  await expect(endScreen).toBeHidden();
});
