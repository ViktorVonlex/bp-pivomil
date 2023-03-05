import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { type SelectedFont, type Item } from "~/util/types";

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
            <div className="grid grid-rows-3 grid-flow-row grid-cols-2 gap-4 md:gap-8">
                
                <p className="text-white">Vybrané sklo: {selectedProduct?.name}</p>
                <p className="text-white">Pískování: {service.toUpperCase()}</p>
                <p className="text-white">Písmo: {selectedFont?.selectedFont.name}</p>
                <p className="text-white">Předpokládaná cena: {finalPrice} Kč</p>
                <p className="text-white">Předpokládaná cena bez daně: {(finalPrice / 1.21).toFixed(0)} Kč</p>
            
            </div>
        </>
    );
};

export default Finalize;

