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

  useEffect(() => {
    // Fetch the JSON data
    fetch('/data/PC.json')
      .then((response) => response.json())
      .then((data: { Users: PCItem[] }) => {
        setData(data.Users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading JSON:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-neutral-600 dark:text-neutral-300">Loading PC components...</div>
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
          <p className="text-neutral-600 dark:text-neutral-200">
            Complete specifications for all PC builds
          </p>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            <div className="p-4 space-y-4">
              {data.map((item, index) => (
                <div 
                  key={index}
                  className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4 border border-neutral-200 dark:border-neutral-600"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    {item.Name || 'Unnamed PC'}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">CPU:</span>
                      <span className="text-sm text-neutral-900 dark:text-neutral-100 text-right">{item.CPU || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">GPU:</span>
                      <span className="text-sm text-neutral-900 dark:text-neutral-100 text-right">{item.GPU || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">RAM:</span>
                      <span className="text-sm text-neutral-900 dark:text-neutral-100 text-right">{item.RAM || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Motherboard:</span>
                      <span className="text-sm text-neutral-900 dark:text-neutral-100 text-right">{item.Motherboard || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Storage:</span>
                      <span className="text-sm text-neutral-900 dark:text-neutral-100 text-right">{item.Storage || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Cooler:</span>
                      <span className="text-sm text-neutral-900 dark:text-neutral-100 text-right">{item.Cooler || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">PSU:</span>
                      <span className="text-sm text-neutral-900 dark:text-neutral-100 text-right">{item.PSU || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Case:</span>
                      <span className="text-sm text-neutral-900 dark:text-neutral-100 text-right">{item.Case || '-'}</span>
                    </div>
                    {item.Note && item.Note !== '-' && (
                      <div className="pt-2 border-t border-neutral-200 dark:border-neutral-600">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Note:</span>
                        <p className="text-sm text-neutral-900 dark:text-neutral-100 mt-1">{item.Note}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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