/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type GetStaticPropsContext, type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Dropdown from "~/components/Dropdown";
import Footer from "~/components/Footer";
import { type Item } from "~/util/types";
import prisma from '~/util/prisma';

type Props = {
  res:  Item[]
}

const Glass: NextPage<Props> = ({res}) => {

  const [nextPage, setNextPage] = useState<string>("/typeSelection")
  const [selected, setSelected] = useState<Item|undefined>(res[0])

  return (
    <>
        <h2 className="pageHeader mb-[-1.5rem]">
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
                    <div className="w-28 h-36 relative">
                        <Image src={selected.url} fill alt={selected.name} className="rounded-l-md"/>
                    </div>
                }
                <div className="ml-5">
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

export function getStaticPaths() {
    return {
      paths: [{ params: { glassType: 'třetinka' } }, { params: { glassType: 'půllitr' } }],
      fallback: false, // can also be true or 'blocking'
    }
}

export const getStaticProps = async ({params}:GetStaticPropsContext) => {
    
    let res;

    //@ts-ignore
    const glassType:string = params?.glassType;

    try {
        const selectedTypeProducts = await prisma.product.findMany({
            where: {
                type: glassType
              }
        });
        
        console.log(selectedTypeProducts)
        res = selectedTypeProducts
      } catch (err) {
        console.log("yikes")
      }
  
    return {
      props: {
            res
        },
        revalidate: 43200
    
    }
}



