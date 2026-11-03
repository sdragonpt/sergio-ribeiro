import { notFound } from 'next/navigation'

// Any path under /pt or /en that no page matches lands here, so the 404
// renders inside the [lang] layout (nav, footer, theme) via not-found.tsx.
export default function CatchAll() {
  notFound()
}
