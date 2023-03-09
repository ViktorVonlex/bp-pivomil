import Image from 'next/image'
import React from 'react'

type Props = {
    url: string,
    name: string,
    setLoading: (value: boolean) => void
}

function ImgHelper({url, name, setLoading}: Props) {
  return (
    <Image src={url} fill alt={name} onLoadingComplete={()=>setLoading(false)} className="rounded-l-md bg-white p-1" />
  )
}

export default ImgHelper