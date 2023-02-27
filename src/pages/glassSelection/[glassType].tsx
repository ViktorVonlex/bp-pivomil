import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "~/components/Footer";

type Props = {
  data: {
    glassType: string[]
  }
}

const Glass: NextPage<Props> = ({data}) => {

  const [option1, setOption1] = useState<string>("")
  const [nextPage, setNextPage] = useState<string>("/typeSelection")

  return (
    <>
      <div></div>
      <Footer prevPage="/" nextPage={nextPage} />
    </>
  );
};

export default Glass;


