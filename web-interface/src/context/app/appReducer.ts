import { AppContextState } from "./appContext";

export enum AppActionType {
  SET_IS_MINT_SUCCESS = "SET_IS_MINT_SUCCESS",
  SET_IS_OPEN_MY_COLLECTION_PAGE = "SET_IS_OPEN_MY_COLLECTION_PAGE",
}

export type AppAction =
  | {
      type: AppActionType.SET_IS_MINT_SUCCESS;
      payload: boolean;
    }
  | {
      type: AppActionType.SET_IS_OPEN_MY_COLLECTION_PAGE;
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
    case AppActionType.SET_IS_OPEN_MY_COLLECTION_PAGE: {
      return { ...state, isOpenMyCollectionPage: action.payload };
    }
  }
};
