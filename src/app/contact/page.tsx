'use client'

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Contact() {
    const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
        return (
            <span className={className}>
                {text}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-900 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl px-8 py-16 ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 shadow-2xl backdrop-blur-sm">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                            <AnimatedText text="Contact me" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" />
                        </h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12">
                            Feel free to reach out to me through any of the following platforms.
                        </p>
                    </div>

                    {/* Contact Links */}
                    <div className="flex justify-center items-center space-x-8">
                        <a
                            href="mailto:leonic16246@gmail.com"
                            className="flex flex-col items-center p-6 bg-neutral-50 dark:bg-neutral-700 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-all duration-200 hover:shadow-lg group"
                            aria-label="Email"
                        >
                            <FontAwesomeIcon 
                                icon={faEnvelope} 
                                className="text-4xl text-neutral-700 dark:text-neutral-200 group-hover:text-red-600 transition-colors duration-200 mb-3" 
                            />
                            <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                                Email
                            </span>
                        </a>

                        <a
                            href="https://github.com/Leonic16246"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center p-6 bg-neutral-50 dark:bg-neutral-700 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-all duration-200 hover:shadow-lg group"
                            aria-label="GitHub"
                        >
                            <FontAwesomeIcon 
                                icon={faGithub} 
                                className="text-4xl text-neutral-700 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-200 mb-3" 
                            />
                            <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
                                GitHub
                            </span>
                        </a>

                        <a
                            href="https://www.linkedin.com/in/leonic-lee"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center p-6 bg-neutral-50 dark:bg-neutral-700 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-all duration-200 hover:shadow-lg group"
                            aria-label="LinkedIn"
                        >
                            <FontAwesomeIcon 
                                icon={faLinkedin} 
                                className="text-4xl text-neutral-700 dark:text-neutral-200 group-hover:text-blue-600 transition-colors duration-200 mb-3" 
                            />
                            <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                LinkedIn
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}