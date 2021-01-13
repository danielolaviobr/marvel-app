import React, { useCallback, useEffect, useState } from "react";
import api from "../_api";
import CharacterCard from "../../components/CharacterCard";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import CharactersSkeletons from "../../components/CharactersSkeletons";
// import { Button, Link } from "@chakra-ui/react";
import Link from "next/link";
import characters from "../api/characters";

// export async function getStaticProps({ query: { page } }) {
//   console.log(page);
//   const response = await api.get("characters");
//   return {
//     props: { data: response.data },
//   };
// }

// interface CharactersProps {
//   data: object;
// }

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { page } = router.query;

  const fetchCharactersData = async (page = 1) => {
    console.log(currentPage);
    const response = await api.get("characters", {
      params: { page },
    });
    setCharacters(response.data.results);
  };

  useEffect(() => {
    if (characters !== []) {
      setIsLoading(false);
    }
  }, [characters]);

  useEffect(() => {
    setCharacters([]);
    setIsLoading(true);
    const pageNumber = Number(page) || 1;
    setCurrentPage(pageNumber);
    fetchCharactersData(pageNumber);
    console.log(characters);
  }, [page]);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {!isLoading ? (
          characters.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              image={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
              character={character.name}
              description={character.description}
            />
          ))
        ) : (
          <CharactersSkeletons quantity={20} />
        )}
      </div>
      <div className="flex items-center justify-center mt-4 mb-8">
        {Number(page) > 1 && (
          <Link href={`/characters?page=${currentPage - 1}`}>
            <div className="px-4 py-2 mr-8 text-lg font-bold text-white no-underline bg-red-600 rounded-md cursor-pointer">
              Voltar
            </div>
          </Link>
        )}
        <Link href={`/characters?page=${currentPage + 1}`}>
          <div className="px-4 py-2 text-lg font-bold text-white no-underline bg-red-600 rounded-md cursor-pointer">
            Next Page
          </div>
        </Link>
      </div>
    </>
  );
};

export default Characters;
