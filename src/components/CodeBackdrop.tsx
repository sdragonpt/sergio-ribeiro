import type { CSSProperties } from 'react'

// Decorative code glyphs behind a section: some float, some glitch now and
// then, and code lines drift across. Pure CSS (see globals.css). Everything is
// derived from fixed data or a seed, so server and client render the same markup.
//
// Presets:
// - hero:   dense cluster on the right of the home hero
// - header: smaller cluster beside an inner page's title (top of the section)
// - edges:  scattered down the side gutters of a long section (xl screens only)
// - cta:    a few glyphs beside a call-to-action block
// - line:   just one drifting code line (e.g. the footer)

type Token = {
  text: string
  x: number // % from left
  y: number // % from top
  size: string
  kind: 'float' | 'glitch'
  dur: number // seconds
  delay: number // seconds, negative to start mid-cycle
  accent?: boolean
  from?: 'all' | 'lg' | 'xl' // smallest screen it shows on
}

type Line = { text: string; y: number; dur: number; reverse?: boolean }

const HERO: Token[] = [
  { text: '</>', x: 82, y: 12, size: '2.75rem', kind: 'float', dur: 9, delay: 0, accent: true, from: 'all' },
  { text: '{ }', x: 88, y: 54, size: '3.25rem', kind: 'float', dur: 11, delay: -3, from: 'lg' },
  { text: '=>', x: 78, y: 76, size: '1.75rem', kind: 'float', dur: 8, delay: -6, from: 'lg' },
  { text: '//', x: 94, y: 22, size: '1.5rem', kind: 'float', dur: 10, delay: -2, from: 'all' },
  { text: '[ ]', x: 77, y: 46, size: '1.25rem', kind: 'float', dur: 12, delay: -5, from: 'lg' },
  { text: ';', x: 95, y: 64, size: '2rem', kind: 'float', dur: 7, delay: -1, from: 'lg' },
  { text: '01', x: 87, y: 86, size: '1rem', kind: 'float', dur: 9, delay: -4, from: 'all' },
  { text: '<dev />', x: 85, y: 38, size: '1.5rem', kind: 'glitch', dur: 5, delay: -1.5, accent: true, from: 'lg' },
  { text: 'git push', x: 84, y: 71, size: '0.85rem', kind: 'glitch', dur: 7, delay: -4, from: 'lg' },
  { text: '200 OK', x: 92, y: 79, size: '0.85rem', kind: 'glitch', dur: 6, delay: -2.5, from: 'lg' },
]

const HERO_LINES: Line[] = [
  { text: 'const dev = { name: "Sérgio", stack: ["React", "Vue", "PHP", "Firebase"] }', y: 6, dur: 70 },
  { text: 'export default function Portfolio() { return <Work quality="high" /> }', y: 95, dur: 85, reverse: true },
]

const HEADER: Token[] = [
  { text: '{ }', x: 84, y: 30, size: '2.5rem', kind: 'float', dur: 10, delay: -2, from: 'lg' },
  { text: '</>', x: 74, y: 58, size: '1.75rem', kind: 'float', dur: 8, delay: -5, accent: true, from: 'lg' },
  { text: '//', x: 93, y: 62, size: '1.25rem', kind: 'float', dur: 9, delay: -1, from: 'lg' },
  { text: 'npm run dev', x: 84, y: 82, size: '0.8rem', kind: 'glitch', dur: 6, delay: -3, from: 'xl' },
]

const CTA: Token[] = [
  { text: '@', x: 86, y: 22, size: '3rem', kind: 'float', dur: 10, delay: -2, accent: true, from: 'lg' },
  { text: '<hello />', x: 74, y: 52, size: '1.4rem', kind: 'glitch', dur: 5, delay: -1, accent: true, from: 'lg' },
  { text: '=>', x: 92, y: 66, size: '1.75rem', kind: 'float', dur: 8, delay: -4, from: 'lg' },
  { text: '$ send --to sergio', x: 70, y: 84, size: '0.8rem', kind: 'glitch', dur: 7, delay: -3, from: 'lg' },
]

