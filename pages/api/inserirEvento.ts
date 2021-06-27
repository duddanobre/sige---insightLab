import { connectToDatabase } from '../../util/mongodb';
import { NextApiResponse, NextApiRequest } from 'next';

  export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { nome, date,  horario, local, participantes, atividades} = req.body;

    if (!nome || !horario) {
      res.status(400).json({ error: 'Parâmetro ausente, verifique se está passando todos os dados corretamente' });
      return;
    }
    const { db } = await connectToDatabase();
  
    const collection = db.collection('evento');
  if(nome !== "" && horario !== "" && participantes !== null && atividades !== null ){
    await collection.insertOne({
      nome,
      date,
      horario,
      local,
      participantes,
      atividades
  })

  }else{
    res.status(500).send('Erro ao cadastrar o evento, verifique os dados e tente novamente.');
  }
    
    return res.status(201).json({ok: true})
  }