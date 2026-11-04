import { NextResponse, type NextRequest } from 'next/server'

// Keep this file self-contained — it runs before rendering and should stay light.
const LOCALES = ['pt', 'en'] as const
const DEFAULT_LOCALE = 'pt'

function pickLocale(request: NextRequest): string {
  // An explicit choice from the language switcher wins over the browser language.
  const chosen = request.cookies.get('lang')?.value
  if (chosen && (LOCALES as readonly string[]).includes(chosen)) return chosen

  const header = request.headers.get('accept-language')
  if (header) {
    const wanted = header
      .split(',')
      .map(part => part.split(';')[0].trim().slice(0, 2).toLowerCase())
    const match = wanted.find(code => (LOCALES as readonly string[]).includes(code))
    if (match) return match
  }
  return DEFAULT_LOCALE
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const current = LOCALES.find(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (current) {
    // not-found.tsx gets no params, so hand it the locale and path this way.
    const headers = new Headers(request.headers)
    headers.set('x-locale', current)
    headers.set('x-pathname', pathname)
    return NextResponse.next({ request: { headers } })
  }

  const locale = pickLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Everything except Next internals, metadata files, and paths with a file extension.
  matcher: ['/((?!_next/|favicon.ico|.*\\.).*)'],
}
