import { NextResponse } from "next/server";

/**
 * Middleware-safe route validation helper for SPL@T
 * Prevents infinite redirects or missing route 404s in Campaign Command.
 */
export function validateRoute(pathname: string) {
  const allowedRoutes = [
    "/",
    "/login",
    "/admin-select",
    "/landingadmin",
    "/landingadmin/index",
    "/landingadmin/merch",
    "/landingadmin/promos",
    "/landingadmin/emails",
    "/contact",
    "/ambassador-apply",
    "/signup",
    "/merch",
  ];
  return allowedRoutes.some((r) => pathname.startsWith(r));
}

export function handleInvalidRoute(pathname: string) {
  if (!validateRoute(pathname)) {
    console.warn("⚠️ Invalid route detected:", pathname);
    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "https://www.usesplat.com"));
  }
  return null;
}
