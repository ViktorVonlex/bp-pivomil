import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { type Item } from "~/util/types";

const Finalize: NextPage = () => {

    const [selectedProduct, setSelectedProduct] = useState<Item>()

    useEffect(() => {
        const selectedProductString = sessionStorage.getItem("selectedProduct")
        if (selectedProductString !== null) {
            const selectedProductObject = JSON.parse(selectedProductString) as Item
            setSelectedProduct(selectedProductObject)
        }
    }, [])

    return (
        <>
            <h2 className="text-2xl text-center tracking-tight text-white sm:text-[5rem]">
                Shrnutí objednávky
            </h2>
            <div className="grid grid-rows-3 grid-flow-row grid-cols-2 gap-4 md:gap-8">
                {
                    <div>{selectedProduct?.name}</div>
                }

            </div>
        </>
    );
};

export default Finalize;

