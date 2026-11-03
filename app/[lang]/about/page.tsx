import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import CodeBackdrop from '@/components/CodeBackdrop'
import SkillsGrid from '@/components/SkillsGrid'
import { getDictionary, isLocale } from '@/lib/i18n'

// Drop the photo at this path; until it exists the slot only shows in dev.
const PORTRAIT_SRC = '/images/sergio.jpg'

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
  const hasPortrait = existsSync(path.join(process.cwd(), 'public', PORTRAIT_SRC))
  const showPortrait = hasPortrait || process.env.NODE_ENV !== 'production'

  return (
    <div className="section-spacing relative overflow-hidden">
      <CodeBackdrop preset="edges" seed={4} count={14} />
      <div className="container-main relative">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_17rem] md:gap-16 md:items-start mb-16">
          <div>
            <h1 className="mb-8">{dict.about.title}</h1>
            <div className="max-w-2xl space-y-4 text-muted leading-relaxed">
              {dict.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {showPortrait && (
            <figure className="order-first md:order-none w-full max-w-60 md:max-w-none">
              <div className="relative aspect-[4/5] bg-surface">
                {hasPortrait ? (
                  <Image
                    src={PORTRAIT_SRC}
                    alt={dict.about.photoAlt}
                    fill
                    preload
                    sizes="(min-width: 768px) 17rem, 15rem"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center border border-dashed border-line p-4 text-center font-mono text-xs text-muted">
                    public{PORTRAIT_SRC}
                  </div>
                )}
              </div>
              <figcaption className="mt-3 font-mono text-xs text-muted">
                {dict.about.photoCaption}
              </figcaption>
            </figure>
          )}
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
