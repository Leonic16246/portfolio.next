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

  useEffect(() => {
    // Fetch the JSON data
    fetch('/PC.json') // Ensure the path to your JSON file is correct
      .then((response) => response.json())
      .then((data: { Users: PCItem[] }) => setData(data.Users)) // Access the "Users" array
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  return (
    <div className="p-4 dark:bg-dark-900 dark:text-white"> {/* Add dark mode styles */}
      <h1 className="text-2xl font-bold mb-4">PC Components</h1>
      <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Name</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">CPU</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">GPU</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">RAM</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Motherboard</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Storage</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Cooler</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">PSU</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Case</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="dark:bg-dark-800">
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.Name || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.CPU || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.GPU || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.RAM || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.Motherboard || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.Storage || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.Cooler || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.PSU || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.Case || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{item.Note || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}