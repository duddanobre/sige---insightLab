import { connectToDatabase } from '../../util/mongodb';
import mongodb from 'mongodb';
import { NextApiResponse, NextApiRequest } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'GET'){
      const { query: {id} } = req;
      const query = { _id: new mongodb.ObjectID(id)};

      const { db } = await connectToDatabase();
    
      const collection = db.collection('evento');

      try {
        const data = await collection.findOne(query);
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
      
    }

    if(req.method === 'DELETE'){
      const { query: { id } } = req;
      const query = { _id: new mongodb.ObjectID(id) };

      const { db } = await connectToDatabase();
    
      const collection = db.collection('evento');

      try {
        await collection.deleteOne(query);
        
        return res.status(200).json({
          success: true,
          data: { id },
        });
      }catch (error) {
          return res.status(400).json({
            success: false,
          });
        }
    }  

    if(req.method === 'PUT'){

      const {_id, nome, date, horario, local, atividades ,participantes } = req.body;

      const { db } = await connectToDatabase();
    
      const collection = db.collection('evento');

      try {
        await collection.updateOne(
          { _id: new mongodb.ObjectID(_id) },
          { $set: { nome, date, horario, local, atividades ,participantes }});

          console.log(res.statusCode);
          return res.status(200).json({
            success: true,
            data: { _id, nome, date, horario, local, atividades ,participantes},
          });

      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
        });
      }
    }
}