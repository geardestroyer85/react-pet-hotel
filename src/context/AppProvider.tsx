import { ReactNode, useState } from "react"
import { User } from "../api/types"
import { AppContext } from "./AppContextType";
import { USERS } from "../api/mockData";

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [userData, setUserData] = useState<User | null>(null);
  

  return (
    <AppContext.Provider value={{userData, setUserData}}>
      {children}
    </AppContext.Provider>
  )
}