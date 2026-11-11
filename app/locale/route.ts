import { NextResponse } from "next/server";

function safePath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/";
  return value;
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  const response = NextResponse.redirect(new URL(safePath(url.searchParams.get("next")), url.origin));

  if (lang === "en" || lang === "pt") {
    response.cookies.set("locale", lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: url.protocol === "https:",
      httpOnly: true,
    });
  }

  return response;
}
