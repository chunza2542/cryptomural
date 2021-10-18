import styled, { keyframes } from "styled-components";
import Web3 from "web3";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useModalContext } from "../context/modal/modalContext";
import { ModalActionType } from "../context/modal/modalReducer";
import { AppActionType } from "../context/app/appReducer";
import { WalletType } from "../types/wallet";
import { TransactionHistory, EventTxType } from "../types/tx";
import { colors } from "../utils/styled";
import { SigningCosmosClient } from "@cosmjs/launchpad";
import { useEffect } from "react";
import { useAppContext } from "../context/app/appContext";
import {
  formatWalletAddress,
  mapChainIDToName,
  mapChainNameToChainId,
  mapChainIdToNameEVM,
} from "../utils/helper";
import { POLY_WSS, HARMONY_WSS, ROSEN_WSS, ICE_WSS } from "../constants/Rpc";
import { BRIDGE } from "../constants/Contract";
import { ICE } from "../constants/Token";
import { Button } from "../common/buttons";
import { notification } from "antd";

const web3 = new Web3();

const rosenProvider = new WebSocket(ROSEN_WSS);
const iceProvider = new WebSocket(ICE_WSS);
const polyProvider = new ethers.providers.WebSocketProvider(POLY_WSS);
const harmonyProvider = new ethers.providers.WebSocketProvider(HARMONY_WSS);

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 25px;
  background: white;
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 9999;

  box-shadow: 0px 4px 70px 0px rgba(0, 0, 0, 0.07);
  -webkit-box-shadow: 0px 4px 70px 0px rgba(0, 0, 0, 0.07);
  -moz-box-shadow: 0px 4px 70px 0px rgba(0, 0, 0, 0.07);
`;

const Logo = styled.h1`
  color: white;
  margin: 0;
  font-weight: 600 !important;
  font-size: 1.2rem;
  color: ${colors.darkBlue};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > span {
    font-size: 1.4rem;
    margin-right: 7px;
  }
`;

const CurrentNetwork = styled.div`
  display: flex;
  align-items: center;

  & img {
    border-radius: 50%;
    width: 22px;
    height: 22px;
    margin-right: 5px;
  }
`;

const blinking = keyframes`
  0% {
    background: #F95738;
  }

  50% {
    background: #ee964b;
  }
  
  100% {
    background: #F95738;
  }
`;
const Address = styled.div`
  background: ${colors.lightBlue};
  border: 1px solid transparent;
  border-radius: 7px;
  padding: 3px 7px;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${colors.lightBlue};
  }

  & > span:nth-child(2) {
    text-align: center;
    background: ${colors.blue};
    color: white;
    width: 22px;
    height: 22px;
    display: inline-block;
    border-radius: 50%;
    animation: ${blinking} 1s linear infinite;
    margin-left: 7px;
  }
`;

const Menubar = styled.div`
  display: flex;
  align-items: center;
