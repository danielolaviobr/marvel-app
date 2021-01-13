import React, { useEffect } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home(props) {
  return (
    <div className="overflow-hidden">
      <Image
        src="/images/heros.jpg"
        width="4096"
        height="2596"
        className="object-cover min-w-full p-0 m-0"
      />
    </div>
  );
}
