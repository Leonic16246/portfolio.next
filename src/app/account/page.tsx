'use client'

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Account() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
        const supabase = createBrowserClient(supabaseUrl, supabaseKey);

        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data?.user) {
                setUser(data.user);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        };

        // Get initial user
        getUser();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setUser(session.user);
                } else {
                    setUser(null);
                    if (event === 'SIGNED_OUT') {
                        router.push('/login');
                    }
                }
                setIsLoading(false);
            }
        );

        // Cleanup subscription on unmount
        return () => {
            subscription?.unsubscribe();
        };
    }, [router]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
            const supabase = createBrowserClient(supabaseUrl, supabaseKey);
            
            await supabase.auth.signOut();
            // The auth state listener will handle the redirect
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out, please try again!');
            setIsLoggingOut(false);
        }
    };

    const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
        return (
            <span className={className}>
                {text}
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 p-6 flex items-center justify-center">
                <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-neutral-600 dark:text-neutral-400">Loading...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 p-6 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                        Not Logged In.
                    </h1>
                    <button
                        onClick={() => router.push('/login')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl px-8 py-12 ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 shadow-2xl backdrop-blur-sm">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                            <AnimatedText text="My Account" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" />
                        </h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Manage your account settings and preferences.
                        </p>
                    </div>

                    {/* Account Information */}
                    <div className="max-w-2xl mx-auto">
                        <div className="space-y-6">
                            {/* User Avatar Section */}
                            <div className="flex justify-center mb-8">
                                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Email Display */}
                            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Email Address
                                </label>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg text-neutral-900 dark:text-white font-medium">
                                        {user.email}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                            Verified
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    User ID
                                </label>
                                <span className="text-sm text-neutral-600 dark:text-neutral-400 font-mono break-all">
                                    {user.id}
                                </span>
                            </div>

                            {user.created_at && (
                                <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600">
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Member Since
                                    </label>
                                    <span className="text-lg text-neutral-900 dark:text-white">
                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 mt-8 border-t border-neutral-200 dark:border-neutral-700">
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[140px]"
                            >
                                {isLoggingOut ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Logging out...
                                    </div>
                                ) : (
                                    'Log Out'
                                )}
                            </button>
                            
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="px-8 py-4 bg-neutral-200 dark:bg-neutral-600 text-neutral-900 dark:text-white font-semibold rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-500 transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>

                    {/* Additional Info */}
                    {/* <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                                Need Help?
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                If you have any questions about your account, feel free to contact support.
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}