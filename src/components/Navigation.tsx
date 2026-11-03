'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Moon, Sun, Menu, X, ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import {
  PROFILE,
  SOCIAL_LINKS,
  localePath,
  type Locale,
  type Dictionary,
} from '@/lib/i18n'

const THEME_EVENT = 'themechange'

function subscribe(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb)
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', cb)
  return () => {
    window.removeEventListener(THEME_EVENT, cb)
    mq.removeEventListener('change', cb)
  }
}

function getSnapshot() {
  const el = document.documentElement
  if (el.classList.contains('dark')) return true
  if (el.classList.contains('light')) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(dark: boolean) {
  const el = document.documentElement
  el.classList.toggle('dark', dark)
  el.classList.toggle('light', !dark)
  document.cookie = `theme=${dark ? 'dark' : 'light'}; path=/; max-age=31536000; samesite=lax`
  window.dispatchEvent(new Event(THEME_EVENT))
}

function ThemeToggle({
  isDark,
  onToggle,
  label,
}: {
  isDark: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg text-fg hover:bg-elevated transition-colors"
      aria-label={label}
      suppressHydrationWarning
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

function LangSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const [wiping, setWiping] = useState(false)

  const target: Locale = lang === 'pt' ? 'en' : 'pt'
  const rest = pathname.replace(/^\/(pt|en)(?=\/|$)/, '')
  const href = `/${target}${rest}`

  const handleClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href)
      return
    }
    setWiping(true)
    window.setTimeout(() => router.push(href), 340)
    window.setTimeout(() => setWiping(false), 780)
  }

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        aria-label={target === 'en' ? 'Switch to English' : 'Mudar para português'}
        className="lang-toggle group inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-primary-500 transition-colors [perspective:220px]"
      >
        <span className="lang-code">{target.toUpperCase()}</span>
        <ArrowRight
          size={12}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </a>

      {wiping &&
        createPortal(
          <div className="lang-wipe" aria-hidden="true">
            <span className="lang-wipe-label">{target.toUpperCase()}</span>
          </div>,
          document.body,
        )}
    </>
  )
}

export default function Navigation({
  lang,
  nav,
  initialDark,
}: {
  lang: Locale
  nav: Dictionary['nav']
  initialDark: boolean
}) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, () => initialDark)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close the menu whenever the route changes (link tap, language switch, back).
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setIsOpen(false)
  }

  // While open: lock page scroll, close on Escape, close if resized to desktop.
  useEffect(() => {
    if (!isOpen) return
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      root.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [isOpen])

  const toggleDarkMode = useCallback(() => {
    applyTheme(!getSnapshot())
  }, [])

  const items = [
    { href: localePath(lang, 'about'), label: nav.about },
    { href: localePath(lang, 'projects'), label: nav.projects },
    { href: localePath(lang, 'experience'), label: nav.experience },
    { href: localePath(lang, 'contact'), label: nav.contact },
  ]

  const linkClass = (href: string) =>
    `nav-link text-sm font-medium transition-colors ${
      pathname === href ? 'text-primary-500' : 'text-fg hover:text-primary-500'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm">
      <div className="container-main py-5 flex justify-between items-center">
        <Link
          href={localePath(lang, 'home')}
          className="font-mono font-bold text-lg hover:text-primary-500 transition-colors"
        >
          {PROFILE.firstName}
          <span className="text-primary-500">.</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-7">
            {items.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkClass(item.href)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <LangSwitcher lang={lang} />
          <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} label={nav.themeToggle} />
        </div>

        <div className="md:hidden flex gap-2 items-center">
          <LangSwitcher lang={lang} />
          <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} label={nav.themeToggle} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-fg hover:bg-elevated transition-colors"
            aria-label={isOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Full-height panel under the bar. Always mounted so it can fade;
          `inert` keeps it out of the tab order and screen readers when closed. */}
      <div
        id="mobile-menu"
        data-open={isOpen || undefined}
        inert={!isOpen}
        className="mobile-menu md:hidden absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-line bg-bg"
      >
        <div className="container-main flex min-h-full flex-col py-8">
          <p
            className="mobile-menu-item mb-4 font-mono text-xs text-muted"
            style={{ '--i': 0 } as React.CSSProperties}
          >
            {'// '}
            {nav.menuTitle}
          </p>

          <ul className="border-t border-line">
            {[{ href: localePath(lang, 'home'), label: nav.home }, ...items].map((item, i) => {
              const active = pathname === item.href
              return (
                <li
                  key={item.href}
                  className="mobile-menu-item border-b border-line"
                  style={{ '--i': i + 1 } as React.CSSProperties}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-baseline gap-4 py-4"
                  >
                    <span
                      className={`w-6 font-mono text-xs ${active ? 'text-primary-500' : 'text-muted'}`}
                    >
                      {String(i).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-3xl font-bold tracking-tight text-fg">
                      {item.label.toLowerCase()}
                      <span
                        aria-hidden="true"
                        className={
                          active
                            ? 'text-primary-500'
                            : 'text-transparent transition-colors group-hover:text-primary-500'
                        }
                      >
                        .
                      </span>
                    </span>
                    <ArrowRight
                      size={18}
                      className="ml-auto self-center text-muted transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div
            className="mobile-menu-item mt-auto pt-10"
            style={{ '--i': items.length + 2 } as React.CSSProperties}
          >
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors break-all"
            >
              <Mail size={16} className="shrink-0" />
              {PROFILE.email}
            </a>
            <div className="mt-4 flex gap-6 text-sm">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted hover:text-primary-500 transition-colors"
              >
                <GithubIcon size={16} /> GitHub <ArrowUpRight size={14} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted hover:text-primary-500 transition-colors"
              >
                <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
