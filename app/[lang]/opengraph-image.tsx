import { ImageResponse } from 'next/og'
import { PROFILE, getDictionary, isLocale, LOCALES } from '@/lib/i18n'

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }))
}

export const alt = `${PROFILE.name} — Portfolio`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = isLocale(lang) ? await getDictionary(lang) : await getDictionary('pt')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0f0f0f',
          color: '#ededed',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: '#4f83f1',
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          {dict.profile.role}
        </div>
        <div style={{ fontSize: 116, fontWeight: 700, marginTop: 24 }}>{PROFILE.name}</div>
        <div style={{ fontSize: 30, color: '#9a9a9a', marginTop: 20 }}>
          {dict.profile.location}
        </div>
      </div>
    ),
    size,
  )
}
