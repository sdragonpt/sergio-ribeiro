import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Mail } from 'lucide-react'
import CodeBackdrop from '@/components/CodeBackdrop'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import ProjectCard from '@/components/ProjectCard'
import Timeline from '@/components/Timeline'
import Typewriter from '@/components/Typewriter'
import {
  PROFILE,
  SOCIAL_LINKS,
  getDictionary,
  isLocale,
  localePath,
} from '@/lib/i18n'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const featured = dict.projects.filter(p => p.featured)

  return (
    <>
      {/* Hero */}
      <section className="section-spacing relative overflow-hidden">
        <CodeBackdrop />
        <div className="container-main relative">
          <div className="mb-4">
            <span className="text-sm font-mono text-primary-500 uppercase tracking-widest">
              <span className="text-muted">&gt;</span> {dict.profile.role}
            </span>
          </div>

          <h1 className="mb-6">
            <Typewriter text={`${dict.hero.greeting} ${PROFILE.firstName}`}>
              <span className="text-primary-500">.</span>
            </Typewriter>
          </h1>

          <p className="text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-2xl">
            {dict.profile.intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={localePath(lang, 'contact')} className="btn w-full sm:w-auto">
              {dict.hero.ctaContact}
            </Link>
            <Link href={localePath(lang, 'projects')} className="btn-outline w-full sm:w-auto">
              {dict.hero.ctaWork}
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-line max-w-2xl">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors"
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors"
            >
              <Mail size={16} />
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="section-spacing bg-surface border-y border-line">
        <div className="container-main">
          <h2 className="section-title">{dict.home.featuredTitle}</h2>
          <p className="text-muted max-w-xl mb-12">{dict.home.featuredSub}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featured.map(project => (
              <ProjectCard key={project.id} project={project} labels={dict.projectCard} />
            ))}
          </div>

          <Link
            href={localePath(lang, 'projects')}
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            {dict.home.viewAllProjects}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Recent experience */}
      <section className="section-spacing">
        <div className="container-main">
          <h2 className="section-title">{dict.home.experienceTitle}</h2>
          <p className="text-muted max-w-xl mb-12">{dict.home.experienceSub}</p>

          <Timeline items={dict.experience.items.slice(0, 2)} />

          <Link
            href={localePath(lang, 'experience')}
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors mt-4"
          >
            {dict.home.viewFullExperience}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-surface border-t border-line">
        <div className="container-main">
          <h2 className="section-title">{dict.home.ctaTitle}</h2>
          <p className="text-muted max-w-xl mb-8">{dict.home.ctaText}</p>
          <Link href={localePath(lang, 'contact')} className="btn">
            {dict.home.ctaButton}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
