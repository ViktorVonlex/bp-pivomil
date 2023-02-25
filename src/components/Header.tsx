import Head from 'next/head'
import React from 'react'

type Props = {
    children: JSX.Element
}

const Header = ({ children }: Props) => {
  return (
    <>
    <Head>
        <title>Pivomil pískování</title>
        <meta name="description" content="Aplikace pro zadání custom objednávky" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl text-center font-extrabold tracking-tight text-white sm:text-[5rem]">
                Pivomil pískování
            </h1>
            {
                children
            }
        </div>
    </main>
  </>
  )
}

export default Header