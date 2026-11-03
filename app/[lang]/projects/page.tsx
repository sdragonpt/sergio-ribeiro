import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectsExplorer from '@/components/ProjectsExplorer'
import { getDictionary, isLocale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return { title: dict.meta.pages.projects }
}

export default async function ProjectsPage({
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
        <h1 className="mb-4">{dict.projectsPage.title}</h1>
        <p className="text-muted max-w-xl mb-10">{dict.projectsPage.intro}</p>

        <ProjectsExplorer
          projects={dict.projects}
          page={dict.projectsPage}
          cardLabels={dict.projectCard}
        />
      </div>
    </div>
  )
}
