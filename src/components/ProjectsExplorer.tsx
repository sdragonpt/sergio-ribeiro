'use client'

import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import type { Dictionary, Project } from '@/lib/i18n'

type FilterValue = 'all' | 'ongoing' | 'completed' | 'Web Dev' | 'Mobile'

const FILTER_ORDER: FilterValue[] = ['all', 'ongoing', 'completed', 'Web Dev', 'Mobile']

export default function ProjectsExplorer({
  projects,
  page,
  cardLabels,
}: {
  projects: Project[]
  page: Dictionary['projectsPage']
  cardLabels: Dictionary['projectCard']
}) {
  const [filter, setFilter] = useState<FilterValue>('all')

  const visible = projects.filter(p => {
    if (filter === 'all') return true
    if (filter === 'ongoing' || filter === 'completed') return p.status === filter
    return p.categories.includes(filter)
  })

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTER_ORDER.map(value => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`text-sm font-mono px-3 py-1.5 rounded-full border transition-colors ${
              filter === value
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-line text-muted hover:border-primary-500 hover:text-primary-500'
            }`}
          >
            {page.filters[value]}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-muted">{page.empty}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map(project => (
            <ProjectCard key={project.id} project={project} labels={cardLabels} />
          ))}
        </div>
      )}
    </>
  )
}
