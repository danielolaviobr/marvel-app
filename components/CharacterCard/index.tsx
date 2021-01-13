import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface CharacterCardProps {
  image: string;
  character: string;
  description: string;
  id: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  image,
  character,
  description,
  id,
}) => {
  const router = useRouter();

  const navigateToCharacter = useCallback(
    (id) => {
      router.push(`/characters/${id}`);
    },
    [router]
  );
  return (
    <div
      className="flex flex-col items-center max-w-xl p-4 m-8 bg-gray-100 rounded-md shadow-md cursor-pointer md:items-start hover:opacity-90 min-w-40 md:flex-row"
      onClick={() => navigateToCharacter(id)}>
      <img className="rounded" src={image} alt={character} />
      <div className="flex flex-col items-center mx-4">
        <h1 className="mt-4 mb-4 text-2xl font-bold md:mt-0">
          {character || "Personagem não encontrado"}
        </h1>
        <p className="invisible text-justify md:visible ">
          {description || "Descrição não encontrada"}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
