import TokenImageURI from "../datasources/tokenImageURI.json";
import { WalletInfo, WalletType } from "../types/wallet";

export const formatWalletAddress = (walletInfo: WalletInfo | null): string => {
  if (!walletInfo) return "0x";

  if (walletInfo.type === WalletType.KEPLR) {
    const length = walletInfo.address.length;
    return (
      walletInfo.address.substr(0, 13) +
      "..." +
      walletInfo.address.substr(length - 6, 6)
    );
  } else if (walletInfo.type === WalletType.METAMASK) {
    const length = walletInfo.address.length;
    return (
      walletInfo.address.substr(0, 6) +
      "..." +
      walletInfo.address.substr(length - 4, 4)
    );
  }
  return walletInfo.address;
};
export const formatAddress = (address: string | null | undefined): string => {
  if (!address) return "NO ADDRESS";
  if (address.includes("cosmos")) {
    const length = address.length;
    return address.substr(0, 13) + "..." + address.substr(length - 6, 6);
  } else {
    const length = address.length;
    return address.substr(0, 6) + "..." + address.substr(length - 4, 4);
  }
};

export const getTokenLogoURL = (address: string): string => {
  const mapper = TokenImageURI as { [key: string]: string };
  const imageURL = mapper[address];

  if (imageURL) return imageURL;

  return `https://via.placeholder.com/30`;
};

export const mapChainNameToChainId = (
  chainName: string | null | undefined | number
): number => {
  if (chainName === "Harmony One") {
    return 1666700000;
  } else if (chainName === "Polygon") {
    return 80001;
  } else {
    return 0;
  }
};

export const mapChainIdToNameEVM = (
  chainName: null | undefined | number
): string => {
  if (chainName === 1666700000) {
    return "Harmony One";
  } else if (chainName === 80001) {
    return "Polygon";
  } else {
    return "Rosen";
  }
};

export const mapChainNameCosmosToChainId = (
  chainName: string | null | undefined
): number => {
  if (chainName === "Harmony One") {
    return 2;
  } else if (chainName === "Polygon") {
    return 0;
  } else {
    return 0;
  }
};

export const mapChainIDToName = (id: number | string): any => {
  const map: any = {
    0: "Polygon",
    1: "Ice Chain",
    2: "Harmony",
    99: "Rosen Chain",
  };

  return map[id];
};