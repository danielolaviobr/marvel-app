import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import api from "../_api";

interface CharacterProps {
  id: number;
}

const Character: React.FC<CharacterProps> = () => {
  const [character, setCharacter] = useState<any>();
  const router = useRouter();

  const fetchCharacterData = useCallback(async (id: string) => {
    console.log(id);
    const response = await api.get(`characters/${id}`);

    setCharacter(response.data.results[0]);
  }, []);

  useEffect(() => {
    const { id } = router.query;
    id && fetchCharacterData(id as string);
  }, [router]);
  if (!character) {
    return <div className=""></div>;
  }
  return (
    <div className="">
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        width={250}
        height={250}
      />
    </div>
  );
};

export default Character;
