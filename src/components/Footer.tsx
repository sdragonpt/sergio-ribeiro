import Link from 'next/link'
import { FileText, Mail } from 'lucide-react'
import CodeBackdrop from '@/components/CodeBackdrop'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import {
  PROFILE,
  SOCIAL_LINKS,
  localePath,
  type Locale,
  type Dictionary,
} from '@/lib/i18n'

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale
  dict: Dictionary
}) {
  const year = new Date().getFullYear()

  const nav = [
    { href: localePath(lang, 'about'), label: dict.nav.about },
    { href: localePath(lang, 'projects'), label: dict.nav.projects },
    { href: localePath(lang, 'experience'), label: dict.nav.experience },
    { href: localePath(lang, 'contact'), label: dict.nav.contact },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <CodeBackdrop preset="line" seed={4} />
      <div className="container-main relative py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-mono font-bold text-lg mb-2">{PROFILE.name}</h3>
            <p className="text-sm text-muted">
              {dict.profile.role} · {dict.profile.location}
            </p>
          </div>

          <div>
            <h4 className="font-mono font-bold text-sm mb-4 uppercase tracking-widest">
              {dict.footer.navTitle}
            </h4>
            <ul className="space-y-2">
              {nav.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-primary-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-bold text-sm mb-4 uppercase tracking-widest">
              {dict.footer.contactTitle}
            </h4>
            <div className="flex gap-3">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="p-2 rounded-lg text-muted hover:text-primary-500 hover:bg-elevated transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
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
              <a
                href={SOCIAL_LINKS.cv}
                target="_blank"
                rel="noopener"
                className="p-2 rounded-lg text-muted hover:text-primary-500 hover:bg-elevated transition-colors"
                aria-label={dict.nav.cv}
                title={dict.nav.cv}
              >
                <FileText size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-8">
          <p className="text-xs text-muted">
            © {year} {PROFILE.name}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
