import { login } from './actions'
import Image from 'next/image'
import logo from '/public/images/CherryTreeGlyph.png'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg px-6 py-8 ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 shadow-xl">
        <div className='flex justify-between items-center'>
          
          <div className="flex-1">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Welcome</h1>
            <h2 className="mt-3 text-4xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Back</h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">Log in</p>
            
            <form className="mt-8 space-y-6">
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
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  formAction={login}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Login
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