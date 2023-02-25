import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  data: {
    options: string[]
  }
}

const Home: NextPage<Props> = ({data}) => {

  const [option1, setOption1] = useState<string>("")

  useEffect(() => {
    console.log(option1)
  }, [option1])
  

  return (
    <>
      <h2 className="text-2xl text-center tracking-tight text-white sm:text-[5rem]">
        Chci pískovat na?
      </h2>
      <div className="grid grid-rows-3 grid-flow-row grid-cols-2 gap-4 md:gap-8">
        {
          data.options.map(option =>
          <button className="flex max-w-xs flex-col gap-4 rounded-xl justify-center items-center bg-white/10 p-4 text-white hover:bg-white/20" key={option}>
            <h2 className="text-2xl font-bold" onClick={() => setOption1(option)}>{option}</h2>
          </button>
          )
        }
      </div>
    </>
  );
};

export default Home;

export function getServerSideProps() {
  
  return {
    props: {data: {
      options: ["Sklenici", "Půllitr", "Karafu", "Lahev", "Džbán"]
    }}, // will be passed to the page component as props
  }
}
