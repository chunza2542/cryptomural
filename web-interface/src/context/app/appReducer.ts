import { SelectedChain, SelectedToken } from "../../types/transferWidget";
import { WalletInfo } from "../../types/wallet";
import { AppContextState } from "./appContext";

export enum AppActionType {
  SET_IS_MINT_SUCCESS = "SET_IS_MINT_SUCCESS",
}

export type AppAction = {
  type: AppActionType.SET_IS_MINT_SUCCESS;
  payload: boolean;
};

export const appReducer = (
  state: AppContextState,
  action: AppAction
): AppContextState => {
  switch (action.type) {
    case AppActionType.SET_IS_MINT_SUCCESS: {
      return { ...state, isMintSuccess: action.payload };
    }
  }
};
