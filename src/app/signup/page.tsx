'use client'

import { signup } from './actions'
import Image from 'next/image'
import { useState, useActionState } from 'react'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showRequirements, setShowRequirements] = useState(false)
  const [state, formAction] = useActionState(signup, null)

  // Password validation checks
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumbers

  return (
    <div className="min-h-screen p-8">
      <div className="bg-neutral-900 rounded-lg px-6 py-8 ring-1 ring-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="flex-1 w-full">
            <h1 className="text-5xl font-bold text-white/90">Welcome</h1>
            <h2 className="mt-3 text-4xl font-semibold text-white/90">Sign up</h2>

            <form action={formAction} className="mt-8 space-y-6">

              {state?.error && (
                <div className="bg-red-900/50 rounded-lg p-4">
                  <p className="text-red-500">{state.error}</p>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setShowRequirements(true)}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-black/80 text-white placeholder-white/50 focus:ring-2 focus:border-transparent transition-colors ${
                      password && !isPasswordValid
                        ? 'border-red-500 focus:ring-red-500'
                        : password && isPasswordValid
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-white/20 focus:ring-blue-500'
                    }`}
                    placeholder="Enter your password"
                  />
                  
                  {/* Password Requirements */}
                  {(showRequirements || password) && (
                    <div className="mt-3 p-3 bg-black/40 rounded-lg border border-white/10">
                      <p className="text-sm font-medium text-white/80 mb-2">
                        Password Requirements:
                      </p>
                      <div className="space-y-1">
                        <div className={`flex items-center text-sm ${hasMinLength ? 'text-green-400' : 'text-white/40'}`}>
                          <span className="mr-2">{hasMinLength ? '✓' : '○'}</span>
                          At least 8 characters
                        </div>
                        <div className={`flex items-center text-sm ${hasUpperCase ? 'text-green-400' : 'text-white/40'}`}>
                          <span className="mr-2">{hasUpperCase ? '✓' : '○'}</span>
                          One uppercase letter
                        </div>
                        <div className={`flex items-center text-sm ${hasLowerCase ? 'text-green-400' : 'text-white/40'}`}>
                          <span className="mr-2">{hasLowerCase ? '✓' : '○'}</span>
                          One lowercase letter
                        </div>
                        <div className={`flex items-center text-sm ${hasNumbers ? 'text-green-400' : 'text-white/40'}`}>
                          <span className="mr-2">{hasNumbers ? '✓' : '○'}</span>
                          One number
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={!isPasswordValid || !password}
                  className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
                    isPasswordValid && password
                      ? 'bg-blue-500 text-white hover:bg-blue-800 cursor-pointer'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  Sign Up
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