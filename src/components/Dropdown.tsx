import { type Dispatch, Fragment, type SetStateAction, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type Props = {
    items: Item[]
    selected: Item,
    setSelected: Dispatch<SetStateAction<Item | undefined>>
} 

type Item = {
    id: number,
    name: string,
    price? : number,
    url? : string
}

const Dropdown = ({items, selected, setSelected}: Props) => {

    const [query, setQuery] = useState<string>("")

    const filteredItems =
    query === ''
      ? items
      : items.filter((item: { name: string }) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <>
        <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1 grow">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(item:Item) => item.name}
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
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredItems.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                    </div>
                ) : (
                    filteredItems.map((item) => (
                    <Combobox.Option
                        key={item.id}
                        className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-[#2a0053] text-white' : 'text-gray-900'
                        }`
                        }
                        value={item}
                    >
                        {({ selected, active }) => (
                        <>
                            <span
                            className={`block truncate ${
                                selected ? 'item-medium' : 'item-normal'
                            }`}
                            >
                            {item.name}
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
    </>
  )
}

export default Dropdown