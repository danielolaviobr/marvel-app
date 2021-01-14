import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import CharactersSkeletons from "../../components/CharactersSkeletons";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";

const Comics: React.FC = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { page } = router.query;

  const fetchComicsData = async (page = 1) => {
    const url = process.env.NEXT_PUBLIC_ENV_URL;
    const response = await axios.get(`${url}api/comics`, {
      params: { page },
    });
    setComics(response.data.results);
  };

  useEffect(() => {
    if (comics !== []) {
      setIsLoading(false);
    }
  }, [comics]);

  useEffect(() => {
    setComics([]);
    setIsLoading(true);
    const pageNumber = Number(page) || 1;
    setCurrentPage(pageNumber);
    fetchComicsData(pageNumber);
  }, [page]);

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
          {!isLoading && comics.length !== 0 ? (
            comics.map((comic) => (
              <Card
                key={comic.id}
                id={comic.id}
                image={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                title={comic.title}
                type={"comics"}
                description={comic.description}
              />
            ))
          ) : (
            <CharactersSkeletons quantity={20} />
          )}
        </div>
        <div className="flex items-center justify-center mt-4 mb-8">
          {Number(page) > 1 && (
            <Link href={`/comics?page=${currentPage - 1}`}>
              <div className="px-4 py-2 mr-8 text-lg font-bold text-white no-underline bg-red-600 rounded-md cursor-pointer">
                Voltar
              </div>
            </Link>
          )}
          <Link href={`/comics?page=${currentPage + 1}`}>
            <div className="px-4 py-2 text-lg font-bold text-white no-underline bg-red-600 rounded-md cursor-pointer">
              Next Page
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Comics;
