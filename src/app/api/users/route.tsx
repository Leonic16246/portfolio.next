// // app/api/users/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getDatabase, User } from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// // GET all users
// export async function GET() {
//   try {
//     const db = await getDatabase();
//     const users = await db.collection<User>('users').find({}).toArray();
    
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error('Database Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch users' },
//       { status: 500 }
//     );
//   }
// }

// // POST create new user
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { name, email } = body;

//     if (!name || !email) {
//       return NextResponse.json(
//         { error: 'Name and email are required' },
//         { status: 400 }
//       );
//     }

//     const db = await getDatabase();
//     const newUser: User = {
//       name,
//       email,
//       createdAt: new Date(),
//     };

//     const result = await db.collection<User>('users').insertOne(newUser);
    
//     return NextResponse.json(
//       { message: 'User created', id: result.insertedId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Database Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create user' },
//       { status: 500 }
//     );
//   }
// }

// // app/api/users/[id]/route.ts
// interface Params {
//   params: {
//     id: string;
//   };
// }

// // GET single user
// export async function GET(request: NextRequest, { params }: Params) {
//   try {
//     const { id } = params;
    
//     if (!ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { error: 'Invalid user ID' },
//         { status: 400 }
//       );
//     }

//     const db = await getDatabase();
//     const user = await db.collection<User>('users').findOne({
//       _id: new ObjectId(id)
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error('Database Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch user' },
//       { status: 500 }
//     );
//   }
// }

// // PUT update user
// export async function PUT(request: NextRequest, { params }: Params) {
//   try {
//     const { id } = params;
//     const body = await request.json();
    
//     if (!ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { error: 'Invalid user ID' },
//         { status: 400 }
//       );
//     }

//     const db = await getDatabase();
//     const result = await db.collection<User>('users').updateOne(
//       { _id: new ObjectId(id) },
//       { $set: body }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { error: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: 'User updated successfully' });
//   } catch (error) {
//     console.error('Database Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to update user' },
//       { status: 500 }
//     );
//   }
// }

// // DELETE user
// export async function DELETE(request: NextRequest, { params }: Params) {
//   try {
//     const { id } = params;
    
//     if (!ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { error: 'Invalid user ID' },
//         { status: 400 }
//       );
//     }

//     const db = await getDatabase();
//     const result = await db.collection<User>('users').deleteOne({
//       _id: new ObjectId(id)
//     });

//     if (result.deletedCount === 0) {
//       return NextResponse.json(
//         { error: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Database Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete user' },
//       { status: 500 }
//     );
//   }
// }