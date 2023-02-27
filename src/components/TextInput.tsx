import React from 'react'

function getWordCount(str:string) {
    return str.split(' ').filter(function(num) {
        return num != ''
    }).length;
}

type Props = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    setWordCounter : Function
}

const TextInput = ({setWordCounter}: Props) => {

  return (
    <>
    <div className="w-72">
      <label htmlFor="price" className="block pageHeader">
        Váš text:
      </label>
      <div className="relative rounded-md mt-2">
        <input
          type="text"
          name="text"
          id="text"
          className="w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 font-[${}]"
          placeholder="Váš text zde"
          onChange={(event) => {
            const wordCount = getWordCount(event.target.value)
            setWordCounter(wordCount)
          }}
        />
      </div>
    </div>
  </>
  )
}

export default TextInput