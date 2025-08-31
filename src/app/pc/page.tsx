"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

type PCItem = {
  pc_id: string;
  name: string;
  cpu: string;
  gpu: string;
  note: string;
};

export default function PC() {
  const [data, setData] = useState<PCItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPCData();
  }, []);

  const fetchPCData = async () => {
    try {
      setLoading(true);
      
      // Query Supabase for PC data
      const { data: pcData, error: supabaseError } = await supabase
        .from('pc')
        .select('pc_id, name, cpu, gpu, note')
        .order('pc_id', { ascending: true });

      if (supabaseError) {
        throw new Error(`Supabase error: ${supabaseError.message}`);
      }

      setData(pcData || []);
      setError(null);
    } catch (err) {
      console.error('Error loading PC data:', err);
      setError('Failed to load PC data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
      return (
          <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
              <div className="text-center">
                  <div className="text-xl font-medium text-neutral-600 dark:text-neutral-400 mb-4">
                      Loading...
                  </div>
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
          </div>
      );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">
          {error}
          <button 
            onClick={fetchPCData}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200 mb-2">
            PC Components Overview
          </h1>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100 dark:bg-neutral-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    CPU
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    GPU
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-600">
                {data.map((item) => (
                  <tr 
                    key={item.pc_id} 
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {item.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.cpu || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.gpu || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.note || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {data.map((item) => (
              <div key={item.pc_id} className="p-6 border-b border-neutral-200 dark:border-neutral-600 last:border-b-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.name || 'Unnamed PC'}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">CPU:</span>
                      <span className="text-neutral-600 dark:text-neutral-400">{item.cpu || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">GPU:</span>
                      <span className="text-neutral-600 dark:text-neutral-400">{item.gpu || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">No PC components found.</p>
          </div>
        )}
      </div>
    </div>
  );
}