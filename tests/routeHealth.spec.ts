import { test, expect } from "@playwright/test";

const criticalRoutes = [
  "/",                       // Home / Landing
  "/merch",                  // Merch Storefront
  "/merch/test-product",     // Example product detail
  "/ambassador-apply",
  "/contact",
  "/signup",
  "/login",
  "/admin-select",
  "/landingadmin",
  "/landingadmin/merch",
  "/landingadmin/promos",
  "/landingadmin/emails",
];

test.describe("🌐 SPL@T Route Health", () => {
  for (const route of criticalRoutes) {
    test(`Check ${route}`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response, `No response for ${route}`).not.toBeNull();
      expect(response!.status(), `Bad status for ${route}`).toBeLessThan(400);

      // optional content sanity check
      const title = await page.title();
      expect(title).not.toMatch(/Error|Not Found/i);
    });
  }
});
