import { getServerAuthSession } from "../../server/auth";
import React from "react";
import type { GetServerSideProps } from "next";

export default function Page() {
  
  return (
    <>
        <h1>Pivomil custom objednávky dashboard</h1>
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