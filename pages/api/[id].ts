import { connectToDatabase } from '../../util/mongodb';
import { NextApiResponse, NextApiRequest } from 'next';
import mongodb from 'mongodb';

  export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'DELETE')  {
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
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    }   
  }