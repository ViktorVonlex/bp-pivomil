import { type NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const TypeSelection: NextPage = () => {

  const [nextPage, setNextPage] = useState<string>("")
  const [service, setService] = useState<string>("")

  useEffect(() => {
    localStorage.setItem("service", service)
  }, [service])
  

  return (
    <>
      <h2 className="text-2xl text-center tracking-tight text-white sm:text-5xl sm:text-[5rem]">
        Chci vypískovat
      </h2>
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <button className="flex max-w-xs flex-col gap-4 rounded-xl justify-center items-center bg-white/10 p-4 text-white hover:bg-white/20 active:bg-white/20 focus:outline-none focus:ring focus:ring-violet-100"
        onClick={() => {setService("text");setNextPage(`./typeSelection/text`)}}>
          <h2 className="text-2xl font-bold">TEXT</h2>
        </button>
        <button className="flex max-w-xs flex-col gap-4 rounded-xl justify-center items-center bg-white/10 p-4 text-white hover:bg-white/20 active:bg-white/20 focus:outline-none focus:ring focus:ring-violet-100"
        onClick={() => {setService("obrázek");setNextPage(`./typeSelection/picture`)}}>
          <h2 className="text-2xl font-bold">OBRÁZEK</h2>
        </button>
      </div>
      <div className="inline-flex mt-5">
        <button onClick={() => history.back()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-16 font-bold py-2 px-4 rounded-l">
          Zpět
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <Link href={nextPage} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-16 font-bold py-2 px-4 rounded-r">
          Dále
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link >
      </div>
    </>
    
  )
}

export default TypeSelection