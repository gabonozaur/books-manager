import { createContext } from "react";
import { UseAuth } from "./models";

export const AuthContext = createContext<UseAuth>(null);
