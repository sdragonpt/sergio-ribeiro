import type { ExperienceEntry } from '@/lib/i18n'

export default function Timeline({ items }: { items: ExperienceEntry[] }) {
  return (
    <ol className="relative border-l border-line ml-2">
      {items.map((item, i) => (
        <li key={`${item.company}-${i}`} className="relative pl-8 pb-10 last:pb-0">
          <span className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full bg-primary-500 ring-4 ring-bg" />

          <p className="text-xs font-mono text-muted mb-1">
            <span className="opacity-50">{'// '}</span>
            {item.period}
          </p>
          <h3 className="font-mono font-bold text-lg">
            {item.role}
            <span className="text-muted font-normal"> · {item.company}</span>
          </h3>
          <p className="text-xs font-mono text-primary-500 mb-2">{item.kind}</p>

          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5 rounded bg-elevated text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ol>
  )
}
