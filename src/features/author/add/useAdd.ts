import { apiClient } from "@/utils/apiClient";
import { useState } from "react";

const useAddAuthor = () => {
  const [savingChanges, setSavingChanges] = useState(false);
  const [name, setName] = useState("");

  const addRequest = async () => {
    setSavingChanges(true);
    try {
      await apiClient.post("/api/author", { name });
    } catch (e) {
      setSavingChanges(false);
    }
    setSavingChanges(false);
  };

  return { addRequest, name, setName, savingChanges };
};

export default useAddAuthor;
