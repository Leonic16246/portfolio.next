'use client'

import Link from 'next/link'
import Image from 'next/image'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function Header() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    const supabase = createBrowserClient(supabaseUrl, supabaseKey)

    const fetchUser = async () => {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      setEmail(user?.email || null)
      setLoading(false)
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
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    const supabase = createBrowserClient(supabaseUrl, supabaseKey)

    await supabase.auth.signOut()
    setEmail(null)
    router.push('/')
    router.refresh()
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-neutral-950/80 backdrop-blur-md border-b border-white/20
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="relative flex items-center justify-between px-2 py-2">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/CherryTreeGlyph.png"
              alt="Logo"
              width={50}
              height={50}
              className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
              priority
            />
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-8">
            {[
              { href: '/about', label: 'About' },
              { href: '/projects', label: 'Projects' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`
                  px-4 py-1.5 rounded-lg font-geist-mono text-sm tracking-widest uppercase transition-colors duration-150
                  ${pathname === href
                    ? 'text-white bg-white/10'
                    : 'text-white/90 hover:text-white hover:bg-white/5'}
                `}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4 text-white/80 mr-4">
            <a
              href="https://github.com/Leonic16246"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>

            <a
              href="https://www.linkedin.com/in/leonic-lee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>

            {!loading && email && (
              <div className="relative group">
                <div className="hover:text-white transition-colors cursor-pointer">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </div>

                <div className="absolute right-0 top-full mt-2 w-44 bg-neutral-950 ring-1 ring-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

                  <ul className="flex flex-col py-2 text-sm">
                    <li className="px-4 py-2 font-geist-mono text-[10px] tracking-widest uppercase text-white/50 truncate">
                      {email}
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
            )}
          </div>

        </div>
    </header>
  )
}