'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '/public/CherryTreeGlyph.png'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {AiOutlineMenu} from 'react-icons/ai'

export default function Navbar() {


  return (
    <nav className="bg-black w-full px-4 py-3 relative border-b-3 border-neutral-200">

      <div className="flex justify-between items-center h-full w-full">

        <div className="flex justify-start w-1/8 list-none text-white">
          <Link href={"/"}>
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

        <div className="flex justify-evenly w-4/8 list-none text-neutral-200">
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

        <div className="flex justify-evenly text-neutral-200 items-center h-full w-1/8">

          {/* <button
            onClick={toggleTheme}
            className="hover:text-white rounded-full"
            aria-label="Toggle dark mode"
          >
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} size="lg" />
          </button> */}
          
          <a
            href="https://github.com/Leonic16246"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white "
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
        </div>

      </div>
    </nav>
  )
}