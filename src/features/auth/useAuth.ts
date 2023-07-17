import { apiClient } from "@/utils/apiClient";
import { eraseCookie, setCookie } from "@/utils/handleCookies";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { JWTDTO, UseAuth } from "./models";

export const useAuth = (initialToken: string): UseAuth => {
  const [decodedToken, setDecodedToken] = useState<JWTDTO>(
    initialToken ? (jwt.decode(initialToken) as JWTDTO) : null
  );

  return { decodedToken, setDecodedToken };
};
