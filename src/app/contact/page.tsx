'use client'

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await emailjs.sendForm(
                'service_8l092lb', 
                'template_7e5vn16', 
                form.current!, 
                {
                    publicKey: 'J6V2VlkRA9yKeOqt7',
                }
            );
            
            console.log('SUCCESS!');
            alert('Message successfully sent!');
            form.current?.reset();
        } catch (error: any) {
            console.log('FAILED...', error.text);
            alert('Failed to send message, please try again!');
        } finally {
            setIsSubmitting(false);
        }
    };

    const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
        return (
            <span className={className}>
                {text}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl px-8 py-12 ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 shadow-2xl backdrop-blur-sm">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                            <AnimatedText text="Contact me" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" />
                        </h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Feel free to contact me if you have any inquiries. I'll get back to you as soon as possible.
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-2xl mx-auto">
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            {/* Name and Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Your Email"
                                        required
                                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="relative">
                                <input
                                    name="subject"
                                    type="text"
                                    placeholder="Subject"
                                    required
                                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                                />
                            </div>

                            {/* Message */}
                            <div className="relative">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[140px]"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Sending...
                                        </div>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                                Let's Connect
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                I'm always interested in hearing about new opportunities and collaborations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}