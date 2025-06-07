'use client'


import { useEffect, useState } from 'react';

export default function Projects() {

    return(

        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
            <div className="bg-white dark:bg-neutral-800 rounded-lg px-6 py-8 ring-1 ring-neutral-900/5 dark:ring-neutral-700/50 shadow-xl">
                <h1 className="text-3xl font-bold">Projects</h1>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">Here you can find my projects.</p>
            </div>
        </div>
    )
}