import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import ContactForm from '@/components/ContactForm'
import { PROFILE, SOCIAL_LINKS, getDictionary, isLocale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return { title: dict.meta.pages.contact }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.contact

  return (
    <div className="section-spacing">
      <div className="container-main">
        <h1 className="mb-4">{t.title}</h1>
        <p className="text-muted max-w-xl mb-12">{t.intro}</p>

        <div className="grid md:grid-cols-[1fr_auto] gap-12">
          <ContactForm t={t} />

          <div className="md:border-l md:border-line md:pl-12">
            <h2 className="font-mono font-bold text-sm mb-4 uppercase tracking-widest">
              {t.directTitle}
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="text-muted hover:text-primary-500 transition-colors break-all"
                >
                  {PROFILE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-primary-500 shrink-0" />
                <span className="text-muted">{dict.profile.location}</span>
              </li>
            </ul>

            <div className="flex gap-3 mt-6">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted hover:text-primary-500 hover:bg-elevated transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted hover:text-primary-500 hover:bg-elevated transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
