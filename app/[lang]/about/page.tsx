import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SkillsGrid from '@/components/SkillsGrid'
import { getDictionary, isLocale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return { title: dict.meta.pages.about }
}

export default async function AboutPage({
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
        <h1 className="mb-8">{dict.about.title}</h1>

        <div className="max-w-2xl space-y-4 text-muted leading-relaxed mb-16">
          {dict.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="section-title">{dict.about.skillsTitle}</h2>
        <p className="text-muted max-w-xl mb-8">{dict.about.skillsNote}</p>
        <div className="mb-16">
          <SkillsGrid skills={dict.skills} />
        </div>

        <h2 className="section-title">{dict.about.educationTitle}</h2>
        <div className="space-y-8 mb-16">
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

        <h2 className="section-title">{dict.about.languagesTitle}</h2>
        <ul className="flex flex-wrap gap-x-10 gap-y-3">
          {dict.languages.map(l => (
            <li key={l.name} className="text-sm">
              <span className="font-mono">{l.name}</span>
              <span className="text-muted"> — {l.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
