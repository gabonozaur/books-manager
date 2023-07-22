import { apiClient } from "@/utils/apiClient";
import { NameWithId } from "@/utils/models";
import { useState } from "react";

const useAuthors = () => {
  const [idToEdit, setIdToEdit] = useState<string>(null);
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);

  const onOpenEdit = (props: NameWithId) => {
    setIdToEdit(props.id);
    setName(props.name);
  };

  const onCloseEdit = () => {
    if (!pending) {
      setIdToEdit(null);
    }
  };

  const changeRequest = async () => {
    setPending(true);

    try {
      await (idToEdit
        ? apiClient.put(`/api/author/${idToEdit}`, { name })
        : apiClient.post("/api/author", { name }));
      // onCloseEdit();
      window.location.reload();
    } catch (e) {}
    setPending(false);
  };

  return {
    changeRequest,
    onOpenEdit,
    onCloseEdit,
    name,
    setName,
    pending,
    idToEdit,
  };
};

export default useAuthors;
