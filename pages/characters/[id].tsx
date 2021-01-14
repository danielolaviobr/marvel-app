import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import InfoCard from "../../components/InfoCard";

interface CharacterProps {
  id: number;
}

const Character: React.FC<CharacterProps> = () => {
  const [character, setCharacter] = useState<any>();
  const [comics, setComics] = useState([]);
  const [series, setSeries] = useState([]);
  const [stories, setStories] = useState([]);
  const router = useRouter();

  const fetchCharacterData = useCallback(async (id: string) => {
    const url = process.env.NEXT_PUBLIC_ENV_URL;
    const response = await axios.get(`${url}api/characters/${id}`);

    setCharacter(response.data.results[0]);
  }, []);

  useEffect(() => {
    const { id } = router.query;
    id && fetchCharacterData(id as string);
  }, [router]);

  useEffect(() => {
    if (character) {
      const comicsArray = character.comics.items.map(
        (item: { name: string }) => item.name
      );
      const seriesArray = character.series.items.map(
        (item: { name: string }) => item.name
      );
      const storiesArray = character.stories.items.map(
        (item: { name: string }) => item.name
      );

      setStories(storiesArray);
      setSeries(seriesArray);
      setComics(comicsArray);
    }
  }, [character]);

  if (!character) {
    return <div className=""></div>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
        <div className="p-4 m-8 bg-red-600 rounded shadow-md">
          <img
            className="shadow-md"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            width={250}
            height={250}
          />
        </div>
        <h1 className="text-4xl font-bold">{character.name}</h1>
        <div className="flex flex-wrap items-start justify-center max-w-6xl ">
          <InfoCard title="Quadrinhos" items={comics} />
          <InfoCard title="Séries" items={series} />
          <InfoCard title="Aparições" items={stories} />
        </div>
      </div>
    </>
  );
};

export default Character;
