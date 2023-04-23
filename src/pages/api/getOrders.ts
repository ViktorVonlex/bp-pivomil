import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../util/prisma'
import { authOptions } from "~/server/auth";
import { getServerSession } from 'next-auth/next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const session = await getServerSession(req, res, authOptions)
  if(!session) {
    res.status(401).json({error: "Unauthenticated user"});
  } 
  else {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const orders = await prisma.order.findMany()
        if(orders!==null) {
          res.status(200).json(orders);
        }
        else {
          res.status(400).json({ message: 'Something went wrong' });
        }
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
};

export default handler