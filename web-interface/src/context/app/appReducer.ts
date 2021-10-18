import { SelectedChain, SelectedToken } from "../../types/transferWidget";
import { WalletInfo } from "../../types/wallet";
import { AppContextState } from "./appContext";

export enum AppActionType {
  SET_WALLET_INFO = "SET_WALLET_INFO",
  SET_FROM_CHAIN = "SET_FROM_CHAIN",
  SET_TO_CHAIN = "SET_TO_CHAIN",
  SET_TOKEN = "SET_TOKEN",
}

export type AppAction =
  | {
      type: AppActionType.SET_WALLET_INFO;
      payload: WalletInfo | null;
    }
  | {
      type: AppActionType.SET_FROM_CHAIN;
      payload: SelectedChain | null;
    }
  | {
      type: AppActionType.SET_TO_CHAIN;
      payload: SelectedChain | null;
    }
  | {
      type: AppActionType.SET_TOKEN;
      payload: SelectedToken | null;
    };

export const appReducer = (
  state: AppContextState,
  action: AppAction
): AppContextState => {
  switch (action.type) {
    case AppActionType.SET_WALLET_INFO: {
      return { ...state, walletInfo: action.payload };
    }
    case AppActionType.SET_FROM_CHAIN: {
      return { ...state, selectedFromChain: action.payload };
    }
    case AppActionType.SET_TO_CHAIN: {
      return { ...state, selectedToChain: action.payload };
    }
    case AppActionType.SET_TOKEN: {
      return { ...state, selectedToken: action.payload };
    }
  }
};
