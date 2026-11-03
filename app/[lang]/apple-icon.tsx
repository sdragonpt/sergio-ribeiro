import { ImageResponse } from 'next/og'
import { LOCALES } from '@/lib/i18n'

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }))
}

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Matches the "Sérgio." wordmark and the OG image: mono S on near-black,
// with the blue accent dot.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0f0f',
          color: '#ededed',
          fontFamily: 'monospace',
          fontSize: 118,
          fontWeight: 700,
          position: 'relative',
        }}
      >
        S
        <div
          style={{
            position: 'absolute',
            right: 34,
            bottom: 42,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#2f6fed',
          }}
        />
      </div>
    ),
    size,
  )
}
