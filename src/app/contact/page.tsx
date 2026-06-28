'use client'

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import contacts from '../../../public/data/contact.json'

const iconMap: Record<string, IconDefinition> = {
  faEnvelope,
  faGithub,
  faLinkedin,
}

export default function Contact() {
  return (
    <div className="min-h-screen p-8">

      <div className="flex flex-col items-center gap-8 mx-auto">

        {/* Header card */}
        <div
          className="fade-in relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

          <p className="text-7xl tracking-tight text-white/80">Get in</p>
          <h1 className="text-7xl tracking-tight text-white/90">Touch.</h1>
          <p className="mt-4 text-xl text-white/70">
            Feel free to reach out through any of the following:
          </p>
        </div>

        {/* Contact cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map(({ href, icon, label, value, external }, i) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={label}
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
              className="fade-in relative rounded-lg border border-white/10 bg-neutral-950 px-8 py-10 overflow-hidden flex flex-col gap-5 transition hover:border-white/20 duration-200 group"
            >
              <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
              <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
              <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
              <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

              <FontAwesomeIcon
                icon={iconMap[icon]}
                className="text-white/80 group-hover:text-white/90 transition-colors duration-200 text-4xl w-8 h-8"
              />

              <div className="flex flex-col">
                <span className="font-geist-mono text-xl tracking-wide uppercase text-white/60">{label}</span>
                <span className="text-white/80 text-lg group-hover:text-white/90 transition-colors duration-200 truncate">
                  {value}
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}