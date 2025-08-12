'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '/public/images/CherryTreeGlyph.png'

export default function ConfirmEmail() {

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg px-6 py-8 ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 shadow-xl">
        <div className='flex justify-between items-center'>
          
          <div className="flex-1">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent pb-2">Confirm Email</h1>
            <h2 className="mt-3 text-4xl font-semibold dark:text-neutral-300 bg-clip-text text-transparent">We've sent you an email confirmation</h2>

            <div className="mt-8 flex gap-4">
              <Link 
                href="/login"
                className="bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 font-semibold py-3 px-6 rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 transition-all duration-200 inline-block text-center"
              >
                Login
              </Link>

              <Link 
                href="/"
                className="bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 font-semibold py-3 px-6 rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 transition-all duration-200 inline-block text-center"
              >
                Go Home
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 ml-8">
            <Image
              src={logo}
              alt="Logo"
              width={400}
              height={400}
              priority
              className=""
            />
          </div>

        </div>
      </div>
    </div>
  )
}