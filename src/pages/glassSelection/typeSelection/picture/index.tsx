import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import Dropdown from '~/components/Dropdown';
import { type Size, type Item, type Picture } from '~/util/types';
import Link from 'next/link';
import { type NextPage } from 'next';
import { pictures } from '~/util/pictures';
import ImgHelper from '~/components/ImgHelper';
import Image from 'next/dist/client/image';
import { sizes } from '~/util/sizes';

function saveSelectedPictureAndSize(picture:string, size: string, price:number) {
    const obj = {
        picture: picture,
        size: size,
        price: price
    }
    const selectedString = JSON.stringify(obj)
    localStorage.setItem("selectedPicture", selectedString)
}

const Text: NextPage = () => {
    const [selected, setSelected] = useState<Picture | undefined>(pictures[0])
    const [selectedSize, setSelectedSize] = useState<Size | undefined>(sizes[0])
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        if (selected !== undefined && selectedSize !== undefined) {
          saveSelectedPictureAndSize(selected.name, selectedSize.name, selectedSize.price)  
          setLoading(true)
        }
    
      }, [selected])


    return (
        <>
            <h2 className="pageHeader text-center sm:text-5xl sm:mb-3 mx-auto">
                    Vyberte obrázek
            </h2>

            <div className="w-72 z-20 mt-3 mx-auto sm:mb-0 sm:w-96">
                {
                    selected !== undefined &&
                    <div className='flex items-center'>
                         <div className="w-20 flex mr-6">
                            <Link target="_blank" href="https://www.pivomil.cz/Obrazky-pro-piskovani-a9_40.htm" className="rounded-xl mt-1 justify-center items-center bg-white/10 p-3 text-white hover:bg-white/20 active:bg-white/20">
                                Ukázka
                            </Link>
                        </div>
                        <Dropdown selected={selected} setSelected={setSelected as Dispatch<SetStateAction<Item | undefined>>} items={pictures} />
                    </div>      
                }
            </div>
            <div className="w-72 z-10 mb-3 mx-auto sm:mb-0 sm:w-96">
                {
                    selectedSize !== undefined &&
                    <div className='flex items-center'>
                         <div className="w-20 flex mr-6">
                            <p className='text-white justify-center items-center ml-2'>Velikost:</p>
                        </div>
                        <Dropdown selected={selectedSize} setSelected={setSelectedSize as Dispatch<SetStateAction<Item | undefined>>} items={sizes} />
                    </div>      
                }
            </div>
            <div className="w-72 flex justify-center">
                <div className="w-fit flex justify-center items-center bg-white/30 pr-5 rounded-md">
                    <div className="w-28 h-36 relative">
                        {
                        loading === true && selected?.url !== undefined
                            ? <>
                            <Image src={"/blurred-bg.jpg"} alt="Nacitani" fill className="rounded-l-md" />
                            <ImgHelper url={selected?.url} name={selected?.name} setLoading={setLoading} />
                            </>

                            : <>
                            {selected?.url !== undefined &&
                                <ImgHelper url={selected?.url} name={selected?.name} setLoading={setLoading} />
                            }
                            </>
                        }
                    </div>
                    <div className="ml-5">
                        <p className="text-white">Cena: {selectedSize?.price} Kč</p>
                        <p className="text-white">Bez DPH: {selectedSize?.priceWoVat} Kč</p>
                    </div>
                </div>
            </div>
            <div className="inline-flex">
                <button onClick={() => history.back()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-16 font-bold py-2 px-4 rounded-l">
                    Zpět
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <Link href={"/finalize"} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-16 font-bold py-2 px-4 rounded-r">
                    Dále
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </Link >
            </div>    
        </>
    )
}

export default Text