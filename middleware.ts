import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Global middleware to protect /admin/* and /api/admin/* with a single shared token.
 *
 * Auth is satisfied by EITHER:
 *  - Authorization: Bearer <ADMIN_DASH_TOKEN>
 *  - Cookie: admin_dash_token=<ADMIN_DASH_TOKEN>
 *  - Query string token (for CSV export compatibility): ?token=<ADMIN_DASH_TOKEN>
 */
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Only guard admin areas
  const isAdminPath = pathname.startsWith("/admin/") || pathname === "/admin";
  const isAdminApi = pathname.startsWith("/api/admin/");
  if (!isAdminPath && !isAdminApi) return NextResponse.next();

  const TOKEN = process.env.ADMIN_DASH_TOKEN;
  if (!TOKEN) {
    return new NextResponse("Server misconfigured: ADMIN_DASH_TOKEN is missing.", { status: 500 });
  }

  // Accept header, cookie, or query param (for CSV export links)
  const header = req.headers.get("authorization");
  const cookie = req.cookies.get("admin_dash_token")?.value;
  const qsToken = searchParams.get("token");

  const ok = header === `Bearer ${TOKEN}` || cookie === TOKEN || qsToken === TOKEN;
  if (ok) return NextResponse.next();

  // API routes: return 401 with WWW-Authenticate
  if (isAdminApi) {
    return new NextResponse("Unauthorized", { status: 401, headers: { "WWW-Authenticate": "Bearer" } });
  }

  // Browser routes: simple 401 page
  return new NextResponse("Unauthorized", { status: 401 });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
