import { getServerAuthSession } from "../../server/auth";
import React, { useEffect } from "react";
import type { GetServerSideProps } from "next";


export default function Page() {

  useEffect( () => {
    fetch('/api/getOrders')
      .then(res =>  res.json()
      )
      .then(data => {
          console.log(data)
      })
      .catch(err => {
          console.log(err)
      }
      )
  
    
  }, [])
  
  
  return (
    <>
        <h1>Pivomil custom objednávky dashboard</h1>
        <div>
          {}
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