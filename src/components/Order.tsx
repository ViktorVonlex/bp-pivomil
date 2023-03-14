import React from 'react'
import {type Order } from '~/util/types';


const Order = (order: Order) => {


  return (
    <>
        {order.service === "text" &&
            <div className="flex flex-row">
                <p>{order.mail}</p>
                <p>{order.service}</p>
                <p>{order?.font}</p>
                <p>{order?.text}</p>
                <p>{order.product}</p>
                <p>{order.price}</p>
            </div>
        }
    </>
    
  )
}

export default Order