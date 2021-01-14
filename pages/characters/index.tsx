import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import CharactersSkeletons from "../../components/CharactersSkeletons";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();
  const { page, search } = router.query;

  const fetchCharactersData = async (page = 1) => {
    const url = process.env.NEXT_PUBLIC_ENV_URL;
    let response: AxiosResponse<any>;
    response = await axios.get(`${url}api/characters`, {
      params: { page, search },
    });
    setCharacters(response.data.results);
    setTotalResults(response.data.total);
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
  }, [page, search]);

  if (!isLoading && characters.length === 0 && search) {
    console.log("show");
    return (
      <div className="flex items-center justify-center mt-14">
        <h2 className="text-xl font-semibold">Nenhum resultado encontrado</h2>
      </div>
    );
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
      <div className="min-h-screen pb-8 bg-gray-200">
        <div className="flex flex-wrap justify-center">
          {!isLoading && characters.length !== 0 ? (
            characters.map((character) => (
              <Card
                key={character.id}
                id={character.id}
                image={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
                title={character.name}
                type={"characters"}
                description={character.description}
              />
            ))
          ) : (
            <CharactersSkeletons quantity={20} />
          )}
        </div>
        {totalResults > 20 && (
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
        )}
      </div>
    </>
  );
};

export default Characters;
