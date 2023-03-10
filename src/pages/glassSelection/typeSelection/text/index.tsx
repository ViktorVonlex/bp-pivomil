import { useEffect, useState } from 'react'
import TextInput from "~/components/TextInput";
import Dropdown from '~/components/Dropdown';
import { type Item } from '~/util/types';
import { fonts } from '~/util/fonts';
import Link from 'next/link';
import { type NextPage } from 'next';

function calculatePrice(wordCounter: number) {
    console.log(wordCounter)
    if (wordCounter === 1) {
        return 99
    } else
        if (wordCounter > 1 && wordCounter <= 3) {
            return 178
        } else
            if (wordCounter > 3 && wordCounter <= 6) {
                return 299
            } else
                if (wordCounter >= 7 && wordCounter <= 10) {
                    return 299
                } else
                    if (wordCounter > 10) {
                        return 599
                    }

                    else return 0
}

function saveSelectedFontAndStuff(selected:Item, price:number) {
    const obj = {
        selectedFont: selected,
        price: price
    }
    const selectedString = JSON.stringify(obj)
    localStorage.setItem("selectedFont", selectedString)
}

const Text: NextPage = () => {
    const [selected, setSelected] = useState<Item | undefined>(fonts[0])
    const [wordCounter, setWordCounter] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)


    useEffect(() => {
        setPrice(calculatePrice(wordCounter))
        localStorage.removeItem("selectedPicture")
        console.log(selected)
    }, [wordCounter, selected])


    return (
        <>
        <div className="bg-[#AB77AE] w-11/12 sm:w-auto md:p-7 p-6 rounded-lg flex h-80 container flex-col items-center">
            <div className="flex-row">

                <h2 className="pageHeader text-center sm:text-5xl sm:mb-3 mx-auto">
                    Vyberte písmo
                </h2>

                <div className="w-72 z-10 mt-3 mb-3 mx-auto sm:mb-0 sm:w-96">
                    {
                        selected !== undefined &&
                        <div className='flex items-center'>
                            <div className="w-max flex mr-6">
                                <Link target="_blank" href="https://www.pivomil.cz/fotky53/fotov/_ps_614PISMO.pdf" className="rounded-xl mt-1 justify-center items-center bg-white/30 p-3 text-white hover:bg-white/40 active:bg-white/40">
                                    Ukázka
                                </Link>
                            </div>
                            <Dropdown selected={selected} setSelected={setSelected} items={fonts} />
                        </div>
                        
                    }
                </div>
            </div>

            <div className="mt-3">
                <TextInput setWordCounter={setWordCounter} />
            </div>
            {wordCounter > 0 &&
                <p className="text-white sm:text-lg md:text-xl h-7 mt-12 sm:mt-8">
                    Předpokládaná cena pískování: {price} Kč
                </p>
            }
            </div>
            {wordCounter > 0 
            ?
            <div className="inline-flex">
                <button onClick={() => history.back()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-16 font-bold py-2 px-4 rounded-l">
                Zpět
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <Link href={"/finalize"} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-16 font-bold py-2 px-4 rounded-r">
                    <button onClick={()=>saveSelectedFontAndStuff(selected as Item, price)}>Dále
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </Link >
            </div>
            : 
            <button onClick={() => history.back()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-16 font-bold py-2 px-4 rounded">
                Zpět
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </button>
            }
        </>
    )
}

export default Text