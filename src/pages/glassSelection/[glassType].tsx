import { type GetServerSidePropsContext, type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Dropdown from "~/components/Dropdown";
import Footer from "~/components/Footer";
import { type Item } from "~/util/types";

type Props = {
  res:  Item[]
}

const Glass: NextPage<Props> = ({res}) => {

  const [nextPage, setNextPage] = useState<string>("/typeSelection")
  const [selected, setSelected] = useState<Item|undefined>(res[0])

  const router = useRouter()
  const {glassType} = router.query;
  console.log(selected)

  return (
    <>
        <h2 className="pageHeader">
            Vyberte pískované sklo
        </h2>
        <div className="w-72 z-10 mt-3">
            {
                selected !== undefined && 
                <Dropdown selected={selected} setSelected={setSelected} items={res}/>
            }
        </div>
        <div className="w-72 flex justify-center">
            <div className="w-fit flex justify-center items-center bg-black pr-5 rounded-md">
                {
                    selected?.url &&
                    <Image src={selected.url} width={100} height={200} alt={selected.name} className="mr-5 rounded-l-md"/>
                }
                <div>
                    <p className="text-white">Cena: {selected?.price} Kč</p>
                    <p className="text-white">Bez DPH: {selected?.priceWOVat} Kč</p>
                </div>
            </div>
        </div>
      
        <Footer prevPage="/" nextPage={nextPage} />
    </>
  );
};

export default Glass;

export const getServerSideProps = ({params}:GetServerSidePropsContext) => {

    const data = {
        půllitr: [{name: "Džbánek Aspen", price: 89}, {name: "Džbánek Kugel", price: 109}, {name: "Džbánek Prag", price: 99}],
        třetinka: [{name: "Džbánek Aspen", price: 79}, {name: "Džbánek Kugel", price: 99}, {name: "Džbánek Prag - 0,3l", price: 89, priceWOVat: 65,url: "https://www.pivomil.cz/fotky53/fotos/gen320/gen__vyr_1007prag0.jpg"}]
    }

    let res;

    if (params?.glassType === "třetinku") {
        res = data.třetinka
    }

    if(params?.glassType === "půllitr") {
        res = data.půllitr
    }
  
    return {
      props: {res}, // will be passed to the page component as props
    }
  }



