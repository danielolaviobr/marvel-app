import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose(): void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleValueChange = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      router.push(`/characters${searchText ? "?search=" + searchText : ""}`);
      setSearchText("");
    },
    [searchText]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pesquisar Personagem</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Input
              className="w-full h-full m-2 outline-none"
              type="text"
              name="search"
              placeholder="Pesquisar"
              value={searchText}
              onChange={handleValueChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="red" mr={3} onClick={onClose}>
              Pesquisar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
