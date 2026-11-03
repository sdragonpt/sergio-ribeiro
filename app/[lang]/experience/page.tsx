import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Timeline from '@/components/Timeline'
import { getDictionary, isLocale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return { title: dict.meta.pages.experience }
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <div className="section-spacing">
      <div className="container-main">
        <h1 className="mb-4">{dict.experience.title}</h1>
        <p className="text-muted max-w-xl mb-12">{dict.experience.intro}</p>

        <Timeline items={dict.experience.items} />

        <h2 className="section-title mt-16">{dict.experience.educationTitle}</h2>
        <div className="space-y-8">
          {dict.education.map(item => (
            <div key={item.title}>
              <p className="text-xs font-mono text-muted mb-1">{item.period}</p>
              <h3 className="font-mono font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-primary-500 mb-2">{item.place}</p>
              <p className="text-sm text-muted leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
