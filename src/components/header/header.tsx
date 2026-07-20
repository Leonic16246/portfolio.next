'use client'

import Link from 'next/link'
import Image from 'next/image'
import { faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import logo from '../../../public/images/CherryTreeGlyph.png'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

type AuthState =
  | { status: 'loading' }
  | { status: 'authenticated'; email: string }
  | { status: 'unauthenticated' }

export default function Header() {
  const [auth, setAuth] = useState<AuthState>({ status: 'loading' })
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Close both menus whenever the route changes
  useEffect(() => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  // Close the user menu when clicking outside of it
  useEffect(() => {
    if (!userMenuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
    const supabase = createBrowserClient(supabaseUrl, supabaseKey)

    const fetchUser = async () => {
      setAuth({ status: 'loading' })
      const { data: { user } } = await supabase.auth.getUser()
      setAuth(user?.email ? { status: 'authenticated', email: user.email } : { status: 'unauthenticated' })
    }

    fetchUser()
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

  const handleLogout = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
    const supabase = createBrowserClient(supabaseUrl, supabaseKey)

    await supabase.auth.signOut()
    setAuth({ status: 'unauthenticated' })
    setMenuOpen(false)
    setUserMenuOpen(false)
    router.push('/')
    router.refresh()
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-neutral backdrop-blur-xs border-b border-white/25
        transition duration-250 ease-in-out
        ${isVisible || menuOpen ? 'translate-y-0' : '-translate-y-full'}`
      }
    >
      <div className="flex items-center justify-between px-[2rem] lg:px-[6rem] py-[0.1rem] fade-in" style={{ animationDelay: '0.1s' }}>

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


          {/* Always rendered to prevent layout shift for user icon */}
          <div ref={userMenuRef} className={`relative ${auth.status !== 'authenticated' ? 'invisible' : ''}`}>
            <button
              onClick={() => setUserMenuOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
              aria-label="Account menu"
              className="hover:text-white transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faUser} size="2xl" />
            </button>

            <div
              className={`absolute right-0 top-full mt-2 w-44 bg-neutral-950 ring-1 ring-white/10 rounded-xl shadow-2xl transition-all duration-200 z-50
                ${userMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <ul className="flex flex-col py-2">
                <li className="px-4 py-2 font-geist-mono text-[10px] tracking-wider uppercase text-white/50 truncate">
                  {auth.status === 'authenticated' ? auth.email : ''}
                </li>
                <li>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-white/75 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white/75 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>

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

              {/* Account*/}
              {auth.status === 'authenticated' && (
                <div className="border-t border-white/25 flex flex-col p-4 gap-4">
                  <span className="font-geist-mono text-sm tracking-wide text-white/80 truncate">
                    {auth.email}
                  </span>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}