import { test, expect } from "@playwright/test";

test.describe("SPL@T Smoke Suite", () => {
  test("homepage renders HeroFlashSale", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=💦")).toBeVisible();
  });

  test("email signup page does NOT render HeroFlashSale", async ({ page }) => {
    await page.goto("/email-signup");
    await expect(page.locator("text=💦")).toHaveCount(0);
    await expect(page.locator("form")).toBeVisible();
  });

  test("forms render with block style inputs + CAPTCHA", async ({ page }) => {
    const forms = ["/contact", "/ambassador", "/checkout/test-order-id"];
    for (const url of forms) {
      await page.goto(url);
      await expect(page.locator("form")).toBeVisible();
      await expect(page.locator("input")).toHaveClass(/rounded-xl/);
      await expect(
        page.locator("iframe[title=\"Cloudflare Turnstile challenge\"]")
      ).toBeVisible();
    }
  });

  test("merch page shows coming soon", async ({ page }) => {
    await page.goto("/merch");
    await expect(page.locator("text=Coming Soon")).toBeVisible();
  });

  test("storefront page loads", async ({ page }) => {
    await page.goto("/storefront");
    await expect(page.locator("main")).toBeVisible();
  });

  test("admin login shows login form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator("input[type=email]")).toBeVisible();
    await expect(page.locator("input[type=password]")).toBeVisible();
  });
});
