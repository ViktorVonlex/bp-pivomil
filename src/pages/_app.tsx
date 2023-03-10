/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SessionProvider } from "next-auth/react";
import "~/styles/globals.css";
import Header from "~/components/Header";
import { type AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps : { session, ...pageProps }, router }: AppProps) {
  // Determine if the current page should not include the header
  const noHeader = router.pathname === "/admin/login";

  // Render the App component with the appropriate header and page content
  return (
    <>
      <SessionProvider session={session}>
        {noHeader
        ? <Component {...pageProps} />
        : <Header>
            <Component {...pageProps} />
          </Header>
        }
      </SessionProvider>
    </>
  );
}

export default MyApp;
