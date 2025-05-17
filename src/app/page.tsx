import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white dark:bg-gray-100 rounded-lg px-6 py-8 ring-1 ring-gray-900/5 shadow-xl">
        <h1 className="text-3xl font-bold underline text-gray-900 dark:text-gray-200">Welcome to my portfolio</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">This content now properly respects the dark mode toggle.</p>
      </div>
    </div>
  );
}