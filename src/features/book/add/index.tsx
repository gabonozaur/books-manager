import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import useAddBook from "./useAddBook";

const AddBook = () => {
  const {
    isOpen,
    onToggle,
    authorOptions,
    values,
    handleChange,
    handleSubmit,
    savingChanges,
    handleReset,
    categoryOptions,
  } = useAddBook();
  return (
    <>
      <Button onClick={onToggle}>Add Book</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onToggle();
          handleReset(null);
        }}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalBody>srman</ModalBody>
          <form>
            <FormLabel htmlFor="name">Book Name</FormLabel>
            <Input id="name" value={values.name} onChange={handleChange} />

            <FormLabel htmlFor="category">categ</FormLabel>
            <Select
              value={values.category}
              onChange={handleChange}
              id="category"
            >
              <option hidden disabled value="">
                Select Categ
              </option>
              {categoryOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>

            <FormLabel htmlFor="authorId">Author</FormLabel>
            <Select
              value={values.authorId}
              onChange={handleChange}
              id="authorId"
            >
              <option hidden disabled value="">
                Select Author
              </option>
              {authorOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
            <Button
              isLoading={savingChanges}
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBook;
