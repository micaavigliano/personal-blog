import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "es", "it"]
const defaultLocale = "en"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\..*|robots.txt|sitemap.xml|manifest.json).*)",
  ],
}
