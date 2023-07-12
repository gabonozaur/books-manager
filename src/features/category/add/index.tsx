import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const AddCategory = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  return (
    <>
      <Button onClick={onToggle}>Add Categ</Button>
      <Modal isOpen={isOpen} onClose={onToggle}>
        <ModalOverlay />

        <ModalContent>
          <ModalBody>srman</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCategory;
