import type { CSSProperties } from 'react'

// Decorative code glyphs behind a hero: some float, some glitch now and then,
// and a couple of code lines drift across. Pure CSS (see globals.css), fixed
// positions so server and client render the same markup.

type Token = {
  text: string
  x: number // % from left
  y: number // % from top
  size: string
  kind: 'float' | 'glitch'
  dur: number // seconds
  delay: number // seconds, negative to start mid-cycle
  accent?: boolean
  mobile?: boolean // also show on small screens (kept to the edges)
}

const TOKENS: Token[] = [
  { text: '</>', x: 82, y: 12, size: '2.75rem', kind: 'float', dur: 9, delay: 0, accent: true, mobile: true },
  { text: '{ }', x: 88, y: 54, size: '3.25rem', kind: 'float', dur: 11, delay: -3 },
  { text: '=>', x: 78, y: 76, size: '1.75rem', kind: 'float', dur: 8, delay: -6 },
  { text: '//', x: 94, y: 22, size: '1.5rem', kind: 'float', dur: 10, delay: -2, mobile: true },
  { text: '[ ]', x: 77, y: 46, size: '1.25rem', kind: 'float', dur: 12, delay: -5 },
  { text: ';', x: 95, y: 64, size: '2rem', kind: 'float', dur: 7, delay: -1 },
  { text: '01', x: 87, y: 86, size: '1rem', kind: 'float', dur: 9, delay: -4, mobile: true },
  { text: '<dev />', x: 85, y: 38, size: '1.5rem', kind: 'glitch', dur: 5, delay: -1.5, accent: true },
  { text: 'git push', x: 84, y: 71, size: '0.85rem', kind: 'glitch', dur: 7, delay: -4 },
  { text: '200 OK', x: 92, y: 79, size: '0.85rem', kind: 'glitch', dur: 6, delay: -2.5 },
]

const LINES = [
  { text: 'const dev = { name: "Sérgio", stack: ["React", "Vue", "PHP", "Firebase"] }', y: 6, dur: 70, reverse: false },
  { text: 'export default function Portfolio() { return <Work quality="high" /> }', y: 95, dur: 85, reverse: true },
]

export default function CodeBackdrop() {
  return (
    <div className="code-backdrop" aria-hidden="true">
      {LINES.map(line => (
        <span
          key={line.text}
          className={`code-drift${line.reverse ? ' code-drift-reverse' : ''}`}
          style={{ '--y': `${line.y}%`, '--dur': `${line.dur}s` } as CSSProperties}
        >
          {line.text}
        </span>
      ))}

      {TOKENS.map(t => (
        <span
          key={t.text}
          data-text={t.text}
          className={[
            'code-token',
            t.kind === 'float' ? 'code-float' : 'code-glitch',
            t.accent ? 'code-accent' : '',
            t.mobile ? '' : 'hidden lg:block',
          ].join(' ')}
          style={
            {
              '--x': `${t.x}%`,
              '--y': `${t.y}%`,
              '--s': t.size,
              '--dur': `${t.dur}s`,
              '--delay': `${t.delay}s`,
            } as CSSProperties
          }
        >
          {t.text}
        </span>
      ))}
    </div>
  )
}
