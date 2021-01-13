import React from "react";
import { Box } from "@chakra-ui/react";
import HeaderItem from "./HeaderItem";

const Header: React.FC = ({ children }) => {
  return (
    <Box className="flex flex-row items-center h-16 min-w-full pl-4 bg-red-600 shadow-md">
      <HeaderItem to="/">Home</HeaderItem>
      <HeaderItem to="/characters">Personagens</HeaderItem>
      <HeaderItem to="#">Quadrinhos</HeaderItem>
    </Box>
  );
};

export default Header;
