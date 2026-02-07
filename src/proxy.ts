import { getIronSession } from "iron-session";
import { type NextRequest, NextResponse } from "next/server";
import { type SessionData, sessionOptions } from "@/shared/libs/session";

const protectedRoutes = ["/dashboard", "/contacts", "/profile"];
const authRoutes = ["/login"];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions,
  );

  const { pathname } = request.nextUrl;
  const isLoggedIn = session.isLoggedIn === true;

  if (isLoggedIn && authRoutes.some((r) => pathname === r)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isLoggedIn && protectedRoutes.some((r) => pathname === r)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard", "/contacts", "/profile", "/login"],
};
