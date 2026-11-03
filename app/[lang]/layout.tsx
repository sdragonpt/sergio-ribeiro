import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import '../globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { LOCALES, SITE_URL, PROFILE, getDictionary, isLocale } from '@/lib/i18n'

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = await getDictionary(lang)

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: `%s · ${PROFILE.name}`,
    },
    description: dict.meta.description,
    authors: [{ name: PROFILE.name }],
    creator: PROFILE.name,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(LOCALES.map(l => [l, `/${l}`])),
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pt' ? 'pt_PT' : 'en_GB',
      url: `${SITE_URL}/${lang}`,
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: PROFILE.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  // Theme is resolved server-side from a cookie the toggle sets, so there is
  // no inline script and no flash. When there is no cookie ("system"), the
  // class stays empty and CSS falls back to prefers-color-scheme.
  const theme = (await cookies()).get('theme')?.value
  const themeClass = theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : ''

  return (
    <html lang={lang} className={themeClass} suppressHydrationWarning>
      {/* suppressHydrationWarning on <body>: browser extensions (Bitdefender,
          Grammarly, …) inject attributes here before React hydrates. */}
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <Navigation
          lang={lang}
          nav={dict.nav}
          initialDark={theme === 'dark'}
        />
        <main className="grow">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  )
}
