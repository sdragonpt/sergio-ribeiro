import Link from 'next/link'
import { headers } from 'next/headers'
import CodeBackdrop from '@/components/CodeBackdrop'
import { DEFAULT_LOCALE, PROFILE, getDictionary, isLocale, localePath } from '@/lib/i18n'

// not-found receives no params; proxy.ts forwards the locale and path as headers.
export default async function NotFound() {
  const h = await headers()
  const header = h.get('x-locale') ?? ''
  const lang = isLocale(header) ? header : DEFAULT_LOCALE
  const pathname = h.get('x-pathname')
  const t = (await getDictionary(lang)).notFound

  return (
    <section className="section-spacing relative overflow-hidden">
      <title>{`${t.title} · ${PROFILE.name}`}</title>
      <CodeBackdrop />
      <div className="container-main relative">
        <div className="mb-4">
          <span className="text-sm font-mono text-primary-500 uppercase tracking-widest">
            <span className="text-muted">&gt;</span> {t.eyebrow}
          </span>
        </div>

        <h1 className="mb-6">
          {t.heading}
          <span className="text-primary-500">.</span>
        </h1>

        {pathname && (
          <p className="font-mono text-sm text-muted mb-4 break-all">
            {'// '}
            <span className="text-fg">{pathname}</span> {t.pathNote}
          </p>
        )}

        <p className="text-lg text-muted leading-relaxed mb-8 max-w-2xl">{t.text}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={localePath(lang, 'home')} className="btn w-full sm:w-auto">
            {t.ctaHome}
          </Link>
          <Link href={localePath(lang, 'projects')} className="btn-outline w-full sm:w-auto">
            {t.ctaProjects}
          </Link>
        </div>
      </div>
    </section>
  )
}
