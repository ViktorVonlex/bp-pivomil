import Link from 'next/link'
import React from 'react'

type Props = {
    prevPage: string,
    nextPage: string
}

const Footer = ({prevPage, nextPage}: Props) => {
  return (
    <>
    <div className="grid grid-cols-2 gap-10 md:gap-8">
        <Link href={prevPage} className="text-center text-white flex flex-col justify-center">
            Predchozi
        </Link>
        <Link href={nextPage} className="text-center text-white flex flex-col justify-center">
            Dalsi
        </Link>
    </div>
    
  </>
  )
}

export default Footer