'use client'

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const contacts = [
  {
    href: 'mailto:leonic16246@gmail.com',
    icon: faEnvelope,
    label: 'Email',
    value: 'leonic16246@gmail.com',
    external: false,
  },
  {
    href: 'https://github.com/Leonic16246',
    icon: faGithub,
    label: 'GitHub',
    value: 'github.com/Leonic16246',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/leonic-lee',
    icon: faLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/leonic-lee',
    external: true,
  },
]

export default function Contact() {
  return (
    <div className="min-h-screen bg-black p-6 space-y-6">

      {/* Header */}
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />

        <h1 className="text-7xl tracking-tight text-white/90 leading-none">Get in</h1>
        <h2 className="mt-1 text-7xl tracking-tight text-white/90 leading-none">Touch.</h2>
        <p className="mt-5 font-geist-mono text-sm tracking-[0.2em] uppercase text-white/50">
          Feel free to reach out through any of the following
        </p>
      </div>

      {/* Contact cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map(({ href, icon, label, value, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            className="relative bg-neutral-950 rounded-2xl px-8 py-10 ring-1 ring-white/10 shadow-2xl overflow-hidden flex flex-col gap-5 hover:ring-white/20 hover:bg-white/[0.02] transition-all duration-200 group"
          >
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20" />

            <FontAwesomeIcon
              icon={icon}
              className="text-white/80 group-hover:text-white/90 transition-colors duration-200 text-3xl w-8 h-8"
            />

            <div className="flex flex-col gap-1">
              <span className="font-geist-mono text-[10px] tracking-widest uppercase text-white/50">{label}</span>
              <span className="text-white/80 text-sm group-hover:text-white/90 transition-colors duration-200 truncate">
                {value}
              </span>
            </div>
          </a>
        ))}
      </div>

    </div>
  )
}