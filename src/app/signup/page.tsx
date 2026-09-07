'use client'

import { signup } from './actions'
import Link from 'next/link'
import { useState, useActionState } from 'react'

export const dynamic = 'force-dynamic'

export default function SignupPage() {
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

  const requirements = [
    { met: hasMinLength, label: 'At least 8 characters' },
    { met: hasUpperCase, label: 'One uppercase letter' },
    { met: hasLowerCase, label: 'One lowercase letter' },
    { met: hasNumbers, label: 'One number' },
  ]

  return (
    <div className="min-h-screen p-8">

      <div className="flex flex-col items-center gap-8 mx-auto">

        {/* Signup card */}
        <div className="relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12">
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

          <div className="flex flex-col max-w-2xl">
              <p className="text-7xl font-light tracking-tight text-white/80 leading-none">Welcome</p>
              <h1 className="text-7xl font-bold tracking-tight text-white/90 leading-none">Sign up</h1>

              <form action={formAction} className="mt-8 flex flex-col gap-6">

                {state?.error && (
                  <div className="rounded-lg border border-white/25 bg-white/5 px-5 py-4">
                    <span className="font-geist-mono text-sm tracking-widest uppercase text-white/70">
                      Error
                    </span>
                    <p className="mt-2 text-white/90">{state.error}</p>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-geist-mono text-sm tracking-widest uppercase text-white/70 mb-2"
                    >
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
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white/90 placeholder-white/40 transition focus:outline-none focus:border-white/25"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block font-geist-mono text-sm tracking-widest uppercase text-white/70 mb-2"
                    >
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
                      aria-invalid={password ? !isPasswordValid : undefined}
                      aria-describedby="password-requirements"
                      className={`w-full px-4 py-3 rounded-lg border bg-black/40 text-white/90 placeholder-white/40 transition focus:outline-none focus:border-white/25 ${
                        password && !isPasswordValid ? 'border-white/40' : 'border-white/10'
                      }`}
                      placeholder="Enter your password"
                    />

                    {/* Password Requirements */}
                    {(showRequirements || password) && (
                      <div
                        id="password-requirements"
                        className="mt-3 rounded-lg border border-white/10 bg-black/40 px-5 py-4"
                      >
                        <span className="font-geist-mono text-sm tracking-widest uppercase text-white/70">
                          Password Requirements
                        </span>
                        <div className="mt-3 flex flex-col gap-1">
                          {requirements.map(({ met, label }) => (
                            <div
                              key={label}
                              className={`flex items-center gap-2 transition-colors ${
                                met ? 'text-white/90' : 'text-white/40'
                              }`}
                            >
                              <span aria-hidden="true">{met ? '✓' : '○'}</span>
                              {label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={!isPasswordValid || !password}
                    className="rounded-full border-2 bg-white/90 px-6 py-2.5 text-center text-black transition hover:bg-white/75 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sign Up
                  </button>
                  <Link
                    href="/login"
                    className="font-geist-mono text-sm tracking-wider uppercase text-white/70 transition hover:text-white/90"
                  >
                    Already registered?
                  </Link>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}
