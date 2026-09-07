'use client'

import Card from '@/components/card/card'
import { useActionState, useState } from 'react'
import { login } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  const [state, formAction, loading] = useActionState(login, null)
  const [email, setEmail] = useState('')
  const error = state?.error

  return (
    <div className="min-h-screen py-8">

      <div className="flex flex-col items-center gap-8 content-width">

        {/* Login card */}
        <Card>
          <div className="flex flex-col max-w-2xl">
              <p className="text-7xl font-light tracking-tight text-white/80 leading-none">Welcome</p>
              <h1 className="text-7xl font-bold tracking-tight text-white/90 leading-none">Back</h1>

              <form action={formAction} className="mt-8 flex flex-col gap-6">
                {error && (
                  <div className="rounded-lg border border-white/25 bg-white/5 px-5 py-4">
                    <span className="font-geist-mono text-sm tracking-widest uppercase text-white/70">
                      Error
                    </span>
                    <p className="mt-2 text-white/90">{error}</p>
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
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white/90 placeholder-white/40 transition focus:outline-none focus:border-white/25"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full border-2 bg-white/90 px-6 py-2.5 text-center text-black transition hover:bg-white/75 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                  <Link
                    href="/signup"
                    className="font-geist-mono text-sm tracking-wider uppercase text-white/70 transition hover:text-white/90"
                  >
                    Need an account?
                  </Link>
                </div>
              </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
