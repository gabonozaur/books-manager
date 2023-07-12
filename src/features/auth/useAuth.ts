import { apiClient } from "@/utils/apiClient";
import { eraseCookie, setCookie } from "@/utils/handleCookies";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { JWTDTO, UseAuth } from "./models";

export const useAuth = (initialToken: string): UseAuth => {
  const [decodedToken, setDecodedToken] = useState<JWTDTO>();
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    if (token) {
      setDecodedToken(jwt.decode(token) as JWTDTO);
    } else {
      if (decodedToken) {
        setDecodedToken(null);
      }
    }

    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    if (token) {
      setCookie("Access-Token", token);
    } else {
      eraseCookie("Access-Token");
    }
  }, [token]);

  return { token, setToken, decodedToken };
};
