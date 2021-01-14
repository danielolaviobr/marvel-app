import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface CardProps {
  image: string;
  title: string;
  description: string;
  id: number;
  type: "comics" | "characters";
}

const Card: React.FC<CardProps> = ({ image, title, description, id, type }) => {
  const router = useRouter();

  const navigateTo = useCallback(
    (id) => {
      router.push(`/${type}/${id}`);
    },
    [router]
  );
  return (
    <div
      className="flex flex-col items-center p-4 m-8 bg-gray-100 rounded-md shadow-md cursor-pointer max-w-50 md:max-w-xl md:items-start hover:opacity-90 md:min-w-40 md:flex-row min-w-50"
      onClick={() => navigateTo(id)}>
      <img className="mx-4 mt-4 rounded" src={image} alt={title} />
      <div className="flex flex-col items-center mx-4">
        <h1 className="mt-4 mb-4 text-2xl font-bold text-center md:mt-0 md:self-start">
          {title || "Personagem não encontrado"}
        </h1>
        <p className="invisible hidden text-justify md:visible md:flex">
          {description || "Descrição não encontrada"}
        </p>
      </div>
    </div>
  );
};

export default Card;
