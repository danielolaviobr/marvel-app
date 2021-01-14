import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
import "tailwindcss/tailwind.css";

// The project uses Tailwind and Chakra for styling since both provide nice and quick solutions for styling

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        {/* The Header was added to the _app because it is present in all screens */}
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
