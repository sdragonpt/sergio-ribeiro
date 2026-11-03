'use client'

import { useCallback, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Moon, Sun, Menu, X, ArrowRight } from 'lucide-react'
import { PROFILE, localePath, type Locale, type Dictionary } from '@/lib/i18n'

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
            aria-label={nav.openMenu}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-line bg-bg">
          <ul className="container-main py-4 flex flex-col gap-4">
            {items.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkClass(item.href)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
