import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET /api/projects
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase('PortfolioDB');
    const collection = db.collection('Projects');
    
    const document = await collection.findOne({}, { projection: { _id: 0, project: 1 } });
    
    if (!document || !document.project) {
      return NextResponse.json(
        { project: [] },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { project: document.project },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}