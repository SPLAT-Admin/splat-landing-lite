import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // Protect /admin/* and /landingadmin/* routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/landingadmin")) {
    if (!session || session.user?.app_metadata?.role !== "admin") {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Custom 404 for /admin root
  if (pathname === "/admin") {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
