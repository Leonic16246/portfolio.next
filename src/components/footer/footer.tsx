import Link from 'next/link';

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import next from '/public/next.svg'

export default function Footer() {
  return (
    <footer className="bg-slate text-neutral-200 p-8 border-t-3 border-neutral-300">

        <div className="grid grid-cols-3 gap-80">

            <div className="col-span-1 lg:col-span-2">
                <div className="flex items-center mb-4">
                    <h3 className="text-2xl font-bold">My Portfolio</h3>
                </div>
                <p className="text-neutral-300 mb-4 max-w-md">
                Building better worlds.
                </p>
            <div className="flex space-x-4">
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

            {/* Quick Links */}
            <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    <li>
                        <Link href="/about" className="text-neutral-300 hover:text-white transition-colors">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" className="text-neutral-300 hover:text-white transition-colors">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

        {/* Newsletter Signup
        <div className="mt-8 pt-8 border-t border-neutral-800">
        <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Stay updated</h4>
            <p className="text-neutral-300">Subscribe to our newsletter for the latest updates.</p>
            </div>
            <div className="flex">
            <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
            >
                Subscribe
            </button>
            </div>
        </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-800 md:flex md:items-center md:justify-between">
            <div className="text-neutral-400 text-sm">
                <p>&copy; {new Date().getFullYear()} COPYRIGHT LOLOLOL</p>
            </div>
            <div className="mt-4 md:mt-0">
                <p className="text-neutral-400 text-sm inline">
                    Made using 
                    <Link href="https://nextjs.org" className="ml-1">
                    <Image
                    src={next}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="cursor-pointer dark:invert"
                    unoptimized
                    />
                    </Link>
                     
                </p>
                <p className='text-neutral-400 text-sm'>and Tailwind CSS</p>
            </div>
        </div>

    </footer>
  );
};

