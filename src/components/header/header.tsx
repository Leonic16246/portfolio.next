'use client'

import Link from 'next/link'
import Image from 'next/image'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import logo from '../../../public/images/CherryTreeGlyph.png'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    let timeoutId: NodeJS.Timeout | null = null
    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 10)
    }

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [lastScrollY])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-neutral backdrop-blur-xs border-b border-white/25
        transition duration-250 ease-in-out
        ${isVisible || menuOpen ? 'translate-y-0' : '-translate-y-full'}`
      }
    >
      <div className="flex items-center justify-between px-[2rem] lg:px-[6rem] py-[0.1rem]">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={logo}
            alt="Logo"
            width={56}
            height={56}
            className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
            priority
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-16">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                px-4 py-2 rounded-xl text-white/90 tracking-wider uppercase transition-colors duration-200
                ${pathname === href
                  ? ' bg-white/10'
                  : 'hover:text-white hover:bg-white/5'}
              `}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social icons */}
        <div className="hidden md:flex items-center gap-8 text-white/80">

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

        {/* Burger button for mobile*/}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden flex items-center text-white/80 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="xl" />
        </button>

      </div>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="drop-down md:hidden border-t border-white/25 bg-black/50">
          <div className="overflow-hidden">
            <div className="px-[2rem] flex flex-col">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`
                   p-4 my-2 block rounded-xl tracking-wider uppercase transition-colors duration-150
                    ${pathname === href
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {label}
                </Link>
              ))}

              {/* Social links */}
              <div className="border-t border-white/25 flex items-center p-4 gap-4 text-white/80">
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
          </div>
        </div>
      )}
    </header>
  )
}
