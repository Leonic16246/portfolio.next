'use client'

import Link from 'next/link';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-white/10 py-6 md:py-8">
      <div className="content-width">
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-8">

          {/* Left — branding */}
          <div className="flex flex-col gap-4">
            <h2 className="text-white/90 font-semibold text-2xl">Leon Lee</h2>
            <p className="text-white/80 text-lg font-semibold">
              Portfolio Website
            </p>
            <div className="flex items-center gap-4 mt-1 text-white/80">
              <a
                href="https://github.com/Leonic16246"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} size="2xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/leonic-lee"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2xl" />
              </a>
            </div>
          </div>

          {/* Right — quick links */}
          <div className="flex flex-col">
            <span className="font-bold text-lg uppercase text-white/80 mb-2">
              Links
            </span>
            {[
              { href: '/about', label: 'About' },
              { href: '/projects', label: 'Projects' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white/80 hover:text-white/90 text-lg transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 md:mt-8 md:pt-8 border-t-2 border-white/10 flex flex-wrap items-center justify-between gap-4 font-semibold uppercase text-white/80">
          <p>
            &copy; {new Date().getFullYear()} COPYRIGHT LOLOLOL
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors cursor-pointer"
          >
            ↑ Top
          </button>
        </div>

      </div>
    </footer>
  )
}
