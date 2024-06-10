import { NextRequest, NextResponse } from "next/server";
import { isAuthPages, isDashboardPage } from "./lib/auth";
import { verifyJwtToken } from "./lib/auth";
export async function middleware(req: NextRequest) {
  const { url, cookies, nextUrl } = req;
  const { value: token } = cookies.get("auth-token") ?? { value: null };

  const hasVerifyToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  //* login and signnup pages are only accessible to unauthenticated users
  if (isAuthPageRequested) {
    if (hasVerifyToken) {
      const response = NextResponse.redirect(new URL("/", url));
      return response;
    }
    const response = NextResponse.next();
    return response;
  }

  //* dashboard pages (root page) is only accessible to authenticated users
  if (isDashboardPage(nextUrl.pathname)) {
    if (hasVerifyToken) {
      const response = NextResponse.next();
      return response;
    }
    const response = NextResponse.redirect(new URL("/login", url));
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
