import { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { SigningStargateClient, coins } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { useWeb3React } from "@web3-react/core";
import Modal from "react-modal";
import styled from "styled-components";
import { useAppContext } from "../context/app/appContext";
import { AppActionType } from "../context/app/appReducer";
import { useModalContext } from "../context/modal/modalContext";
import { ModalActionType } from "../context/modal/modalReducer";
import { WalletType } from "../types/wallet";
import { colors, darkBlueTemplate, withOpacity } from "../utils/styled";
import useInactiveListener from "../hooks/useInactiveListener";
import { injected } from "../constants/connectors";
import { MsgBridgeRequest } from "../protos/bridge";
import { notification } from "antd";

const ModalStyle = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 99999,
  },
  content: {
    border: 0,
    padding: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "16px",
    marginRight: "calc(-50% + 30px)",
    transform: "translate(-50%, -50%)",
    background: "white",
  },
};
const Header = styled.h1`
  margin: 0;
  color: ${colors.darkBlue};
  font-weight: 500;
  padding: 0 12px;
  padding-top: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & span:nth-child(1) {
    font-size: 0.8rem;
  }
  & span:nth-child(2) {
    font-size: 0rem;
    cursor: pointer;
  }
`;
const Container = styled.div`
  width: 350px;
  padding: 15px;
`;
const WalletItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.3s;
  padding: 10px 15px;
  border-radius: 12px;
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  margin-bottom: 7px;

  &:hover {
    background: ${colors.lightBlue};
  }

  & > img {
    width: 28px;
    height: 28px;
    margin-right: 15px;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    & h5 {
      margin: 0;
      font-weight: normal;
      font-size: 1rem;
      color: ${colors.darkBlue};
    }
  }
`;

declare global {
  interface Window {
    keplr: any;
    getOfflineSigner: any;
  }
}

const COSMOS_CHAIN_ID = "x:0";
const ConnectWalletModal = () => {
  const modalContext = useModalContext();
  const appContext = useAppContext();
  const { activate, error } = useWeb3React();
  const [api, contextHolder] = notification.useNotification();

  const connectToKepler = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
      modalContext.dispatch({
        type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE,
        payload: false,
      });
      api.warning({
        message: `Keplr Extension Not Found`,
        description: `Plese install Keplr extension`,
        placement: "bottomRight",
      });
      return;
    }

    if (window.keplr.experimentalSuggestChain) {
      try {
        await window.keplr.experimentalSuggestChain({
          chainId: COSMOS_CHAIN_ID,
          chainName: "ICE Chain",
          rpc: "http://165.232.162.158:26657",
          rest: "http://165.232.162.158:1317",
          stakeCurrency: {
            coinDenom: "ICE",
            coinMinimalDenom: "token",
            coinDecimals: 0,
          },
          bip44: {
            coinType: 118,
          },
          // Bech32 configuration to show the address to user.
          // This field is the interface of
          // {
          //   bech32PrefixAccAddr: string;
          //   bech32PrefixAccPub: string;
          //   bech32PrefixValAddr: string;
          //   bech32PrefixValPub: string;
          //   bech32PrefixConsAddr: string;
          //   bech32PrefixConsPub: string;
          // }
          bech32Config: {
            bech32PrefixAccAddr: "cosmos",
            bech32PrefixAccPub: "cosmospub",
            bech32PrefixValAddr: "cosmosvaloper",
            bech32PrefixValPub: "cosmosvaloperpub",
            bech32PrefixConsAddr: "cosmosvalcons",
            bech32PrefixConsPub: "cosmosvalconspub",
          },
          // List of all coin/tokens used in this chain.
          currencies: [
            {
              // Coin denomination to be displayed to the user.
              coinDenom: "ICE",
              // Actual denom (i.e. uatom, uscrt) used by the blockchain.
              coinMinimalDenom: "token",
              // # of decimal points to convert minimal denomination to user-facing denomination.
              coinDecimals: 0,
              // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
              // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
              // coinGeckoId: ""
            },
          ],
          // List of coin/tokens used as a fee token in this chain.
          feeCurrencies: [
            {
              // Coin denomination to be displayed to the user.
              coinDenom: "ICE",
              // Actual denom (i.e. uatom, uscrt) used by the blockchain.
              coinMinimalDenom: "token",
              // # of decimal points to convert minimal denomination to user-facing denomination.
              coinDecimals: 0,
              // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
              // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
              // coinGeckoId: ""
            },
          ],
          coinType: 118,
          gasPriceStep: {
            low: 0,
            average: 0,
            high: 0,
          },
        });
      } catch (e) {
        console.error("Failed to suggest the chain", e);
      }
    } else {
      console.error("Please use the recent version of keplr extension");
    }

    // enable user wallet
    await window.keplr.enable(COSMOS_CHAIN_ID);
    const offlineSigner = window.getOfflineSigner(COSMOS_CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();

    if (accounts.length > 0) {
      const account = accounts[0];

      appContext.dispatch({
        type: AppActionType.SET_WALLET_INFO,
        payload: {
          address: account.address,
          type: WalletType.KEPLR,
        },
      });
      modalContext.dispatch({
        type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE,
        payload: false,
      });
    }

    // const a = await client.sendTokens(
    //   accounts[0].address,
    //   "cosmos1qqae7949a97krudpg2nq299rlp449z0qc2989e",
    //   coins(10, "token"),
    //   fee
    // );
    // console.log({ a });
  };

  useEffect(() => {
    if (error && error.name === "UnsupportedChainIdError") {
      api.error({
        message: `Network Unnsupported`,
        description: `Please change the network to Polygon Mumbai Testnet, Harmony One Testnet, or ICE Chain Mainnet`,
        placement: "bottomRight",
      });
    }
  }, [error]);

  const connectToMetamask = async () => {
    activate(injected);
    modalContext.dispatch({
      type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE,
      payload: false,
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        style={ModalStyle}
        isOpen={modalContext.state.isConnectWalletModalOpen}
        contentLabel="Select Chain"
      >
        <Header>
          <span>Connect to a wallet</span>
          <span
            onClick={() => {
              modalContext.dispatch({
                type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE,
                payload: false,
              });
            }}
          >
            <CloseOutlined />
          </span>
        </Header>
        <Container>
          <WalletItem onClick={connectToMetamask}>
            <div>
              <h5>MetaMask</h5>
            </div>
            <img
              src="https://app.uniswap.org/static/media/metamask.02e3ec27.png"
              alt="MetaMask"
            />
          </WalletItem>
          <WalletItem onClick={connectToKepler}>
            <div>
              <h5>Keplr</h5>
            </div>
            <img src="https://wallet.keplr.app/assets/icon.svg" alt="Keplr" />
          </WalletItem>
          <WalletItem
            style={{ cursor: "not-allowed", background: colors.lightBlue }}
          >
            <div>
              <h5>WalletConnect</h5>
            </div>
            <img
              src="https://app.uniswap.org/static/media/walletConnectIcon.304e3277.svg"
              alt="WalletConnect"
            />
          </WalletItem>
          <WalletItem
            style={{ cursor: "not-allowed", background: colors.lightBlue }}
          >
            <div>
              <h5>Coinbase Wallet</h5>
            </div>
            <img
              src="https://app.uniswap.org/static/media/coinbaseWalletIcon.a3a7d7fd.svg"
              alt="Coinbase Wallet"
            />
          </WalletItem>
        </Container>
      </Modal>
    </>
  );
};

export default ConnectWalletModal;
