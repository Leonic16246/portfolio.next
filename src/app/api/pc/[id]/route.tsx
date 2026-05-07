import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/pc/${params.id}`, {
      next: { revalidate: 10 }
    });

    if (res.status === 404) {
      return NextResponse.json({ error: 'PC not found' }, { status: 404 });
    }

    if (!res.ok) throw new Error('Failed to fetch from .NET API');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching PC:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}