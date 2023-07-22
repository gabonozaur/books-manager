import MultiSelect from "@/app/commonComponents/multiSelect";
import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  ModalHeader,
} from "@chakra-ui/react";
import useAddEditBook from "./useAddEditBook";

const AddEditBook = () => {
  const {
    bookToUpdate,
    setBookToUpdate,
    authorOptions,
    values,
    handleChange,
    handleSubmit,
    savingChanges,
    handleReset,
    categoryOptions,
    setValues,
  } = useAddEditBook();
  return (
    <>
      <Modal
        isOpen={typeof bookToUpdate === "string"}
        onClose={() => {
          setBookToUpdate(null);
          handleReset(null);
        }}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{bookToUpdate ? "Update" : "Add"} Book</ModalHeader>
          <ModalBody>
            <form>
              <FormLabel htmlFor="name">Book Name</FormLabel>
              <Input
                id="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Add Name"
              />

              <FormLabel htmlFor="category">categ</FormLabel>
              <MultiSelect
                values={values.categories}
                onChange={(val) => {
                  setValues({ ...values, categories: val });
                }}
                id="categories"
                placeholder="Select Categ"
                options={categoryOptions}
              />

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
                mt="8px"
                colorScheme={"green"}
                isLoading={savingChanges}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEditBook;
