/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { type SelectedFont, type Item } from "~/util/types";

function saveUserMail(str:string) {
    localStorage.setItem("userMail", str)
}

async function saveTextOrder(productName: string, font: string, finalPrice: number, mail: string) {
    const orderText = localStorage.getItem("text")
    try {
        await fetch('/api/saveOrder', {
        method: 'POST',
        body: JSON.stringify({service: "text", product: productName, font: font, text: orderText, mail: mail, price: finalPrice})
        })
    } catch (error) {
        alert("Something went wrong")
    }
    
}

const Finalize: NextPage = () => {

    const [selectedProduct, setSelectedProduct] = useState<Item>()
    const [selectedFont, setSelectedFont] = useState<SelectedFont>()
    const [finalPrice, setFinalPrice] = useState<number>(0)
    const [service, setSelectedService] = useState<string>("")

    useEffect(() => {
        const selectedProductString = localStorage.getItem("selectedProduct")
        const selectedFontString = localStorage.getItem("selectedFont")
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
            if (selectedFontString !== null) {
                const selectedFontObject = JSON.parse(selectedFontString) as SelectedFont
                setSelectedFont(selectedFontObject)
                helperPrice = helperPrice + selectedFontObject.price
            }
        }
        setFinalPrice(helperPrice)
    }, [])

    return (
        <>
            <h2 className="text-2xl text-center tracking-tight text-white sm:text-[5rem]">
                Vaše objednávka
            </h2>
            <div className="bg-[#AB77AE] w-11/12 md:mt-2 sm:w-auto p-6 rounded-lg flex h-80 container flex-col mt-[-24px]">
                
                <p className="text-white mb-2">Vybrané sklo: {selectedProduct?.name}</p>
                <p className="text-white mb-2">Pískování: {service.toUpperCase()}</p>
                <p className="text-white mb-2">Písmo: {selectedFont?.selectedFont.name}</p>
                <p className="text-white mb-2">Předpokládaná cena: {finalPrice} Kč</p>
                <p className="text-white mb-2">Předpokládaná cena bez daně: {(finalPrice / 1.21).toFixed(0)} Kč</p>
                
                <div className="w-72">
                    <label htmlFor="email" className="text-2xl text-center tracking-tight text-white">
                        Kontaktní email:
                    </label>
                    <div className="relative rounded-md mt-2">
                        <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        placeholder="Zde zadejte váš email"
                        onChange={(event) => {
                            saveUserMail(event.target.value)
                        }}
                        />
                    </div>
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
                onClick={() => {
                    if(service === "text") {
                        //@ts-ignore
                        void saveTextOrder(selectedProduct?.name, selectedFont?.selectedFont.name, finalPrice, localStorage.getItem("userMail"))
                    }
                }}>
                Objednat
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-auto -1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default Finalize;

