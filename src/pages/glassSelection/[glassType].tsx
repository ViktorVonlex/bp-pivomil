import { GetServerSideProps, GetServerSidePropsContext, type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "~/components/Footer";

type Props = {
  res: {
    glassType: string[]
  }
}

const Glass: NextPage<Props> = ({res}) => {

  const [option1, setOption1] = useState<string>("")
  const [nextPage, setNextPage] = useState<string>("/typeSelection")

  const router = useRouter()
  const {glassType} = router.query;
  console.log(res)

  return (
    <>
      <div>{glassType}</div>
      <button onClick={()=> history.back()}>hey bitch</button>
      <Image src={res[2].url} width={50} height={100}/>
      <Footer prevPage="/" nextPage={nextPage} />
    </>
  );
};

export default Glass;

export const getServerSideProps = ({params}:GetServerSidePropsContext) => {

    const data = {
        půllitr: [{name: "Džbánek Aspen", price: 89}, {name: "Džbánek Kugel", price: 109}, {name: "Džbánek Prag", price: 99}],
        třetinka: [{name: "Džbánek Aspen", price: 79}, {name: "Džbánek Kugel", price: 99}, {name: "Džbánek Prag", price: 89, url: "https://www.pivomil.cz/fotky53/fotos/gen320/gen__vyr_1007prag0.jpg"}]
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



