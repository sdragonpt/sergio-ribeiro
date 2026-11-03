import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import type { Dictionary, Project } from '@/lib/i18n'

export default function ProjectCard({
  project,
  labels,
}: {
  project: Project
  labels: Dictionary['projectCard']
}) {
  const { title, description, period, status, tags, links } = project
  const href = links?.live

  return (
    <article
      className={`group relative flex flex-col h-full rounded-lg border border-line bg-surface p-6 transition-colors ${
        href ? 'hover:border-primary-500' : ''
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
        <span
          className={`text-xs font-mono whitespace-nowrap px-2 py-0.5 rounded-full border ${
            status === 'ongoing'
              ? 'border-primary-500 text-primary-500'
              : 'border-line text-muted'
          }`}
        >
          {status === 'ongoing' ? labels.ongoing : labels.completed}
        </span>
        <span className="text-xs font-mono text-muted">
          <span className="opacity-50">{'// '}</span>
          {period}
        </span>
      </div>

      <h3 className="font-mono font-bold text-lg mb-2 flex items-start gap-1.5">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels.view}: ${title}`}
            className="after:absolute after:inset-0 hover:text-primary-500 transition-colors"
          >
            {title}
          </a>
        ) : (
          title
        )}
        {href && (
          <ArrowUpRight
            size={16}
            className="mt-1 shrink-0 text-muted transition-colors group-hover:text-primary-500"
            aria-hidden
          />
        )}
      </h3>

      <p className="text-sm text-muted leading-relaxed grow">{description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map(tag => (
          <span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded bg-elevated text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {links?.github && (
        <div className="mt-4 pt-4 border-t border-line">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 text-sm text-primary-500 hover:text-primary-600 inline-flex items-center gap-1 transition-colors"
          >
            <GithubIcon size={14} />
            {labels.code}
          </a>
        </div>
      )}
    </article>
  )
}
