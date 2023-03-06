import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { type SelectedFont, type Item } from "~/util/types";

function saveUserNote(str:string) {
    localStorage.setItem("userNote", str)
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
            <div className="">
                
                <p className="text-white mb-2">Vybrané sklo: {selectedProduct?.name}</p>
                <p className="text-white mb-2">Pískování: {service.toUpperCase()}</p>
                <p className="text-white mb-2">Písmo: {selectedFont?.selectedFont.name}</p>
                <p className="text-white mb-2">Předpokládaná cena: {finalPrice} Kč</p>
                <p className="text-white mb-2">Předpokládaná cena bez daně: {(finalPrice / 1.21).toFixed(0)} Kč</p>
                
                <div className="w-72">
                    <label htmlFor="email" className="pageHeader">
                        Váš email:
                    </label>
                    <div className="relative rounded-md mt-2">
                        <input
                        type="text"
                        name="text"
                        id="email"
                        className="w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        placeholder="Zde zadejte váš email"
                        onChange={(event) => {
                            saveUserNote(event.target.value)
                        }}
                        />
                    </div>
                </div>
            
            </div>
            <div className="grid grid-cols-2 gap-10 md:gap-8">
                <button onClick={() => history.back()} className="text-center text-white flex flex-col justify-center">
                    Predchozi
                </button>
                <button className="text-center text-white">Objednat</button>
            </div>
        </>
    );
};

export default Finalize;

