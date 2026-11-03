# Sérgio Ribeiro — portfolio

Personal portfolio in Portuguese and English, built with Next.js 16, React 19 and Tailwind CSS 4.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Visiting `/` redirects to `/pt` or `/en` based on the browser language.

## Where things live

- `src/lib/dictionaries/pt.ts` and `en.ts`: all site text, projects, experience and education. Keep both in sync.
- `src/lib/i18n.ts`: types, locales, profile and social links.
- `app/[lang]/`: the pages (home, about, experience, projects, contact) and the 404 page.
- `proxy.ts`: locale redirect, and the headers the 404 page uses.
- `public/images/sergio.jpg`: the portrait on the About page.

## Build

```bash
npm run build
npm start
```
