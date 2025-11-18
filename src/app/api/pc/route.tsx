import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createClient();
    
    const { data: pcData, error: supabaseError } = await supabase
      .from('pc')
      .select('pc_id, name, cpu, gpu, note')
      .order('pc_id', { ascending: true });

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json(
        { error: 'Database query failed', details: supabaseError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(pcData || [], { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}