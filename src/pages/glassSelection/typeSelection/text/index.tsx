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
            <div className="flex-row">
                <div className="flex items-center">
                    
                    <h2 className="pageHeader text-center">
                        Vyberte písmo
                    </h2>
                    <div className="w-max flex mx-auto">
                        <Link target="_blank" href="https://www.pivomil.cz/fotky53/fotov/_ps_614PISMO.pdf" className="rounded-xl mt-1 justify-center items-center bg-white/10 p-3 text-white hover:bg-white/20 active:bg-white/20">
                            Ukázka zde
                        </Link>
                    </div>
                </div>
                
                
                <div className="w-72 z-10 mt-3 mb-3">
                    {
                        selected !== undefined &&
                        <Dropdown selected={selected} setSelected={setSelected} items={fonts} />
                    }
                </div>
            </div>

            <div>
                <TextInput setWordCounter={setWordCounter} />
            </div>
            {wordCounter > 0 &&
                <p className="text-white">
                    Vaše předpokládaná cena: {price} Kč
                </p>
            }
            <div className="grid grid-cols-2 gap-10 md:gap-8">
                <button onClick={() => history.back()} className="text-center text-white flex flex-col justify-center">
                    Predchozi
                </button>
                {wordCounter > 0 &&
                    <Link href={"/finalize"} className="text-center text-white flex flex-col justify-center">
                        <button onClick={()=>saveSelectedFontAndStuff(selected as Item, price)}>Dalsi</button>
                    </Link>
                }
            </div>
        </>
    )
}

export default Text