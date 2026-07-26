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
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;
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
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;
            const supabase = createBrowserClient(supabaseUrl, supabaseKey);

            await supabase.auth.signOut();
            // The auth state listener will handle the redirect
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out, please try again!');
            setIsLoggingOut(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                    <span className="font-geist-mono text-sm tracking-widest uppercase text-white/70">
                        Loading
                    </span>
                </div>
            </div>
        );
    }

    // Unauthenticated users are redirected by proxy.ts before reaching this page;
    // this only guards the brief window after signing out, before the redirect lands.
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen p-8">

            <div className="flex flex-col items-center gap-8 mx-auto"> {/* gap between cards */}

                {/* Header card */}
                <div className="fade-in relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12" style={{ animationDelay: '0.2s' }}>
                    <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
                    <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
                    <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
                    <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Left: text content */}
                        <div className="flex flex-col">
                            <p className="text-7xl font-light tracking-tight text-white/80 leading-none">My</p>
                            <h1 className="text-7xl font-bold tracking-tight text-white/90 leading-none">Account</h1>
                            <h2 className="mt-4 font-geist-mono text-lg tracking-[0.2em] uppercase text-white/70 break-all">
                                {user.email}
                            </h2>
                            <h3 className="mt-4 text-xl text-white/80 leading-relaxed">
                                Manage your account settings and preferences.
                            </h3>
                        </div>

                        {/* Right: avatar */}
                        <div className="md:mr-12 shrink-0">
                            <div className="w-32 h-32 rounded-full border border-white/10 bg-neutral-950 flex items-center justify-center transition hover:border-white/20">
                                <span className="text-5xl font-bold text-white/90">
                                    {user.email?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account details card */}
                <div className="fade-in relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12" style={{ animationDelay: '0.3s' }}>
                    <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
                    <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
                    <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
                    <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

                    <h2 className="text-6xl font-bold tracking-tight text-white/90">Details</h2>

                    <div className="mt-8 flex flex-col gap-6">
                        {/* Email */}
                        <div className="rounded-lg border border-white/10 bg-neutral-950 px-5 py-5 transition hover:border-white/20">
                            <span className="font-geist-mono text-sm tracking-widest uppercase text-white/70">
                                Email Address
                            </span>
                            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                <span className="text-xl text-white/90 break-all">{user.email}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white/60" />
                                    <span className="font-geist-mono text-sm tracking-wider uppercase text-white/70">
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* User ID */}
                        <div className="rounded-lg border border-white/10 bg-neutral-950 px-5 py-5 transition hover:border-white/20">
                            <span className="font-geist-mono text-sm tracking-widest uppercase text-white/70">
                                User ID
                            </span>
                            <p className="mt-3 font-geist-mono text-base text-white/80 break-all">{user.id}</p>
                        </div>

                        {/* Member since */}
                        {user.created_at && (
                            <div className="rounded-lg border border-white/10 bg-neutral-950 px-5 py-5 transition hover:border-white/20">
                                <span className="font-geist-mono text-sm tracking-widest uppercase text-white/70">
                                    Member Since
                                </span>
                                <p className="mt-3 text-xl text-white/90">
                                    {new Date(user.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                        <button
                            onClick={() => router.push('/admin')}
                            className="rounded-full border-2 bg-white/90 px-6 py-2.5 text-center text-black transition hover:bg-white/75 active:scale-95"
                        >
                            Admin Dashboard
                        </button>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="rounded-full border-2 border-white/25 px-6 py-2.5 text-center text-white/90 transition hover:bg-white/5 hover:border-white/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoggingOut ? (
                                <span className="inline-flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                                    Logging out...
                                </span>
                            ) : (
                                'Log Out'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
