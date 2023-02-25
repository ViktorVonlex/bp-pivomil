import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type Font = {
    id: number,
    name: string
}

const fonts = [
  { id: 1, name: 'Times New Roman' },
  { id: 2, name: 'Alfa Frivolity Bold ' },
  { id: 3, name: 'Amazone 0123456789' },
  { id: 4, name: 'Amarante normal' },
  { id: 5, name: 'Arial Black Bold' },
  { id: 6, name: 'Amatic SC bold' },
]

export default function Example() {
  const [selected, setSelected] = useState<Font|undefined>(fonts[0])
  const [query, setQuery] = useState('')

  const filteredfonts =
    query === ''
      ? fonts
      : fonts.filter((font) =>
          font.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <>
        <h2 className="pageHeader">
            Vyberte písmo
        </h2>
        <div className="w-72 mt-[-24px]">
        <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(font:Font) => font.name}
                onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
                </Combobox.Button>
            </div>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
            >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredfonts.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                    </div>
                ) : (
                    filteredfonts.map((font) => (
                    <Combobox.Option
                        key={font.id}
                        className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                        }
                        value={font}
                    >
                        {({ selected, active }) => (
                        <>
                            <span
                            className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                            }`}
                            >
                            {font.name}
                            </span>
                            {selected ? (
                            <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                                }`}
                            >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            ) : null}
                        </>
                        )}
                    </Combobox.Option>
                    ))
                )}
                </Combobox.Options>
            </Transition>
            </div>
        </Combobox>
        </div>
    </>
  )
}