export const LOCALES = ['pt', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'pt'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

// ---- Content types --------------------------------------------------------

export type ProjectStatus = 'ongoing' | 'completed'

export interface Project {
  id: string
  title: string
  description: string
  period: string
  status: ProjectStatus
  categories: string[]
  tags: string[]
  featured?: boolean
  links?: { live?: string; github?: string }
}

export interface ExperienceEntry {
  company: string
  role: string
  kind: string
  period: string
  description: string
  tags: string[]
}

export interface EducationEntry {
  title: string
  place: string
  period: string
  description: string
}

export interface Dictionary {
  meta: {
    title: string
    description: string
    pages: { about: string; projects: string; experience: string; contact: string }
  }
  nav: {
    about: string
    projects: string
    experience: string
    contact: string
    themeToggle: string
    openMenu: string
  }
  profile: { role: string; location: string; intro: string }
  hero: { greeting: string; ctaContact: string; ctaWork: string }
  home: {
    featuredTitle: string
    featuredSub: string
    viewAllProjects: string
    experienceTitle: string
    experienceSub: string
    viewFullExperience: string
    ctaTitle: string
    ctaText: string
    ctaButton: string
  }
  about: {
    title: string
    paragraphs: string[]
    photoAlt: string
    photoCaption: string
    skillsTitle: string
    skillsNote: string
    educationTitle: string
    languagesTitle: string
  }
  skills: {
    core: string[]
    categories: { name: string; items: string[] }[]
  }
  languages: { name: string; level: string }[]
  education: EducationEntry[]
  experience: {
    title: string
    intro: string
    educationTitle: string
    items: ExperienceEntry[]
  }
  projectsPage: {
    title: string
    intro: string
    empty: string
    filters: Record<'all' | 'ongoing' | 'completed' | 'Web Dev' | 'Mobile', string>
  }
  projectCard: { ongoing: string; completed: string; view: string; code: string }
  projects: Project[]
  contact: {
    title: string
    intro: string
    formName: string
    formEmail: string
    formSubject: string
    formMessage: string
    formSend: string
    directTitle: string
    mailSubjectFallback: string
    mailSomeone: string
  }
  footer: { navTitle: string; contactTitle: string; rights: string }
}

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  pt: () => import('@/lib/dictionaries/pt'),
  en: () => import('@/lib/dictionaries/en'),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await loaders[locale]()
  return mod.default
}

// ---- Static, locale-independent data -------------------------------------

export const PROFILE = {
  name: 'Sérgio Ribeiro',
  firstName: 'Sérgio',
  email: 'sergionunoribeiro@gmail.com',
  phone: '[removido]',
}

export const SITE_URL = 'https://sergioribeiro.netlify.app'

export const SOCIAL_LINKS = {
  github: 'https://github.com/sdragonpt',
  linkedin: 'https://www.linkedin.com/in/sergionfr/',
  email: PROFILE.email,
}

/** Route slugs are shared across locales: /pt/about, /en/about … */
export const ROUTES = {
  home: '',
  about: 'about',
  projects: 'projects',
  experience: 'experience',
  contact: 'contact',
} as const

export function localePath(locale: Locale, route: keyof typeof ROUTES): string {
  const slug = ROUTES[route]
  return slug ? `/${locale}/${slug}` : `/${locale}`
}
