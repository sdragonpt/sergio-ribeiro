import type { Dictionary } from '@/lib/i18n'

export default function SkillsGrid({ skills }: { skills: Dictionary['skills'] }) {
  const core = new Set(skills.core)

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {skills.categories.map(cat => (
        <div key={cat.name}>
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
            {cat.name}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {cat.items.map(item => (
              <li
                key={item}
                className={`text-sm font-mono px-2.5 py-1 rounded border ${
                  core.has(item)
                    ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                    : 'border-line text-fg'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
