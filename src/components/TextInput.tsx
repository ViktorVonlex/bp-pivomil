import React from 'react'

function getWordCount(str:string) {
    return str.split(' ').filter(function(num) {
        return num != ''
    }).length;
}

function saveText(str:string) {
  localStorage.setItem("text", str)
}

type Props = {
    setWordCounter : (value: number) => void
}

const TextInput = ({setWordCounter}: Props) => {

  return (
    <>
    <div className="w-72">
      <label htmlFor="price" className="block pageHeader sm:text-5xl sm:mb-3">
        Váš text:
      </label>
      <div className="relative rounded-md mt-2">
        <input
          type="text"
          name="text"
          id="text"
          className="w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
          placeholder="Váš text zde"
          onChange={(event) => {
            const wordCount = getWordCount(event.target.value)
            saveText(event.target.value)
            setWordCounter(wordCount)
          }}
        />
      </div>
    </div>
  </>
  )
}

export default TextInput