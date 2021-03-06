import React from "react";
import { AppAction, appReducer } from "./appReducer";

export interface AppContextState {
  isMintSuccess: boolean;
  isOpenMyCollectionPage: boolean;
  imageURL: string;
  tokenId: string;
}
const initialState: AppContextState = {
  isMintSuccess: false,
  isOpenMyCollectionPage: false,
  imageURL: "",
  tokenId: "",
};

interface AppContextProviderProps {
  children: React.ReactNode;
}
const AppContext = React.createContext<
  { state: AppContextState; dispatch: (action: AppAction) => void } | undefined
>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationContext must be used within a ApplicationContextProvider"
    );
  }
  return context;
};
