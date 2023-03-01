import { useEffect, useState } from 'react'
import TextInput from "~/components/TextInput";
import Footer from '~/components/Footer';
import Dropdown from '~/components/Dropdown';
import { type Item } from '~/util/types';
import { fonts } from '~/util/fonts';

function calculatePrice(wordCounter:number){
    console.log(wordCounter)
    if(wordCounter === 1) {
        return 99
    } else
    
    if (wordCounter > 1 && wordCounter <= 3) {
        return 178
    } else
    if(wordCounter > 3 && wordCounter <= 6){
        return 299
    } else
    if(wordCounter >= 7 && wordCounter <= 10){
        return 299
    } else
    if(wordCounter > 10){
        return 599
    }

    else return 0
}

export default function Example() {
  const [selected, setSelected] = useState<Item|undefined>(fonts[0])
  const [wordCounter, setWordCounter] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)


    useEffect(() => {
        setPrice(calculatePrice(wordCounter))
        console.log(selected)
    }, [wordCounter, selected])
    

  return (
    <>  
        <div>
            <h2 className="pageHeader">
                Vyberte písmo
            </h2>
            <div className="w-72 z-10 mt-3">
                {
                    selected !== undefined &&
                    <Dropdown selected={selected} setSelected={setSelected} items={fonts}/>
                }
            </div>
        </div>
        
        <div>
            <TextInput setWordCounter={setWordCounter}/>
        </div>
        {wordCounter > 0 &&
        <p className="text-white">
            Vaše předpokládaná cena je: {price} Kč
        </p>
        }
        <Footer prevPage="/typeSelection" nextPage="./finalize"/>
    </>
  )
}