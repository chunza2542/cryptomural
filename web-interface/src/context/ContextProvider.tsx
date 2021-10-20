import React from "react";
import { AppContextProvider } from "./app/appContext";

interface ContextProviderProps {
  children: React.ReactNode;
}
const ContextProvider = ({ children }: ContextProviderProps) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};

export default ContextProvider;
