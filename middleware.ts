import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  if (lang !== "en" && lang !== "pt") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.searchParams.delete("lang");
  const response = NextResponse.redirect(url);
  response.cookies.set("locale", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    httpOnly: true,
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
