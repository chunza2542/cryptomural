export enum WalletType {
  METAMASK = "metamask",
  KEPLR = "keplr",
}

export interface WalletInfo {
  address: string;
  type: WalletType;
}
