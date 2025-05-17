// Fixed Navbar with explicit styles
// components/navbar/navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '/public/CherryTreeGlyph.png'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../themeprovider/themeprovider'

export default function Navbar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme() // Use our theme context

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="bg-black text-gray-200 w-full px-4 py-3 relative border-b">
      <div className="flex items-center justify-between">
        {/* Logo & Name with forced color and no link styling */}
        <div className="flex items-center">
          <Link href="/" className="">
            <Image 
              src={logo} 
              alt="Leon logo" 
              width={40} 
              height={40} 
              priority 
            />
          </Link>
          <Link 
            href="/" 
            className="text-2xl font-semibold text-gray-200 hover:text-white transition-colors"
            style={{ 
              textDecoration: 'none'
            }}
          >
            <span>Leon</span>
          </Link>
        </div>

        {/* Nav Links - Always visible with increased spacing */}
        <div className="flex items-center justify-between space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`hover:text-white transition-colors ${
                pathname === link.path ? 'font-bold text-white' : ''
              }`}
              style={{ textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons with more spacing */}
        <div className="">
          <div className=""> {/* Further increased spacing between icons */}
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="hover:text-white rounded-full"
              aria-label="Toggle dark mode"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} size="lg" />
            </button>
            
            <a
              href="https://github.com/Leonic16246"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/leonic-lee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}