import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { JWTDTO, UseAuth } from "./models";

export const useAuth = (): UseAuth => {
  const [decodedToken, setDecodedToken] = useState<JWTDTO>();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (token) {
      setDecodedToken(jwt.decode(token) as JWTDTO);
    } else {
      if (decodedToken) {
        setDecodedToken(null);
      }
    }
  }, [token]);

  return { token, setToken, decodedToken };
};
