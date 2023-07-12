import { apiClient } from "@/utils/apiClient";
import { NameWithId } from "@/utils/models";
import { useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AddBookDTO } from "./models";

const useAddBook = () => {
  const [fetchignAuthors, setFetchingAuthors] = useState(false);
  const [authorOptions, setAuthorOptions] = useState<NameWithId[]>([]);
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  const [savingChanges, setSavingChanges] = useState(false);
  const fetchAuthors = async () => {
    setFetchingAuthors(true);

    try {
      const { data } = await apiClient.get("/api/author/all");
      setAuthorOptions(data);
    } catch (e) {}
    setFetchingAuthors(false);
  };

  const saveRequest = async (data: AddBookDTO) => {
    try {
      setSavingChanges(true);
      await apiClient.post("/api/book", data);
    } catch (e) {
      console.log("catch err", e);
    }
    setSavingChanges(false);
  };

  const { values, handleChange, errors, handleSubmit, touched, handleReset } =
    useFormik<AddBookDTO>({
      initialValues: { authorId: "", name: "" },
      onSubmit: saveRequest,
    });

  useEffect(() => {
    if (isOpen) {
      fetchAuthors();
    }
  }, [isOpen]);

  return {
    fetchignAuthors,
    authorOptions,
    isOpen,
    onToggle,
    values,
    handleChange,
    errors,
    handleSubmit,
    touched,
    handleReset,
    savingChanges,
  };
};

export default useAddBook;
