import { ImageResponse } from 'next/og'
import { LOCALES } from '@/lib/i18n'

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }))
}

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Same drawing as app/icon.svg (Space Mono Bold "S" as an outline + blue dot),
// but square: iOS applies its own rounded mask.
const S_PATH =
  'M316 -14Q224 -14 161.5 19.5Q99 53 67.5 111.0Q36 169 36 242V272H168V248Q168 185 205.0 147.5Q242 110 318 110Q378 110 407.0 136.0Q436 162 436 198Q436 221 425.0 240.5Q414 260 385.0 274.5Q356 289 302 298Q232 310 177.5 333.0Q123 356 91.5 397.5Q60 439 60 508V514Q60 571 90.0 616.5Q120 662 174.5 688.0Q229 714 302 714Q385 714 442.0 684.0Q499 654 528.5 604.5Q558 555 558 498V462H426V486Q426 528 393.5 559.0Q361 590 302 590Q253 590 223.5 569.5Q194 549 194 514Q194 478 225.5 456.0Q257 434 344 418Q454 399 512.0 351.5Q570 304 570 212V200Q570 103 502.0 44.5Q434 -14 316 -14Z'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#0f0f0f" />
        <path transform="translate(7.44 23.5) scale(0.02 -0.02)" fill="#ededed" d={S_PATH} />
        <circle cx="23.5" cy="21" r="2.6" fill="#2f6fed" />
      </svg>
    ),
    size,
  )
}
