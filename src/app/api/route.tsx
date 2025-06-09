import PC from '@/lib/database';
import { NextResponse } from 'next/server';

export async function POST(req: { json: () => any; }) {
    try {
        const body = await req.json()
        const PCData = body.formdata
        await PC.creat(PCData)

        return NextResponse.json({message: "Success"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error", error }, {status:500});
    }
}