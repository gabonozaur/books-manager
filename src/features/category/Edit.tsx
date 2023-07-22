import {
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";

const EditCategory: FC<{
  name: string;
  pending: boolean;
  setName: (val: string) => void;
  changeRequest: () => void;
  idToEdit: string;
  onCloseEdit: () => void;
}> = ({ name, setName, pending, changeRequest, idToEdit, onCloseEdit }) => {
  return (
    <Modal isOpen={idToEdit !== null} onClose={onCloseEdit}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          {idToEdit ? "Edit " : "Add "}
          Category
        </ModalHeader>
        <ModalBody>
          <form>
            <FormLabel htmlFor="password">Name</FormLabel>
            <Flex>
              <Input
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button
                ml="8px"
                colorScheme={"green"}
                isDisabled={!name}
                isLoading={pending}
                onClick={changeRequest}
              >
                {idToEdit ? "Edit" : "Add"}
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCategory;
