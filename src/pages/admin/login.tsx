import { signIn } from "next-auth/react";
import { type GetServerSideProps } from "next/types";
import { useRef } from "react";
import { getServerAuthSession } from "~/server/auth";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/admin",
    });
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600">
      {searchParams?.message && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{searchParams?.message}</p>}
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <input placeholder="User Name" type="text" onChange={(e) => (userName.current = e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => (pass.current = e.target.value)} />
        <button onClick={()=> {void onSubmit()}}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }
  
  return {
    props: {
      data: null
    },
  }
}