import { createContext } from "react";
import { useAuth } from "./useAuth";

export const AuthContext = createContext<{
  token: string;
  setToken: (val: string) => void;
}>(null);
