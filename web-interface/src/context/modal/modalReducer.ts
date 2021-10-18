import { ModalContextState } from "./modalContext";

export enum ModalActionType {
  SET_ACCOUNT_MODAL_STATE = "SET_ACCOUNT_MODAL_STATE",
  SET_SELECT_TOKEN_MODAL_STATE = "SET_SELECT_TOKEN_MODAL_STATE",
  SET_SELECT_FROM_CHAIN_MODAL_STATE = "SET_SELECT_FROM_CHAIN_MODAL_STATE",
  SET_SELECT_TO_CHAIN_MODAL_STATE = "SET_SELECT_TO_CHAIN_MODAL_STATE",
  SET_CONNECT_WALLET_MODAL_STATE = "SET_CONNECT_WALLET_MODAL_STATE",
}

export type ModalContextAction =
  | {
      type: ModalActionType.SET_ACCOUNT_MODAL_STATE;
      payload: boolean;
    }
  | {
      type: ModalActionType.SET_SELECT_TOKEN_MODAL_STATE;
      payload: boolean;
    }
  | {
      type: ModalActionType.SET_SELECT_FROM_CHAIN_MODAL_STATE;
      payload: boolean;
    }
  | {
      type: ModalActionType.SET_SELECT_TO_CHAIN_MODAL_STATE;
      payload: boolean;
    }
  | {
      type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE;
      payload: boolean;
    };

export const modalContextReducer = (
  state: ModalContextState,
  action: ModalContextAction
): ModalContextState => {
  switch (action.type) {
    case ModalActionType.SET_ACCOUNT_MODAL_STATE: {
      return { ...state, isAccountModalOpen: action.payload };
    }
    case ModalActionType.SET_SELECT_TOKEN_MODAL_STATE: {
      return { ...state, isSelectTokenModalOpen: action.payload };
    }
    case ModalActionType.SET_SELECT_FROM_CHAIN_MODAL_STATE: {
      return { ...state, isSelectFromChainModalOpen: action.payload };
    }
    case ModalActionType.SET_SELECT_TO_CHAIN_MODAL_STATE: {
      return { ...state, isSelectToChainModalOpen: action.payload };
    }
    case ModalActionType.SET_CONNECT_WALLET_MODAL_STATE: {
      return { ...state, isConnectWalletModalOpen: action.payload };
    }
  }
};
