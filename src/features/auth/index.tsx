import { createContext } from "react";
import { useAuth } from "./useAuth";

export const AuthContext = createContext<{
  token: string;
  setToken: (val: string) => void;
}>(null);

export const AuthProvider = ({ children }) => {
  const value = useAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
