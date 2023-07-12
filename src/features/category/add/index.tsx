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
import useAddCategory from "./useAddCategory";

const AddCategory = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  const { name, setName, savingChanges, addRequest } = useAddCategory();
  return (
    <>
      <Button onClick={onToggle}>Add Categ</Button>
      <Modal isOpen={isOpen} onClose={onToggle}>
        <ModalOverlay />

        <ModalContent p="16px">
          <ModalBody>Add Categ</ModalBody>
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

export default AddCategory;
