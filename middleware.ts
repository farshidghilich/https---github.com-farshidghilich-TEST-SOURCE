import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let defaultLocale = "fa";
let locales = ["fa"];

// Get the preferred locale, similar to above or using a library
function getLocale(request: Request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export function middleware(request: any) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  const token = request.cookies.get("token");
  console.log(request);
  console.log(token);

  const locale = getLocale(request);
  console.log(locale);
  if (!token && !pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  NextResponse.redirect(new URL(`/`, request.url));
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    //"/((?!api|assets|.*\\..*|_next).*)",
    "/((?!api|assets|docs|.*\\..*|_next).*)",
    // Optional: only run on root (/) UR
  ],
};
