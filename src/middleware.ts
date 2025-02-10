import { NextResponse, type NextRequest } from "next/server";
import { COOKIES_KEYS } from "./utils/cookies";
import QuizAppRoutes from "./RoutePaths";

export function middleware(rq: NextRequest) {
  // check user detail in cookies if it is valid
  const cookieUser = rq.cookies.get(COOKIES_KEYS.CurrentUser);
  // redirect to login page if accessing authorized pages without access token

  if (
    (rq.nextUrl.pathname === QuizAppRoutes.Login ||
      rq.nextUrl.pathname === QuizAppRoutes.Register) &&
    cookieUser
  )
    return NextResponse.redirect(new URL(QuizAppRoutes.Home, rq.url));

  return NextResponse.next();
}
