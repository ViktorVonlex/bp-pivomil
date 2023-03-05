import { type GetStaticPropsContext, type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dropdown from "~/components/Dropdown";
import Footer from "~/components/Footer";
import { type Item } from "~/util/types";
import prisma from '~/util/prisma';
import ImgHelper from "~/components/ImgHelper";

type Props = {
  res: Item[]
}

const Glass: NextPage<Props> = ({ res }) => {

  const [selected, setSelected] = useState<Item | undefined>(res[0])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (selected !== undefined) {
      const selectedString = JSON.stringify(selected)
      localStorage.setItem("selectedProduct", selectedString)
      setLoading(true)
    }

  }, [selected])

  return (
    <>
      <h2 className="pageHeader mb-[-1.5rem]">
        Vyberte pískované sklo
      </h2>
      <div className="w-72 z-10 mt-3">
        {
          selected !== undefined &&
          <Dropdown selected={selected} setSelected={setSelected} items={res} />
        }
      </div>
      <div className="w-72 flex justify-center">
        <div className="w-fit flex justify-center items-center bg-black pr-5 rounded-md">
          <div className="w-28 h-36 relative">
            {
              loading === true && selected?.url !== undefined
              ? <>
                  <Image src={"/blurred-bg.jpg"} alt="Nacitani" fill className="rounded-l-md" />
                  <ImgHelper url={selected?.url} name={selected?.name} setLoading={setLoading}/>
                </>
                
              : <>
                {selected?.url !== undefined &&
                  <ImgHelper url={selected?.url} name={selected?.name} setLoading={setLoading}/> 
                }
                </> 
            }
          </div>
          <div className="ml-5">
            <p className="text-white">Cena: {selected?.price} Kč</p>
            <p className="text-white">Bez DPH: {selected?.priceWOVat} Kč</p>
          </div>
        </div>
      </div>

      <Footer prevPage="/" nextPage="./typeSelection" />
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

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {

  let res;

  const glassType: string = params?.glassType as string;

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



