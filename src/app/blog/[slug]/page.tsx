"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default function BlogPage() {

    return(
        <h1>TODO</h1>
        
    )

}