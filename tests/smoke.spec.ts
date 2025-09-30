import { test, expect } from '@playwright/test';

const turnstileSelector = 'iframe[src*="challenges.cloudflare.com"]';
const captchaTimeout = 15_000;

test.describe('SPL@T Smoke Suite', () => {
test('homepage renders GlobalHeader and a single 💦 hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
  const splatDrops = page.locator('text=💦');
  await expect(splatDrops).toHaveCount(1);
});

test('merch storefront renders correctly', async ({ page }) => {
  await page.goto('/merch');
  await expect(page.getByRole('heading', { name: /SPL@T Merch Store/i })).toBeVisible();
  await expect(page.getByText(/🔥 Merch Drops Coming Soon/i)).toBeVisible();
});

test('ambassador apply form uses block style inputs and CAPTCHA', async ({ page }) => {
  await page.goto('/ambassador-apply');
  await expect(page.getByRole('heading', { name: /SPL@T AMBASSADOR/i })).toBeVisible();
  await expect(page.getByLabel(/First Name/i)).toHaveClass(/rounded-xl/);
  if (process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY !== 'fake-dev-key') {
    await expect(page.locator(turnstileSelector).first()).toBeVisible({ timeout: captchaTimeout });
  }
});

test('contact form renders in block-style with CAPTCHA', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { name: /Slide Into SPL@T HQ/i })).toBeVisible();
  await expect(page.getByLabel(/Email/i)).toHaveClass(/rounded-xl/);
  if (process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY !== 'fake-dev-key') {
    await expect(page.locator(turnstileSelector).first()).toBeVisible({ timeout: captchaTimeout });
  }
});

test('email signup form renders cleanly with CAPTCHA', async ({ page }) => {
  await page.goto('/signup');
  await expect(page.getByRole('heading', { name: /Be the First to SPL@T/i })).toBeVisible();
  await expect(page.getByLabel(/Email/i)).toHaveClass(/rounded-xl/);
  if (process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY !== 'fake-dev-key') {
    await expect(page.locator(turnstileSelector).first()).toBeVisible({ timeout: captchaTimeout });
  }
});

test('checkout form renders with order summary and CAPTCHA', async ({ page }) => {
  const orderId = 'test-order-id';
  await page.goto(`/checkout?orderId=${orderId}`);
  await expect(page.getByRole('heading', { name: /Lock Your SPL@T Drop/i })).toBeVisible();
  await expect(page.getByLabel(/Full Name/i)).toHaveClass(/rounded-xl/);
  if (process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY !== 'fake-dev-key') {
    await expect(page.locator(turnstileSelector).first()).toBeVisible({ timeout: captchaTimeout });
  }
});

  test('admin login page renders', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /Admin Login/i })).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });
});
