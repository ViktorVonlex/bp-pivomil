import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

type Props = {
  data: {
    options: string[]
  }
}

const Home: NextPage<Props> = ({data}) => {

  const [option1, setOption1] = useState<string>("")

  return (
    <>
      <h2 className="text-2xl text-center tracking-tight text-white sm:text-[5rem]">
        Vyberte typ skla
      </h2>
      <div className="grid grid-rows-3 grid-flow-row grid-cols-2 gap-4 md:gap-8 md:grid-cols-3 md:mt-4">
        {
          data.options.map(option =>
          
            <button className="flex max-w-xs flex-col gap-4 rounded-xl justify-center items-center bg-white/10 p-4 text-white hover:bg-white/20 active:bg-white/20 focus:outline-none focus:ring focus:ring-violet-100"
                key={option} onClick={() => setOption1(option)}>
              <h3 className="text-2xl font-bold">{option}</h3>
            </button>
          
          )
        }
      </div>
      <div className="inline-flex">
        {option1 !== "" &&
        <Link href={`/glassSelection/${option1.toLowerCase()}`} className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-16 h-16 font-bold py-2 px-4 rounded">
          Dále
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link >}
      </div>
    </>
  );
};

export default Home;

export function getServerSideProps() {
  
  return {
    props: {data: {
      options: ["Půllitr", "Třetinka", "Sklenice", "Karafa", "Lahev", "Džbán"]
    }}, // will be passed to the page component as props
  }
}
