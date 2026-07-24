// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const options = {};

let clientPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
  }

  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };
    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = new MongoClient(uri, options).connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    clientPromise = new MongoClient(uri, options).connect();
  }

  return clientPromise;
}

export async function getDatabase(dbName: string = 'portfolio'): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}

export default getClientPromise;