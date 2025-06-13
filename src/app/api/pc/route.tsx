import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET /api/pc
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase('PortfolioDB');
    const collection = db.collection('PC');
    
    const document = await collection.findOne({}, { projection: { _id: 0, user: 1 } });
    
    if (!document || !document.user) {
      return NextResponse.json(
        { user: [] },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { user: document.user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}