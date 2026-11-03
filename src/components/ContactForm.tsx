'use client'

import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { SOCIAL_LINKS, type Dictionary } from '@/lib/i18n'

export default function ContactForm({ t }: { t: Dictionary['contact'] }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const s = encodeURIComponent(
      subject || `${t.mailSubjectFallback} ${name || t.mailSomeone}`,
    )
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`)
    window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${s}&body=${body}`
  }

  const field =
    'w-full rounded border border-line bg-bg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            {t.formName}
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {t.formEmail}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          {t.formSubject}
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {t.formMessage}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={field}
        />
      </div>

      <button type="submit" className="btn">
        <Send size={16} />
        {t.formSend}
      </button>
    </form>
  )
}
