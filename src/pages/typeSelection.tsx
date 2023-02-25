import React, { useState } from 'react'
import Footer from '~/components/Footer'

type Props = {}

const TypeSelection = (props: Props) => {

  const [nextPage, setNextPage] = useState<string>("")

  return (
    <>
      <div>typeSelection</div>
      <Footer prevPage="/" nextPage="/nvm" />
    </>
    
  )
}

export default TypeSelection