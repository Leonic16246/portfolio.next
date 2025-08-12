"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

type PCItem = {
  user_id: string;
  name: string;
  cpu: string;
  gpu: string;
};

export default function SubmitPC() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add this line
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        cpu: '',
        gpu: ''
    });

    useEffect(() => {
        // Get initial user session
        const getUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
            } finally {
                setIsLoading(false);
            }
        };

        getUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            setError('You must be logged in to submit');
            return;
        }

        if (!formData.name.trim()) {
            setError('Name is required');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const { data, error: submitError } = await supabase
                .from('pc')
                .insert([{
                    user_id: user.id,
                    name: formData.name.trim(),
                    cpu: formData.cpu.trim() || null,
                    gpu: formData.gpu.trim() || null
                }])
                .select();

            if (submitError) {
                throw new Error(submitError.message);
            }

            // Redirect to edit page after successful submission
            router.push('/pc');

        } catch (err) {
            console.error('Error submitting PC:', err);
            setError('Failed to submit PC data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    
    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xl font-medium text-neutral-600 dark:text-neutral-400 mb-4">
                        Loading...
                    </div>
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                        Please log in to submit
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
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-neutral-800 rounded-lg px-6 py-8 ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 shadow-xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Submit PC entry
                        </h1>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Add your PC build
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                                placeholder="Enter Name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cpu" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                CPU
                            </label>
                            <input
                                id="cpu"
                                type="text"
                                value={formData.cpu}
                                onChange={(e) => handleInputChange('cpu', e.target.value)}
                                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                                placeholder="Enter CPU model"
                            />
                        </div>

                        <div>
                            <label htmlFor="gpu" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                GPU
                            </label>
                            <input
                                id="gpu"
                                type="text"
                                value={formData.gpu}
                                onChange={(e) => handleInputChange('gpu', e.target.value)}
                                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                                placeholder="Enter GPU model"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Submitting...' : 'Submit PC'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/pc')}
                                className="px-6 py-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}