import { createContext } from "react";
import { UseAuth } from "./models";
import { useAuth } from "./useAuth";

export const AuthContext = createContext<UseAuth>(null);