`;

// function convert(msg) {
//   const prefix = 'bridging_mint.'
//   let result = {}
//   for (const [key, value] of Object.entries(
//     JSON.parse(msg.data).result.events
//   )) {
//     if (key.startsWith(prefix)) {
//       const newKey = key.replace(prefix, '')
//       result[newKey] = value[0]
//     }
//   }
//   return result
// }

const Navbar = () => {
  const { account, library, chainId } = useWeb3React();
  const modalContext = useModalContext();
  const appContext = useAppContext();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!account) return;
    appContext.dispatch({
      type: AppActionType.SET_WALLET_INFO,
      payload: {
        address: account,
        type: WalletType.METAMASK,
      },
    });
  }, [account, library]);

  useEffect(() => {
    iceProvider.addEventListener("open", function (event) {
      rosenProvider.send(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "subscribe",
          id: 0,
          params: {
            query: "tm.event='Tx' AND bridging_mint.event_name='bridging_mint'",
          },
        })
      );
    });

    function convert(msg: any) {
      const prefix = "bridging_mint.";
      let result: any = {};
      for (const data of Object.entries(JSON.parse(msg.data).result.events)) {
        const _data = data as any;
        if (_data[0].startsWith(prefix)) {
          const newKey: any = _data[0].replace(prefix, "");
          result[newKey] = _data[1][0];
        }
      }
      return result;
    }

    iceProvider.addEventListener("message", function (event) {
      const convertEvent = convert(event.data);
      const prevTxHistory: string | null =
        window.localStorage.getItem("txHistory") ?? JSON.stringify("[]");
      const currentTxHistory: TransactionHistory[] | any =
        JSON.parse(prevTxHistory);
      const currentTx: TransactionHistory = {
        UID: convertEvent.UID,
        event_name: convertEvent.event_name,
        reciever: convertEvent.reciever,
        amount: Number(convertEvent.amount),
        fee: 0,
        src_chain_id: convertEvent.src_chain_id,
        dest_chain_id: convertEvent.dest_chain_id,
        token_id: convertEvent.token_id,
        contract: convertEvent.contract,
        origin_chain: 1,
      };

      api.info({
        message: `Transaction submitted`,
        description: `Transfering ${
          convertEvent.amount
        } ICE to ${mapChainIDToName(convertEvent.dest_chain_id)}`,
        placement: "bottomRight",
      });

      // const fromChain =

      // currentTxHistory.push(currentTx);
      // window.localStorage.setItem(
      //   "txHistory",
      //   JSON.stringify(currentTxHistory)
      // );
    });

    rosenProvider.addEventListener("open", function (event) {
      rosenProvider.send(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "subscribe",
          id: 0,
          params: {
            query: "tm.event='Tx' AND bridging_mint.event_name='bridging_mint'",
          },
        })
      );
    });

    rosenProvider.addEventListener("message", function (event) {
      const convertEvent = convert(event.data);
      const prevTxHistory: string | null =
        window.localStorage.getItem("txHistory") ?? JSON.stringify("[]");
      const currentTxHistory: TransactionHistory[] | any =
        JSON.parse(prevTxHistory);
      const currentTx: TransactionHistory = {
        UID: convertEvent.UID,
        event_name: convertEvent.event_name,
        reciever: convertEvent.reciever,
        amount: Number(convertEvent.amount),
        fee: 0,
        src_chain_id: convertEvent.src_chain_id,
        dest_chain_id: convertEvent.dest_chain_id,
        token_id: convertEvent.token_id,
        contract: convertEvent.contract,
        origin_chain: 99,
      };
      api.info({
        message: `Transaction processing`,
        description: `Processing transaction on rosen chain`,
        placement: "bottomRight",
      });
      // currentTxHistory.push(currentTx);
      // window.localStorage.setItem(
      //   "txHistory",
      //   JSON.stringify(currentTxHistory)
      // );
    });

    polyProvider.on(
      {
        address: BRIDGE[80001],
      },
      async (result) => {
        const { data, topics } = result;
        const eventName = topics[0];

        if (eventName === EventTxType.SENT_TO_CHAIN) {
          const decodeData = ethers.utils.defaultAbiCoder.decode(
            ["address", "string", "uint256", "uint256"],
            data
          );

          const tokenContract = decodeData[0];
          const reciever = decodeData[1].toString();
          const sourceChain = decodeData[2].toString();
          const amount = decodeData[3].toString();
          const desChain = parseInt(topics[2], 16);

          const prevTxHistory: string | null =
            window.localStorage.getItem("txHistory") ?? JSON.stringify("[]");
          const currentTxHistory: TransactionHistory[] | any =
            JSON.parse(prevTxHistory);
          const currentTx: TransactionHistory = {
            UID: result.transactionHash,
            event_name: eventName,
            reciever: reciever,
            amount: Number(amount),
            fee: 0,
            src_chain_id: Number(sourceChain),
            dest_chain_id: Number(desChain),
            token_id: 0,
            contract: ICE[80001],
            origin_chain: 0,
          };
          api.info({
            message: `Transaction submitted`,
            description: `Transfering ${ethers.utils.formatEther(
              amount.toString()
            )} ICE to ${mapChainIdToNameEVM(desChain)}`,
            placement: "bottomRight",
          });
          setTimeout(() => {
            api.info({
              message: `Transaction processing`,
              description: `Processing transaction on rosen chain`,
              placement: "bottomRight",
            });
          }, 1000);
          // currentTxHistory.push(currentTx);
          // window.localStorage.setItem(
          //   "txHistory",
          //   JSON.stringify(currentTxHistory)
          // );
        } else {
          const decodeData = ethers.utils.defaultAbiCoder.decode(
            ["uint256"],
            data
          );
          const amount = decodeData[0].toString();
          const tokenContract = "0x".concat(
            topics[1]
              .toString()
              .slice(
                topics[1].toString().length - 40,
                topics[1].toString().length
              )
          );
          const reciever = "0x".concat(
            topics[2]
              .toString()
              .slice(
                topics[2].toString().length - 40,
                topics[2].toString().length
              )
          );

          const prevTxHistory: string | null =
            window.localStorage.getItem("txHistory") ?? JSON.stringify("[]");
          const currentTxHistory: TransactionHistory[] | any =
            JSON.parse(prevTxHistory);
          const currentTx: TransactionHistory = {
            UID: result.transactionHash,
            event_name: eventName,
            reciever: reciever,
            amount: Number(amount),
            fee: 0,
            src_chain_id: 0,
            dest_chain_id: 80001,
            token_id: 0,
            contract: ICE[80001],
            origin_chain: 0,
          };
          api.success({
            message: `Transaction success`,
            description: `Transfered ${ethers.utils.formatEther(
              amount.toString()
            )} ICE to Polygon`,
            placement: "bottomRight",
          });
          // currentTxHistory.push(currentTx);
          // window.localStorage.setItem(
          //   "txHistory",
          //   JSON.stringify(currentTxHistory)
          // );
        }
      }
    );
    harmonyProvider.on(
      {
        address: BRIDGE[1666700000],
      },
      async (result) => {
        const { data, topics } = result;
        const eventName = topics[0];

        if (eventName === EventTxType.SENT_TO_CHAIN) {
          const decodeData = ethers.utils.defaultAbiCoder.decode(
            ["address", "string", "uint256", "uint256"],
            data
          );

          const tokenContract = decodeData[0];
          const reciever = decodeData[1].toString();
          const sourceChain = decodeData[2].toString();
          const amount = decodeData[3].toString();
          const desChain = parseInt(topics[2], 16);

          const prevTxHistory: string | null =
            window.localStorage.getItem("txHistory") ?? JSON.stringify("[]");
          const currentTxHistory: TransactionHistory[] | any =
            JSON.parse(prevTxHistory);
          const currentTx: TransactionHistory = {
            UID: result.transactionHash,
            event_name: eventName,
            reciever: reciever,
            amount: Number(amount),
            fee: 0,
            src_chain_id: Number(sourceChain),
            dest_chain_id: Number(desChain),
            token_id: tokenContract,
            contract: ICE[80001],
            origin_chain: 2,
          };
          api.info({
            message: `Transaction submitted`,
            description: `Transfering ${ethers.utils.formatEther(
              amount.toString()
            )} ICE to ${mapChainIdToNameEVM(desChain)}`,
            placement: "bottomRight",
          });
          setTimeout(() => {
            api.info({
              message: `Transaction processing`,
              description: `Processing transaction on rosen chain`,
              placement: "bottomRight",
            });
          }, 1000);
          // currentTxHistory.push(currentTx);
          // window.localStorage.setItem(
          //   "txHistory",
          //   JSON.stringify(currentTxHistory)
          // );
        } else {
          const decodeData = ethers.utils.defaultAbiCoder.decode(
            ["uint256"],
            data
          );
          const amount = decodeData[0].toString();
          const tokenContract = "0x".concat(
            topics[1]
              .toString()
              .slice(
                topics[1].toString().length - 40,
                topics[1].toString().length
              )
          );
          const reciever = "0x".concat(
            topics[2]
              .toString()
              .slice(
                topics[2].toString().length - 40,
                topics[2].toString().length
              )
          );

          const prevTxHistory: string | null =
            window.localStorage.getItem("txHistory") ?? JSON.stringify("[]");
          const currentTxHistory: TransactionHistory[] | any =
            JSON.parse(prevTxHistory);
          const currentTx: TransactionHistory = {
            UID: result.transactionHash,
            event_name: eventName,
            reciever: reciever,
            amount: Number(amount),
            fee: 0,
            src_chain_id: 0,
            dest_chain_id: 80001,
            token_id: 0,
            contract: ICE[80001],
            origin_chain: 2,
          };
          api.success({
            message: `Transaction success`,
            description: `Transfered ${ethers.utils.formatEther(
              amount.toString()
            )} ICE to Harmony One`,
            placement: "bottomRight",
          });
          // currentTxHistory.push(currentTx);
          // window.localStorage.setItem(
          //   "txHistory",
          //   JSON.stringify(currentTxHistory)
          // );
        }
      }
    );
  }, []);

  return (
    <NavbarContainer>
      {contextHolder}
      <Logo>Rosen Bridge</Logo>
      <Menubar>
        <CurrentNetwork>
          {chainId === 80001 ? (
            <>
              <img src="data:image/png;base64,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" />
              <span>Polygon Mumbai Testnet</span>
            </>
          ) : chainId === 1666700000 ? (
            <>
              <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/3945.png" />
              <span>Harmony One Testnet</span>
            </>
          ) : (
            <>
              {appContext.state.walletInfo?.type === WalletType.KEPLR ? (
                <>
                  <img src="https://i.pinimg.com/originals/eb/7f/9f/eb7f9f8bd8116d1bf489a199402c25fd.png" />
                  <span>ICE Chain Mainnet</span>
                </>
              ) : (
                <span>No Network Connected</span>
              )}
            </>
          )}
        </CurrentNetwork>
        {!appContext.state.walletInfo && (
          <div style={{ marginLeft: 15 }}>
            <Button
              onClick={() => {
                modalContext.dispatch({
                  type: ModalActionType.SET_CONNECT_WALLET_MODAL_STATE,
                  payload: true,
                });
              }}
            >
              Connect to a wallet
            </Button>
          </div>
        )}
        {appContext.state.walletInfo && (
          <Address
            onClick={() => {
              modalContext.dispatch({
                type: ModalActionType.SET_ACCOUNT_MODAL_STATE,
                payload: true,
              });
            }}
          >
            <span>{formatWalletAddress(appContext.state.walletInfo)}</span>
          </Address>
        )}
      </Menubar>
    </NavbarContainer>
  );
};

export default Navbar;
