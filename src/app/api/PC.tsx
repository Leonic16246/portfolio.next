import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

type PCItem = {
  Name: string;
  CPU: string;
  GPU: string;
  RAM: string;
  Motherboard: string;
  Storage: string;
  Cooler: string;
  PSU: string;
  Case: string;
  Note: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('PortfolioDB'); // change to your DB name
    const collection = db.collection<PCItem>('PC'); // change to your collection name

    const pcs = await collection.find({}).toArray();
    res.status(200).json(pcs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
