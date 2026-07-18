'use client'

import { useActionState, useState } from 'react'
import { login } from './actions'
import Image from 'next/image'

export default function LoginPage() {
  const [state, formAction, loading] = useActionState(login, null)
  const [email, setEmail] = useState('')
  const error = state?.error

  return (
    <div className="min-h-screen p-8">
      <div className="bg-neutral-900 rounded-lg px-6 py-8 ring-1 ring-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="flex-1 w-full">
            <h1 className="text-5xl font-bold text-white/90">Welcome</h1>
            <h2 className="mt-3 text-4xl font-semibold text-white/90">Back</h2>

            <form action={formAction} className="mt-8 space-y-6">
              {error && (
                <div className="bg-red-900/50 rounded-lg p-4">
                  <p className="text-red-500">{error}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-lg text-white/80 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-white/20 rounded-lg bg-black/80 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-lg text-white/80 mb-2">
                    Password
                  </label>
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    className="w-full px-4 py-3 border-2 border-white/20 rounded-lg bg-black/80 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>

          <div className="hidden sm:block shrink-0 w-40 md:w-64 lg:w-auto">
            <Image
              src="/images/CherryTreeGlyph.png"
              alt="Logo"
              width={400}
              height={400}
              priority
              className="opacity-80 w-full h-auto"
            />
          </div>

        </div>
      </div>
    </div>
  )
}