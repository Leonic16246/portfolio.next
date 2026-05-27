import Link from 'next/link';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <footer className="bg-neutral border-t border-white/25 px-[4rem] py-[2rem]">
      <div className="flex justify-between items-start gap-8">

        {/* Left — branding */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white/90 font-bold text-xl tracking-tight">Leon Lee</h3>
          <p className="text-white/80 text-sm">
            Be the change you want to see in the world
          </p>
          <div className="flex items-center gap-4 mt-1 text-white/80">
            <a
              href="https://github.com/Leonic16246"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/leonic-lee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} size="xl" />
            </a>
          </div>
        </div>

        {/* Right — quick links */}
        <div className="flex flex-col gap-2">
          <span className="font-geist-mono text-xs tracking-widest uppercase text-white/80 mb-1">
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
              className="text-white/80 hover:text-white/90 text-md transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-white/[0.07] flex items-center justify-between">
        <p className="font-geist-mono text-xs tracking-widest uppercase text-white/80">
          &copy; {new Date().getFullYear()} COPYRIGHT LOLOLOL
        </p>
        <p className="font-geist-mono text-xs tracking-widest uppercase text-white/80">
          {/* Made in New Zealand */}
        </p>
      </div>

    </footer>
  )
}