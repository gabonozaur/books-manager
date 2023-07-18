import { LabelAndValue } from "@/app/commonComponents/multiSelect";
import { AppContext } from "@/pages/_app";
import { apiClient } from "@/utils/apiClient";
import { NameWithId } from "@/utils/models";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AddEditBookDTO } from "./models";

const initialValues = { authorId: "", name: "", categories: [] };

const useAddEditBook = () => {
  const { bookToUpdate, setBookToUpdate } = useContext(AppContext);
  const [fetchignAuthors, setFetchingAuthors] = useState(false);
  const [authorOptions, setAuthorOptions] = useState<NameWithId[]>([]);
  const [fetchignCategories, setFetchingCategories] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<LabelAndValue[]>([]);
  const [fetchingBookData, setFetchingBookData] = useState(false);
  const [savingChanges, setSavingChanges] = useState(false);

  const fetchAuthors = async () => {
    setFetchingAuthors(true);

    try {
      const { data } = await apiClient.get("/api/author/all");
      setAuthorOptions(data);
    } catch (e) {}
    setFetchingAuthors(false);
  };

  const fetchCategories = async () => {
    setFetchingCategories(true);

    try {
      const { data } = (await apiClient.get("/api/category/all")) as {
        data: NameWithId[];
      };

      setCategoryOptions(
        data.map((val) => ({ label: val.name, value: val.id }))
      );
    } catch (e) {}
    setFetchingCategories(false);
  };

  const saveRequest = async (data: AddEditBookDTO) => {
    try {
      setSavingChanges(true);
      await apiClient.post("/api/book", data);
      window.location.reload();
    } catch (e) {
      console.log("catch err", e);
    }
    setSavingChanges(false);
  };

  const updateDataRequest = async (data: AddEditBookDTO) => {
    try {
      console.log("uppd ata is", data.categories);
      setSavingChanges(true);
      await apiClient.put(`/api/book/${bookToUpdate}`, data);
      window.location.reload();
    } catch (e) {
      console.log("catch err", e);
    }
    setSavingChanges(false);
  };

  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    touched,
    handleReset,
    setValues,
  } = useFormik<AddEditBookDTO>({
    initialValues,
    onSubmit: bookToUpdate?.length ? updateDataRequest : saveRequest,
  });

  const fetchInitialBookData = async () => {
    setFetchingBookData(true);
    try {
      const { data } = await apiClient.get(`/api/book/${bookToUpdate}`);
      setValues({
        ...data,
        categories: data.categories.map((categ) => categ.id),
      });
    } catch (e) {}
    setFetchingBookData(false);
  };

  useEffect(() => {
    if (bookToUpdate?.length) {
      fetchInitialBookData();
    }
    if (bookToUpdate !== null) {
      fetchAuthors();
      fetchCategories();
    }
  }, [bookToUpdate]);

  return {
    fetchignAuthors,
    authorOptions,
    values,
    handleChange,
    errors,
    handleSubmit,
    touched,
    handleReset,
    savingChanges,
    fetchignCategories,
    categoryOptions,
    bookToUpdate,
    setBookToUpdate,
    fetchingBookData,
    setValues,
  };
};

export default useAddEditBook;
