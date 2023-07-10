import { useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState("");

  return { token, setToken };
};
