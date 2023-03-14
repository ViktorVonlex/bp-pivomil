import { type GetStaticPropsContext, type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dropdown from "~/components/Dropdown";
import { type Item } from "~/util/types";
import prisma from '~/util/prisma';
import ImgHelper from "~/components/ImgHelper";
import Link from "next/link";

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
    <div className="bg-[#AB77AE] w-11/12 sm:w-auto md:p-7 p-6 rounded-lg flex container flex-col items-center justify-center gap-10">
      <h2 className="pageHeader mb-[-1.5rem] sm:text-5xl">
        Vyberte pískované sklo
      </h2>
      <div className="w-72 z-10 mt-3">
        {
          selected !== undefined &&
          <Dropdown selected={selected} setSelected={setSelected} items={res} />
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
            <p className="text-white">Cena: {selected?.price} Kč</p>
            <p className="text-white">Bez DPH: {selected?.priceWOVat} Kč</p>
          </div>
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
        <Link href={"./typeSelection"} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-16 font-bold py-2 px-4 rounded-r">
          Dále
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link >
      </div>
    </>
  );
};

export default Glass;

export function getStaticPaths() {
  return {
    paths: [{ params: { glassType: 'třetinka' } }, { params: { glassType: 'půllitr' } }, { params: { glassType: 'džbán' } }, { params: { glassType: 'karafa' } }, { params: { glassType: 'lahev' } }, { params: { glassType: 'sklenice' } }],
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



