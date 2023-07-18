import { AppContextProps } from "@/app/models";
import useApp from "@/app/useApp";
import { AuthContext } from "@/features/auth";
import AddEditBook from "@/features/book/edit";
import Navbar from "@/features/navbar";
import { accessTokenCookieKey } from "@/utils/handleCookies";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";

export const AppContext = React.createContext({} as AppContextProps);

export default function App(props: AppProps & { cookies: any }) {
  const { cookies, Component, pageProps } = props;
  const { authValues, ...rest } = useApp(cookies);
  return (
    <ChakraProvider>
      <AppContext.Provider value={rest}>
        <AuthContext.Provider value={authValues}>
          <Navbar />
          <Component {...pageProps} />

          <AddEditBook />
        </AuthContext.Provider>
      </AppContext.Provider>
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
