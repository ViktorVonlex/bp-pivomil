import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/util/prisma';
import type { Order } from '~/util/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
      const info = JSON.parse(req.body as string) as Order
      if(info.service === "text") {
        await prisma.order.create({
            data: {
                service: info.service,
                product: info.product,
                font: info.font,
                text: info.text,
                mail: info.mail,
                price: info.price
            }
        });
        res.status(200).json({ message: 'Succes save' });
      }
      if(info.service === "obrázek") {
        await prisma.order.create({
          data: {
              service: info.service,
              product: info.product,
              picture: info.picture,
              size: info.size,
              mail: info.mail,
              price: info.price
          }
      });
      res.status(200).json({ message: 'Succes save' });
      }

    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }

};export default handler