/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../util/prisma'
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
/*
  const session = await getSession({req})
  if(!session) {
    res.status(401).json({error: "Unauthenticated user"});
  } 
  else {*/
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const info = JSON.parse(req.body)
    console.log(info)

    try {
        await prisma.order.delete({
            where: {
                id: info.id
              }
        })
        res.status(200).json({ message: 'Succes' });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  //}
};

export default handler