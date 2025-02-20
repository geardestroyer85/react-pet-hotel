import { useContext } from "react"
import { AppContext } from "./AppContextType"

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext should be used inside the AppProvider");
  }

  return context;
}