import React, { useCallback } from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import HeaderItem from "./HeaderItem";
import HeaderSearch from "./HeaderSearch";
import { useRouter } from "next/router";
import SearchModal from "./SearchModal";

const Header: React.FC = () => {
  const [isLargerThanPhone] = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleHome = useCallback(() => {
    router.push("/");
  }, []);
  const handleCharacters = useCallback(() => {
    router.push("/characters");
  }, []);
  const handleComics = useCallback(() => {
    router.push("/comics");
  }, []);

  return (
    <Box className="flex flex-row items-center h-16 min-w-full pl-4 bg-red-600 shadow-md">
      {isLargerThanPhone ? (
        <>
          <HeaderItem to="/">Home</HeaderItem>
          <HeaderItem to="/characters">Personagens</HeaderItem>
          <HeaderItem to="/comics">Quadrinhos</HeaderItem>
          <HeaderSearch className="ml-auto" />
        </>
      ) : (
        <>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiMenu />}>
              Menu
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleHome}>Home</MenuItem>
              <MenuItem onClick={handleCharacters}>Personagens</MenuItem>
              <MenuItem onClick={handleComics}>Quadrinhos</MenuItem>
              <MenuItem onClick={onOpen}>Pesquisar</MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
