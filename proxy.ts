import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Exp 8: Guest / User / Admin permission layers.
//  Guest  -> can browse shop pages only
//  User   -> can also use /checkout and /account
//  Admin  -> can also use /admin and /api/admin
export async function proxy(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  const { pathname } = req.nextUrl;

  const needsLogin =
    pathname.startsWith("/account") || pathname.startsWith("/checkout") || pathname.startsWith("/admin");

  if (needsLogin && !session) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") && session?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*"],
};
