import getEnvVariable from "@/utils/getEnvVariable";
import {
  Button,
  Flex,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useAddAuthor from "./useAdd";

const AddAuthor = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  const { name, setName, savingChanges, addRequest } = useAddAuthor();
  return (
    <>
      <Button onClick={onToggle}>Add Author</Button>
      <Modal isOpen={isOpen} onClose={onToggle}>
        <ModalOverlay />

        <ModalContent p="16px">
          <ModalBody>Add Author</ModalBody>
          <form>
            <FormLabel htmlFor="password">Pass</FormLabel>
            <Flex>
              <Input
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button isLoading={savingChanges} onClick={addRequest}>
                Add
              </Button>
            </Flex>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAuthor;
