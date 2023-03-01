import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Footer from '~/components/Footer'


const TypeSelection = () => {

  const router = useRouter()
  const currPath = router.pathname
  const [nextPage, setNextPage] = useState<string>("")
  const [option2, setOption2] = useState<string>("")

  return (
    <>
      <h2 className="text-2xl text-center tracking-tight text-white sm:text-[5rem]">
        Chci vypískovat:
      </h2>
      <div className="grid grid-flow-row grid-cols-2 gap-4 md:gap-8">
        <button className="flex max-w-xs flex-col gap-4 rounded-xl justify-center items-center bg-white/10 p-4 text-white hover:bg-white/20 active:bg-white/20">
          <h2 className="text-2xl font-bold" onClick={() => {setOption2("text");setNextPage(`${currPath}/text`)}}>TEXT</h2>
        </button>
        <button className="flex max-w-xs flex-col gap-4 rounded-xl justify-center items-center bg-white/10 p-4 text-white hover:bg-white/20 active:bg-white/20">
          <h2 className="text-2xl font-bold" onClick={() => {setOption2("picture");setNextPage(`${currPath}/picture`)}}>OBRÁZEK</h2>
        </button>
      </div>
      <Footer prevPage="/" nextPage={nextPage} />
    </>
    
  )
}

export default TypeSelection