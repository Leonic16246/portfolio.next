'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function PCSearch({ search }: { search?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(search || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submitted:', value);
    const params = new URLSearchParams();
    if (value.trim()) params.set('search', value.trim());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setValue('');
    router.push(pathname);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">

      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          className="w-full bg-neutral-950 ring-1 ring-white/10 rounded-xl px-5 py-3 text-sm text-white/80 placeholder:text-white/20 font-geist-mono focus:outline-none focus:ring-white/20"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="cursor-pointer rounded-xl bg-white/90 px-6 py-3 text-sm font-geist-mono text-black transition hover:bg-white/80 active:scale-95"
      >
        Search
      </button>
    </form>

  );
}