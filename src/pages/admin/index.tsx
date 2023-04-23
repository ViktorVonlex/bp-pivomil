import { getServerAuthSession } from "../../server/auth";
import React, { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import { type Order } from "~/util/types";

export default function Page() {

  const [orders, setOrders] = useState<Order[]>()
  const [fetchNew, setFetchNew] = useState<boolean>(true)


  async function deleteOrder(id: number) {
    try {
      await fetch('/api/deleteOrder', {
      method: 'DELETE',
      body: JSON.stringify({id: id}),
      })
      setFetchNew(true)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect( () => {
    if(fetchNew === true) {
      fetch('/api/getOrders')
      .then(res =>  res.json()
      )
      .then(data => {
          setOrders(data as Order[])
          setFetchNew(false)
      })
      .catch(err => {
          console.log(err)
          setFetchNew(false)
      }
      )
    }
  }, [fetchNew])
  
  
  return (
    <>
        <h1 className="text-center text-5xl mt-3">Pivomil custom objednávky dashboard</h1>
        <div className="mt-8 w-full">
          <table className="w-5/6 mx-auto justify-center border border-lime-400">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Služba</th>
                <th>Font/Číslo obrázku</th>
                <th>Text/Velikost obrázku</th>
                <th>Produkt</th>
                <th>Cena</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              orders?.map((val, key) => {
                return (
                  <tr key={key} className="text-center border border-lime-400">
                    <td>{val.id}</td>
                    <td>{val.mail}</td>
                    <td>{val.service}</td>
                    {val.font === null
                    ? <td>{val.picture}</td>
                    : <td>{val.font}</td>
                    }
                    {val.text === null
                    ? <td>{val.size}</td>
                    : <td>{val.text}</td>
                    }
                    <td>{val.product}</td>
                    <td>{val.price} Kč</td>
                    <td>
                      <button onClick={()=> void deleteOrder(val.id as number)}>Smazat</button>
                    </td>
                  </tr>
                )})
            }
            </tbody>
          </table>
        </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx)

    if (!session) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      }
    }

    return {
      props: {
        expires: session.expires
      },
    }
}