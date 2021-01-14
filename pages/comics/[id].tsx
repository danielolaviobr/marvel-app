import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import InfoCard from "../../components/InfoCard";

interface CharacterProps {
  id: number;
}

const Comic: React.FC<CharacterProps> = () => {
  const [comic, setComic] = useState<any>();
  const [creators, setCreators] = useState([]);
  const router = useRouter();

  const fetchCharacterData = useCallback(async (id: string) => {
    const url = process.env.NEXT_PUBLIC_ENV_URL;
    const response = await axios.get(`${url}api/comics/${id}`);

    setComic(response.data.results[0]);
  }, []);

  useEffect(() => {
    const { id } = router.query;
    id && fetchCharacterData(id as string);
  }, [router]);

  useEffect(() => {
    if (comic) {
      const creatorsArray = comic.creators.items.map(
        (item: { name: string; role: string }) => `${item.name} - ${item.role}`
      );
      setCreators(creatorsArray);
    }
  }, [comic]);

  if (!comic) {
    return <div className=""></div>;
  }

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
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
        <div className="p-4 m-8 bg-red-600 rounded shadow-md">
          <img
            className="shadow-md"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.name}
            width={250}
            height={250}
          />
        </div>
        <h1 className="mx-4 text-4xl font-bold text-center">{comic.title}</h1>
        <div className="flex flex-wrap items-start justify-center max-w-6xl">
          <div className="flex items-center justify-center mx-8 mt-8 text-center">
            <p>{comic.description}</p>
          </div>
          <InfoCard title="Criadores" items={creators} />
        </div>
      </div>
    </>
  );
};

export default Comic;
