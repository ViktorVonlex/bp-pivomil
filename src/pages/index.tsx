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
          
            <button className="flex max-w-xs flex-col gap-4 rounded-xl justify-center items-center bg-white/10 p-4 text-white hover:bg-white/20 active:bg-white/20"
                key={option} onClick={() => setOption1(option)}>
              <h2 className="text-2xl font-bold">{option}</h2>
            </button>
          
          )
        }
      </div>
      <div className="grid grid-cols-2 gap-10 sm:gap-8">
        <div></div>
        {option1 !== "" &&
        <Link href={`/glassSelection/${option1.toLowerCase()}`} className="text-center text-white flex flex-col justify-center">
            Dalsi
        </Link>}
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
