import React from "react";

import Head from "next/head";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>{"Marvel - Herois & Quadrinhos"}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Aqui você encontra todas as informações sobre seus herois favoritos"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="overflow-hidden">
        <Image
          src="/images/heros.jpg"
          width="4096"
          height="2596"
          className="object-cover min-w-full p-0 m-0"
        />
      </div>
    </>
  );
}
