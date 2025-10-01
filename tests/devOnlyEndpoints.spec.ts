import { test, expect } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

test.describe("Dev-only Admin Endpoints", () => {
  test("create-admin should return 403 in production", async ({ request }) => {
    process.env.NODE_ENV = "production";
    const response = await request.post(`${baseUrl}/api/admin/create-admin`, {
      data: { email: "fake@usesplat.com", password: "password" },
    });
    expect(response.status()).toBe(403);
  });

  test("reset-password should return 403 in production", async ({ request }) => {
    process.env.NODE_ENV = "production";
    const response = await request.post(`${baseUrl}/api/admin/reset-password`, {
      data: { email: "fake@usesplat.com", newPassword: "password" },
    });
    expect(response.status()).toBe(403);
  });

  test("create-admin works in dev mode", async ({ request }) => {
    process.env.NODE_ENV = "development";
    const response = await request.post(`${baseUrl}/api/admin/create-admin`, {
      data: { email: "trent@usesplat.com", password: "SuperSecret123" },
    });
    expect([200, 400]).toContain(response.status());
  });

  test("reset-password works in dev mode", async ({ request }) => {
    process.env.NODE_ENV = "development";
    const response = await request.post(`${baseUrl}/api/admin/reset-password`, {
      data: { email: "trent@usesplat.com", newPassword: "EvenMoreSecret456" },
    });
    expect([200, 400, 404]).toContain(response.status());
  });
});
