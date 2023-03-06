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
      <h2 className="text-2xl text-center tracking-tight text-white sm:text-[5rem]">
        Chci vypískovat:
      </h2>
      <div className="grid grid-flow-row grid-cols-2 gap-4 md:gap-8">
        <button className="flex max-w-xs flex-col gap-4 rounded-xl justify-center items-center bg-white/10 p-4 text-white hover:bg-white/20 active:bg-white/20">
          <h2 className="text-2xl font-bold" onClick={() => {setService("text");setNextPage(`./typeSelection/text`)}}>TEXT</h2>
        </button>
        <button className="flex max-w-xs flex-col gap-4 rounded-xl justify-center items-center bg-white/10 p-4 text-white hover:bg-white/20 active:bg-white/20">
          <h2 className="text-2xl font-bold" onClick={() => {setService("picture");setNextPage(`./typeSelection/picture`)}}>OBRÁZEK</h2>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-10 md:gap-8">
        <button onClick={() => history.back()} className="text-center text-white flex flex-col justify-center">
            Predchozi
        </button>
        <Link href={nextPage} className="text-center text-white flex flex-col justify-center">
            Dalsi
        </Link>
    </div>
    </>
    
  )
}

export default TypeSelection