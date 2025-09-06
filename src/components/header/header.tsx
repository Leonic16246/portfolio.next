'use client'

import Link from 'next/link'
import Image from 'next/image'
import logo from '/public/images/CherryTreeGlyph.png'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase';

export default function Header() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {

  const supabase = createClient();

    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user?.email) {
        setEmail(data.user.email)
      } else {
        setEmail(null)
      }
      setLoading(false)
    }

    // Get initial user
    getUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email) // Debug log
        if (session?.user?.email) {
          setEmail(session.user.email)
        } else {
          setEmail(null)
        }
        setLoading(false)
      }
    )

    // Also listen for page focus to check auth state
    const handleFocus = () => {
      getUser()
    }

    window.addEventListener('focus', handleFocus)

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe()
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true)
      }
      // Show header when scrolling up, hide when scrolling down
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Add throttling to improve performance
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
        bg-black w-full p-3 border-b-3 border-neutral-500 
        fixed top-0 left-0 right-0 z-50
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="flex justify-between items-center h-full w-full">
        <div className="flex justify-start w-1/8">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
              priority
            />
          </Link>
        </div>

        <div className="flex justify-evenly min-w-1/8 w-3/8 list-none text-neutral-200">
          <li className="hover:underline hover:text-white">
            <Link href="/about" className="no-underline text-inherit font-semibold">
              About
            </Link>
          </li>

          <li className="hover:underline hover:text-white">
            <Link href="/projects" className="no-underline text-inherit font-semibold">
              Projects
            </Link>
          </li>

          <li className="hover:underline hover:text-white">
            <Link href="/contact" className="no-underline text-inherit font-semibold">
              Contact
            </Link>
          </li>
        </div>

        <div className="flex justify-evenly text-neutral-200 items-center h-full w-1/8 space-x-3">
          <a
            href="https://github.com/Leonic16246"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>

          <a
            href="https://www.linkedin.com/in/leonic-lee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </a>

          {!loading && email && (
            <div className="relative group">
              <div className="hover:text-white focus:outline-none cursor-pointer">
                <FontAwesomeIcon icon={faUser} size="xl" />
              </div>

              <div className="absolute right-0 top-full mt-1 w-40 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="flex flex-col text-sm text-white py-2">
                  <li className="px-4 py-2 text-neutral-300 text-xs truncate">
                    {email}
                  </li>
                  <li>
                    <Link
                      href="/account"
                      className="block px-4 py-2 hover:bg-neutral-800"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={async () => {
                        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
                        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
                        const supabase = createClient();
                        await supabase.auth.signOut();
                        // The auth state listener will handle updating the UI
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-neutral-800"
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