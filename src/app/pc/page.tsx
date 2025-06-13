"use client";

import { useEffect, useState } from 'react';

type PCItem = {
  Name: string;
  CPU: string;
  GPU: string;
  RAM: string;
  Motherboard: string;
  Storage: string;
  Cooler: string;
  PSU: string;
  Case: string;
  Note: string;
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
      const response = await fetch('/api/pc');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result.user || []);
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
        <div className="text-neutral-600 dark:text-neutral-300">Loading PC components...</div>
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
                    RAM
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Motherboard
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Storage
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Cooler
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    PSU
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Case
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Note
                  </th>

                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-600">
                {data.map((item, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {item.Name || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.CPU || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.GPU || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.RAM || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.Motherboard || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.Storage || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.Cooler || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.PSU || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.Case || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {item.Note || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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