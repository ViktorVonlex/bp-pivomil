import { type NextPage } from "next";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import MyModal from "~/components/Dialog";
import { type SelectedFont, type Item, type SelectedPicture } from "~/util/types";

function saveUserMail(str:string) {
    localStorage.setItem("userMail", str)
}

async function saveTextOrder(productName: string, font: string, finalPrice: number, mail: string, setIsOpen: Dispatch<SetStateAction<boolean>>) {
    const orderText = localStorage.getItem("text")
    try {
        await fetch('/api/saveOrder', {
        method: 'POST',
        body: JSON.stringify({service: "text", product: productName, font: font, text: orderText, mail: mail, price: finalPrice})
        })
        setIsOpen(true)
    } catch (error) {
        console.log(error)
    }
}

async function savePictureOrder(productName: string, picture: SelectedPicture, finalPrice: number, mail: string, setIsOpen: Dispatch<SetStateAction<boolean>>) {
    try {
        await fetch('/api/saveOrder', {
        method: 'POST',
        body: JSON.stringify({service: "obrázek", product: productName, picture: picture.picture, size: picture.size, mail: mail, price: finalPrice})
        })
        setIsOpen(true)
    } catch (error) {
        console.log(error)
    }
}

const Finalize: NextPage = () => {

    const [selectedProduct, setSelectedProduct] = useState<Item>()
    const [selectedFont, setSelectedFont] = useState<SelectedFont>()
    const [selectedPicture, setSelectedPicture] = useState<SelectedPicture>()
    const [finalPrice, setFinalPrice] = useState<number>(0)
    const [service, setSelectedService] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const selectedProductString = localStorage.getItem("selectedProduct")
        
        const selectedService = localStorage.getItem("service")
        let helperPrice = 0;
        if (selectedProductString !== null) {
            const selectedProductObject = JSON.parse(selectedProductString) as Item
            setSelectedProduct(selectedProductObject)
            if(selectedProductObject.price) {
                helperPrice = helperPrice + selectedProductObject.price
            }
        }
        
        if (selectedService === "text") {
            setSelectedService(selectedService)
            const selectedFontString = localStorage.getItem("selectedFont")
            if (selectedFontString !== null) {
                const selectedFontObject = JSON.parse(selectedFontString) as SelectedFont
                setSelectedFont(selectedFontObject)
                helperPrice = helperPrice + selectedFontObject.price
            }
        }
        if(selectedService === "obrázek"){
            const selectedPicture = localStorage.getItem("selectedPicture")
            setSelectedService(selectedService)
            if (selectedPicture !== null) {
                const selectedPictureObject = JSON.parse(selectedPicture) as SelectedPicture
                setSelectedPicture(selectedPictureObject)
                helperPrice = helperPrice + selectedPictureObject.price
            }
        }
        setFinalPrice(helperPrice)
    }, [])

    return (
        <>
            <h2 className="text-2xl text-center tracking-tight text-white sm:text-[5rem]">
                Vaše objednávka
            </h2>
            <div className="bg-[#AB77AE] outline outline-pink-200 w-11/12 md:mt-2 sm:w-auto p-6 rounded-lg flex container flex-col mt-[-24px]">
                
                <p className="text-white mb-2">Vybrané sklo: {selectedProduct?.name}</p>
                <p className="text-white mb-2">Pískování: {service.toUpperCase()}</p>
                {
                    service === "text"
                    ? <p className="text-white mb-2">Písmo: {selectedFont?.selectedFont.name}</p>
                    :
                    <>
                        <p className="text-white mb-2">Číslo obrázku: {selectedPicture?.picture}</p>
                        <p className="text-white mb-2">Velikost obrázku: {selectedPicture?.size}</p>
                    </>
                }
                
                <p className="text-white mb-2">Předpokládaná cena: {finalPrice} Kč</p>
                <p className="text-white mb-2">Předpokládaná cena bez daně: {(finalPrice / 1.21).toFixed(0)} Kč</p>
                
                <div className="w-72 mb-2">
                    
                    <form className="relative rounded-md mt-5" id="myform"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if(service === "text") {                           
                            void saveTextOrder(selectedProduct?.name as string, selectedFont?.selectedFont.name as string, finalPrice, localStorage.getItem("userMail") as string, setIsOpen)
                        }
                        if(service === "obrázek") {
                            void savePictureOrder(selectedProduct?.name as string, selectedPicture as SelectedPicture, finalPrice, localStorage.getItem("userMail") as string, setIsOpen)
                        }
                    }}>
                        <label htmlFor="email" className="text-2xl text-center tracking-tight text-white">
                            Kontaktní email:
                        </label>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full rounded-lg mt-2 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        placeholder="Zde zadejte váš email"
                        onChange={(event) => {
                            saveUserMail(event.target.value)
                        }}
                        />
                    </form>
                </div>
            
            </div>
            <div className="inline-flex">
                <button onClick={() => history.back()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-17 font-bold py-2 px-4 rounded-l">
                Zpět
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 h-17 font-bold py-2 px-4 rounded-r"
                type="submit" form="myform">
                Objednat
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto -1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button>
            </div>
            <MyModal isOpen={isOpen} setIsOpen={setIsOpen} /> 
        </>
    );
};

export default Finalize;

