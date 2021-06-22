import { connectToDatabase } from '../../util/mongodb';
import { NextApiResponse, NextApiRequest } from 'next';

  export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { nome, horario, local, participantes, atividades } = req.body;
  
    const { db } = await connectToDatabase();
  
    const collection = db.collection('evento');
  
    await collection.insertOne({
        nome,
        horario,
        local,
        participantes,
        atividades
    })
  
    return res.status(201).json({ ok: true });
  }