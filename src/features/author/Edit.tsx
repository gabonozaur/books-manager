import {
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";

const EditAuthors: FC<{
  name: string;
  pending: boolean;
  setName: (val: string) => void;
  changeRequest: () => void;
  idToEdit: string;
  onCloseEdit: () => void;
}> = ({ name, setName, pending, changeRequest, idToEdit, onCloseEdit }) => {
  return (
    <Modal isOpen={!!idToEdit} onClose={onCloseEdit}>
      <ModalOverlay />

      <ModalContent p="16px">
        <ModalBody>
          {idToEdit ? "Edit" : "Add"}
          Author
        </ModalBody>
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
              isDisabled={!name}
              isLoading={pending}
              onClick={changeRequest}
            >
              {idToEdit ? "Edit" : "Add"}
            </Button>
          </Flex>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditAuthors;
