import axios from "axios";
import { useState, useContext, useMemo } from "react";
import { AuthContext, AuthProvider } from "..";
import { LoginDTO } from "../models";

const useLoginAuth = () => {
  const [data, setData] = useState<Partial<LoginDTO>>({});
  const [pendingAuth, setPendingAuth] = useState(false);

  const { setToken } = useContext(AuthContext);
  const handleInputChange = (newPartial: Partial<LoginDTO>) => {
    setData((prev) => ({ ...prev, ...newPartial }));
  };

  const loginRequest = async () => {
    try {
      setPendingAuth(true);
      const res = await axios.post("/api/auth/login", data);
      setToken(res.data.token);
    } catch (e) {
      console.log("catch err", e);
    }
    setPendingAuth(false);
  };

  return { handleInputChange, data, loginRequest, pendingAuth };
};

export default useLoginAuth;
