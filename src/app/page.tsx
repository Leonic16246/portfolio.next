import Link from 'next/link'
import Image from 'next/image'
import logo from '/public/images/CherryTreeGlyph.png'

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg px-6 py-8 ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 shadow-xl ">
        <div className='flex justify-between'>

          <div className="">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Hi,</h1>
            <h2 className="mt-5 text-6xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">I'm Leon</h2>
            <h3 className="mt-2 text-2xl text-neutral-600 dark:text-neutral-300">A software engineering student</h3>
            <h4 className="mt-2 text-xl text-neutral-700 dark:text-neutral-300">Welcome to my portfolio</h4>
          </div>

          <Image
            src={logo}
            alt="Logo"
            width={500}
            height={500}
            priority
            className=""
          />

        </div>
      </div>
    </div>
  );
}