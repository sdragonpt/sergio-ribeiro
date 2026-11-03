'use client'

import { useEffect, useState, type ReactNode } from 'react'

/**
 * Types `text` out character by character every time it mounts (i.e. each
 * visit to the home page), with a blinking caret. After it finishes,
 * `children` (e.g. the accent ".") pops in.
 *
 * Safety:
 * - Full text is the initial state and always lives in the DOM (sr-only)
 *   for screen readers / no-JS / SEO.
 * - Skipped entirely for reduced motion, and bails to the full text if the
 *   tab is hidden or anything stalls.
 * - StrictMode-safe: each effect run owns its own `cancelled` flag, so the
 *   dev double-invoke never leaves it stuck on an empty caret.
 */
export default function Typewriter({
  text,
  children,
  className,
}: {
  text: string
  children?: ReactNode
  className?: string
}) {
  const [count, setCount] = useState(text.length)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Initial state is already the full, finished text — nothing to do.
    if (reduce || document.visibilityState !== 'visible') return

    let cancelled = false
    let i = 0
    let timer = 0

    const finish = () => {
      if (cancelled) return
      setCount(text.length)
      setTyping(false)
      setDone(true)
    }

    const tick = () => {
      if (cancelled) return
      if (document.hidden) {
        finish()
        return
      }
      i += 1
      setCount(i)
      if (i < text.length) {
        timer = window.setTimeout(tick, 55 + Math.random() * 60)
      } else {
        setTyping(false)
        window.setTimeout(() => {
          if (!cancelled) setDone(true)
        }, 900)
      }
    }

    // Deliberately resetting to the empty state before the animation begins.
    // This only runs client-side after we've decided to animate.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(0)
    setTyping(true)
    setDone(false)

    timer = window.setTimeout(tick, 350)
    const safety = window.setTimeout(finish, 6000)
    const onVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(timer)
        finish()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.clearTimeout(safety)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [text])

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {typing && <span className="tw-caret" />}
      </span>
      {done && children ? <span className="type-tail">{children}</span> : null}
      <span className="sr-only">
        {text}
        {children}
      </span>
    </span>
  )
}
