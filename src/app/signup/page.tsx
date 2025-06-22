'use client'

import { signup } from './actions'
import Image from 'next/image'
import logo from '/public/images/CherryTreeGlyph.png'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [showRequirements, setShowRequirements] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  // Password validation checks
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumbers

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg px-6 py-8 ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 shadow-xl">
        <div className='flex justify-between items-center'>
          
          <div className="flex-1">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Welcome</h1>
            <h2 className="mt-3 text-4xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Join for free</h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">Sign up</p>
            
            <form action={signup} className="mt-8 space-y-6">
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
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
                    className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:border-transparent transition-colors ${
                      password && !isPasswordValid 
                        ? 'border-red-300 dark:border-red-600 focus:ring-red-500' 
                        : password && isPasswordValid
                        ? 'border-green-300 dark:border-green-600 focus:ring-green-500'
                        : 'border-neutral-300 dark:border-neutral-600 focus:ring-purple-500'
                    }`}
                    placeholder="Enter your password"
                  />
                  
                  {/* Password Requirements */}
                  {(showRequirements || password) && (
                    <div className="mt-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Password Requirements:
                      </p>
                      <div className="space-y-1">
                        <div className={`flex items-center text-sm ${hasMinLength ? 'text-green-600 dark:text-green-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                          <span className="mr-2">{hasMinLength ? '✓' : '○'}</span>
                          At least 8 characters
                        </div>
                        <div className={`flex items-center text-sm ${hasUpperCase ? 'text-green-600 dark:text-green-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                          <span className="mr-2">{hasUpperCase ? '✓' : '○'}</span>
                          One uppercase letter
                        </div>
                        <div className={`flex items-center text-sm ${hasLowerCase ? 'text-green-600 dark:text-green-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                          <span className="mr-2">{hasLowerCase ? '✓' : '○'}</span>
                          One lowercase letter
                        </div>
                        <div className={`flex items-center text-sm ${hasNumbers ? 'text-green-600 dark:text-green-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
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
                  className={`flex-1 font-semibold py-3 px-6 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                    isPasswordValid && password
                      ? 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-purple-500 focus:ring-offset-white dark:focus:ring-offset-neutral-800 cursor-pointer'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 border-neutral-200 dark:border-neutral-700 cursor-not-allowed'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <div className="flex-shrink-0 ml-8">
            <Image
              src={logo}
              alt="Logo"
              width={400}
              height={400}
              priority
              className="opacity-90"
            />
          </div>

        </div>
      </div>
    </div>
  )
}