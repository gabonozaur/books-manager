import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthProvider } from "./features/auth";
import LoginAuth from "./features/auth/login";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <LoginAuth />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
