import { test, expect } from '@playwright/test';

const turnstileSelector = 'iframe[src*="challenges.cloudflare.com"]';

test.describe('SPL@T Smoke Suite', () => {
  test('homepage renders GlobalHeader and HeroFlashSale', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByText(/💦/)).toBeVisible();
  });

  test('storefront renders correctly', async ({ page }) => {
    await page.goto('/storefront');
    await expect(page.getByRole('heading', { name: /SPL@T Merch Store/i })).toBeVisible();
  });

  test('merch page renders with Coming Soon items', async ({ page }) => {
    await page.goto('/merch');
    await expect(page.getByText(/Coming Soon/i)).toBeVisible();
  });

  test('ambassador apply form uses block style inputs and CAPTCHA', async ({ page }) => {
    await page.goto('/ambassador-apply');
    await expect(page.getByRole('heading', { name: /Amplify the SPL@TVerse/i })).toBeVisible();
    await expect(page.getByLabel(/First Name/i)).toHaveClass(/rounded-lg/);
    await expect(page.locator(turnstileSelector).first()).toBeVisible();
  });

  test('contact form renders in block-style with CAPTCHA', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /Slide Into SPL@T HQ/i })).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toHaveClass(/rounded-lg/);
    await expect(page.locator(turnstileSelector).first()).toBeVisible();
  });

  test('email signup form renders cleanly with CAPTCHA', async ({ page }) => {
    await page.goto('/email-signup');
    await expect(page.getByRole('heading', { name: /Be the First to SPL@T/i })).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toHaveClass(/rounded-lg/);
    await expect(page.locator(turnstileSelector).first()).toBeVisible();
  });

  test('checkout form renders with order summary and CAPTCHA', async ({ page }) => {
    const orderId = 'test-order-id';
    await page.goto(`/checkout?orderId=${orderId}`);
    await expect(page.getByRole('heading', { name: /Lock Your SPL@T Drop/i })).toBeVisible();
    await expect(page.getByLabel(/Full Name/i)).toHaveClass(/rounded-lg/);
    await expect(page.locator(turnstileSelector).first()).toBeVisible();
  });

  test('admin login page renders', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /Admin Login/i })).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });
});
