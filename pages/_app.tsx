import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
// import "../styles/globals.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