const EDGE_GLYPHS = ['{ }', '</>', '=>', '//', '[ ]', ';', '()', '&&', '!=', '01', '#', '::']
const EDGE_GLITCH = ['null', 'true', '404', 'npm i', 'git log', 'return', '0xFF', 'await', 'async']
const DRIFT_LINES = [
  'if (idea) { build(idea).then(ship) }',
  'git commit -m "feat: café → código"',
  'while (learning) { curiosity++ }',
  'SELECT * FROM projects WHERE passion = true;',
  'const stack = ["Next.js", "Tailwind", "TypeScript"]',
  'npm run build && npm run deploy',
]

// Small deterministic PRNG so each seed gives a different but stable layout.
function rng(seed: number) {
  let s = (seed * 9301 + 49297) % 233280
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function edges(seed: number, count: number): { tokens: Token[]; lines: Line[] } {
  const r = rng(seed + 1)
  const tokens: Token[] = []
  for (let i = 0; i < count; i++) {
    const left = i % 2 === 0
    const glitch = i % 4 === 3
    const pool = glitch ? EDGE_GLITCH : EDGE_GLYPHS
    tokens.push({
      text: pool[Math.floor(r() * pool.length)],
      // Gutters only: the content column is max-w-4xl, so keep within ~11% of each edge.
      x: left ? 2 + r() * 7 : 90 + r() * 6,
      y: ((i + 0.5) / count) * 100 + (r() - 0.5) * (60 / count),
      size: glitch ? '0.85rem' : `${1 + r() * 1.5}rem`,
      kind: glitch ? 'glitch' : 'float',
      dur: 7 + Math.round(r() * 6),
      delay: -Math.round(r() * 8 * 10) / 10,
      accent: i % 5 === 1,
      from: 'xl',
    })
  }
  const lines: Line[] = [
    {
      text: DRIFT_LINES[seed % DRIFT_LINES.length],
      y: 20 + Math.round(r() * 60),
      dur: 80 + Math.round(r() * 30),
      reverse: seed % 2 === 1,
    },
  ]
  return { tokens, lines }
}

function presetData(
  preset: Props['preset'],
  seed: number,
  count: number,
): { tokens: Token[]; lines: Line[] } {
  switch (preset) {
    case 'hero':
      return { tokens: HERO, lines: HERO_LINES }
    case 'header':
      return { tokens: HEADER, lines: [] }
    case 'cta':
      return {
        tokens: CTA,
        lines: [{ text: DRIFT_LINES[seed % DRIFT_LINES.length], y: 90, dur: 75 }],
      }
    case 'line':
      return {
        tokens: [],
        lines: [{ text: DRIFT_LINES[seed % DRIFT_LINES.length], y: 12, dur: 90, reverse: true }],
      }
    case 'edges':
      return edges(seed, count)
  }
}

type Props = {
  preset: 'hero' | 'header' | 'edges' | 'cta' | 'line'
  /** Varies glyphs and positions for `edges`, and which code line drifts. */
  seed?: number
  /** Number of glyphs for `edges` (spread over the section's height). */
  count?: number
  /** Limit the layer to the top of the section (e.g. '22rem' for `header`). */
  height?: string
}

const VISIBILITY = { all: '', lg: 'hidden lg:block', xl: 'hidden xl:block' }

export default function CodeBackdrop({ preset, seed = 0, count = 10, height }: Props) {
  const { tokens, lines } = presetData(preset, seed, count)

  return (
    <div
      className="code-backdrop"
      aria-hidden="true"
      style={height ? { bottom: 'auto', height } : undefined}
    >
      {lines.map(line => (
        <span
          key={line.text}
          className={`code-drift${line.reverse ? ' code-drift-reverse' : ''}`}
          style={{ '--y': `${line.y}%`, '--dur': `${line.dur}s` } as CSSProperties}
        >
          {line.text}
        </span>
      ))}

      {tokens.map((t, i) => (
        <span
          key={`${t.text}-${i}`}
          data-text={t.text}
          className={[
            'code-token',
            t.kind === 'float' ? 'code-float' : 'code-glitch',
            t.accent ? 'code-accent' : '',
            VISIBILITY[t.from ?? 'all'],
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
