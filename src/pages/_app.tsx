import { AuthContext } from "@/features/auth";
import { useAuth } from "@/features/auth/useAuth";
import Navbar from "@/features/navbar";
import { accessTokenCookieKey } from "@/utils/handleCookies";
import { ChakraProvider } from "@chakra-ui/react";
import { GetServerSidePropsContext, PreviewData } from "next";
import type { AppProps } from "next/app";
import { ParsedUrlQuery } from "querystring";

export default function App({
  Component,
  pageProps,
  cookies,
}: AppProps & { cookies: any }) {
  const authValues = useAuth(cookies[accessTokenCookieKey]);
  return (
    <ChakraProvider>
      <AuthContext.Provider value={authValues}>
        <Navbar />
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

App.getInitialProps = (context) => {
  return {
    cookies: {
      [accessTokenCookieKey]: context.ctx.req.cookies[accessTokenCookieKey],
    },
  };
};
