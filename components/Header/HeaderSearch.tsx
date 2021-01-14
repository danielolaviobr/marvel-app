import { IconButton } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";

interface HeaderSearchProps {
  className: string;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ className }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      router.push(`/characters${searchText ? "?search=" + searchText : ""}`);
      setSearchText("");
    },
    [searchText]
  );

  const handleValueChange = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);
  return (
    <form
      className={`flex items-center justify-center h-12 mx-8 my-4 bg-white rounded-md w-72 ${className}`}
      onSubmit={handleSubmit}>
      <input
        className="w-full h-full m-2 outline-none"
        type="text"
        name="search"
        placeholder="Pesquisar Personagem"
        value={searchText}
        onChange={handleValueChange}
      />

      <IconButton
        type="submit"
        className="mr-2"
        colorScheme="red"
        aria-label="Pesquisar Personagem"
        icon={<FiSearch />}
      />
    </form>
  );
};
export default HeaderSearch;
