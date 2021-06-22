import { connectToDatabase } from '../../util/mongodb';
import { NextApiResponse, NextApiRequest } from 'next';

  export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { nome, horario, local } = req.body;
  
    const { db } = await connectToDatabase();
  
    const collection = db.collection('subscribers');
  
    await collection.insertOne({
        nome,
        horario,
        local
    })
  
    return res.status(201).json({ ok: true });
  }