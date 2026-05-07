import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/pc`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error('Failed to fetch from .NET API');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching PC data:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}