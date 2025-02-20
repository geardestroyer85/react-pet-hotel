import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../api/types";

export interface AppContextProps {
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);