import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useERC20 } from "../hooks/useERC20";
import { ICE } from "../constants/Token";
import { useAppContext } from "../context/app/appContext";
import { AppActionType } from "../context/app/appReducer";
import { useModalContext } from "../context/modal/modalContext";
import { ModalActionType } from "../context/modal/modalReducer";
import { WalletType } from "../types/wallet";
import { colors, darkBlueTemplate, withOpacity } from "../utils/styled";
import { SigningStargateClient, coins } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { MsgBridgeRequest } from "../protos/bridge";

const COSMOS_CHAIN_ID = "x:0";

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
const SearchInput = styled.input`
  border: 0;
  outline: none;
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 1rem;
  background: ${colors.lightBlue};
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${withOpacity(darkBlueTemplate, 0.1)};
  }

  &:focus {
    background: ${withOpacity(darkBlueTemplate, 0.07)};
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${colors.lightBlue};
`;
const Scrollable = styled.div`
  height: 300px;
  overflow: scroll;
`;
const TokenItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.3s;
  padding: 7px 15px;

  &:hover {
    background: ${colors.lightBlue};
  }

  & > img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
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
    & span {
      font-size: 0.8rem;
      color: ${colors.fadedBlue};
      display: block;
      font-weight: 400;
      margin-top: -3px;
    }

    &:nth-child(2) {
      color: ${colors.fadedBlue};
      font-size: 1rem;
    }
  }
`;

const SelectTokenModal = () => {
  const { account, library, chainId } = useWeb3React();
  const modalContext = useModalContext();
  const appContext = useAppContext();
  const [keplrBalance, setKeplrBalance] = useState<number>(0);
  const tokenContract = useERC20(
    chainId ? ICE[chainId] : null,
    account,
    library
  );

  useEffect(() => {
    if (appContext.state.walletInfo?.type !== WalletType.KEPLR) return;
    const getKeplr = async () => {
      // enable user wallet
      const registry = new Registry();
      registry.register(
        "/rosenlabs.xchain.xchain.MsgBridgeRequest",
        MsgBridgeRequest
      );
      const options = {
        registry: registry,
        prefix: "xchain",
      };
      await window.keplr.enable(COSMOS_CHAIN_ID);
      const offlineSigner = window.getOfflineSigner(COSMOS_CHAIN_ID);
      const accounts = await offlineSigner.getAccounts();
      const client = await SigningStargateClient.connectWithSigner(
        "http://165.232.162.158:26657",
        offlineSigner,
        options
      );
      const keplrBalance = await client.getBalance(
        accounts[0].address,
        "token"
      );
      setKeplrBalance(parseFloat(keplrBalance.amount));
    };
    getKeplr();
  }, [appContext.state.walletInfo]);

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={modalContext.state.isSelectTokenModalOpen}
        contentLabel="Select Token"
      >
        <Header>
          <span>Select Token</span>
          <span
            onClick={() => {
              modalContext.dispatch({
                type: ModalActionType.SET_SELECT_TOKEN_MODAL_STATE,
                payload: false,
              });
            }}
          >
            <CloseOutlined />
          </span>
        </Header>
        <Container>
          <SearchInput placeholder="Search name or paste address" />
        </Container>
        <Divider />
        <Scrollable>
          <TokenItem
            onClick={() => {
              appContext.dispatch({
                type: AppActionType.SET_TOKEN,
                payload: {
                  icon: "https://i.pinimg.com/originals/eb/7f/9f/eb7f9f8bd8116d1bf489a199402c25fd.png",
                  symbol: "ICE",
                },
              });
              modalContext.dispatch({
                type: ModalActionType.SET_SELECT_TOKEN_MODAL_STATE,
                payload: false,
              });
            }}
          >
            <img
              src="https://i.pinimg.com/originals/eb/7f/9f/eb7f9f8bd8116d1bf489a199402c25fd.png"
              alt="ICE"
            />
            <div>
              <div>
                <h5>ICE</h5>
                <span>ICE Chain Native Token</span>
              </div>
              <div>
                {appContext.state.walletInfo?.type === WalletType.KEPLR
                  ? keplrBalance
                  : tokenContract?.balance.toFixed(2) || 0}
              </div>
            </div>
          </TokenItem>
          {appContext.state.walletInfo?.type === WalletType.METAMASK && (
            <>
              <TokenItem style={{ cursor: "not-allowed" }}>
                <img
                  src="https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912"
                  alt="MATIC"
                />
                <div>
                  <div>
                    <h5>MATIC</h5>
                    <span>Polygon Native Token</span>
                  </div>
                  <div>0.0</div>
                </div>
              </TokenItem>
              <TokenItem style={{ cursor: "not-allowed" }}>
                <img
                  src="https://s2.coinmarketcap.com/static/img/coins/200x200/3945.png"
                  alt="ONE"
                />
                <div>
                  <div>
                    <h5>ONE</h5>
                    <span>Harmony One Native Token</span>
                  </div>
                  <div>0.0</div>
                </div>
              </TokenItem>
              <TokenItem style={{ cursor: "not-allowed" }}>
                <img
                  src="https://static.coincost.net/logo/cryptocurrency/terra-luna.png"
                  alt="LUNA"
                />
                <div>
                  <div>
                    <h5>LUNA</h5>
                    <span>Terra Native Token</span>
                  </div>
                  <div>0.0</div>
                </div>
              </TokenItem>
              <TokenItem style={{ cursor: "not-allowed" }}>
                <img
                  src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
                  alt="ETH"
                />
                <div>
                  <div>
                    <h5>ETH</h5>
                    <span>Ethereum Native Token</span>
                  </div>
                  <div>0.0</div>
                </div>
              </TokenItem>
              <TokenItem style={{ cursor: "not-allowed" }}>
                <img
                  src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png"
                  alt="DAI"
                />
                <div>
                  <div>
                    <h5>DAI</h5>
                    <span>DAI Token</span>
                  </div>
                  <div>0.0</div>
                </div>
              </TokenItem>
            </>
          )}
        </Scrollable>
      </Modal>
    </>
  );
};

export default SelectTokenModal;
