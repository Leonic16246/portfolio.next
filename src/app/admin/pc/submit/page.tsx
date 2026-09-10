"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);


export default function SubmitPC() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        cpu: '',
        gpu: '',
        note: ''
    });

    useEffect(() => {
        // Get initial user session
        const getUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
            } finally {
                setLoading(false);
            }
        };

        getUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            setLoading(false);
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
                    gpu: formData.gpu.trim() || null,
                    note: "N/A"
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

    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="font-geist-mono text-sm tracking-widest uppercase text-white/60 mb-4">
                        Loading...
                    </div>
                    <div className="w-8 h-8 border-2 border-white/60 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">
            Please log in
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="rounded-xl border border-white/10 px-4 py-2 font-geist-mono text-sm uppercase text-white/80 transition hover:bg-white/5 hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

    return (
        <div className="relative w-full rounded border-2 border-white/5 bg-neutral-950 px-10 py-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold tracking-tight text-white/90">
                            Submit PC entry
                        </h1>
                        <p className="mt-2 text-white/60">
                            Add your PC build
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/5 p-4">
                            <p className="font-geist-mono text-sm text-red-400/90">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block font-geist-mono text-sm tracking-widest uppercase text-white/70 mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white/90 placeholder-white/40 transition focus:border-white/25"
                                placeholder="Name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cpu" className="block font-geist-mono text-sm tracking-widest uppercase text-white/70 mb-2">
                                CPU
                            </label>
                            <input
                                id="cpu"
                                type="text"
                                value={formData.cpu}
                                onChange={(e) => handleInputChange('cpu', e.target.value)}
                                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white/90 placeholder-white/40 transition focus:border-white/25"
                                placeholder="CPU model"
                            />
                        </div>

                        <div>
                            <label htmlFor="gpu" className="block font-geist-mono text-sm tracking-widest uppercase text-white/70 mb-2">
                                GPU
                            </label>
                            <input
                                id="gpu"
                                type="text"
                                value={formData.gpu}
                                onChange={(e) => handleInputChange('gpu', e.target.value)}
                                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white/90 placeholder-white/40 transition focus:border-white/25"
                                placeholder="GPU model"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 rounded-full border-2 bg-white/90 px-6 py-2.5 text-center text-black transition hover:bg-white/75 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Submitting...' : 'Submit PC'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/pc')}
                                className="rounded-full border-2 border-white/25 px-6 py-2.5 text-center text-white/90 transition hover:bg-white/5 hover:border-white/50 active:scale-95 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
        </div>
    );
}