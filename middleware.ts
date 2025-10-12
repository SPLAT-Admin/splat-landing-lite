import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  const isAdminPath = pathname.startsWith("/admin");
  const isLandingAdminPath = pathname.startsWith("/landingadmin");
  const isLoginPath = pathname.startsWith("/admin/login");

  if ((isAdminPath || isLandingAdminPath) && !isLoginPath) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
