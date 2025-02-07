import { NextResponse, type NextRequest } from "next/server";
import { COOKIES_KEYS } from "./utils/cookies";
import QuizAppRoutes, { AUTHORIZED_PREFIX } from "./RoutePaths";

export function middleware(rq: NextRequest) {
  if (rq.nextUrl.pathname === QuizAppRoutes.Home) return;

  // check user detail in cookies if it is valid
  const cookieUser = rq.cookies.get(COOKIES_KEYS.CurrentUser);

  // redirect to login page if accessing authorized pages without access token
  if (rq.nextUrl.pathname.startsWith(AUTHORIZED_PREFIX) && !cookieUser) {
    //remove all cookies
    const allCookies = rq.cookies.getAll();
    const response = NextResponse.redirect(
      new URL(QuizAppRoutes.Login, rq.url)
    );
    allCookies.forEach((cookie) => {
      response.cookies.set(cookie.name, "", {
        maxAge: -1, // Expire the cookie immediately
        path: "/", // Ensure it's deleted from all paths
        httpOnly: true, // Explicitly set as HttpOnly
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      });
    });
    return response;
  }
  return NextResponse.next();
}
