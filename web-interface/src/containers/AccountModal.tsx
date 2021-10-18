import Modal from "react-modal";
import { useWeb3React } from "@web3-react/core"
import { useModalContext } from "../context/modal/modalContext";
import styled from "styled-components";
import { ModalActionType } from "../context/modal/modalReducer";
import {
  blueTemplate,
  colors,
  darkBlueTemplate,
  withOpacity,
} from "../utils/styled";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CloseOutlined,
  CopyOutlined,
  FieldTimeOutlined,
  LinkOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Timeline } from "antd";
import { useAppContext } from "../context/app/appContext";
import { formatWalletAddress } from "../utils/helper";
import { WalletType } from "../types/wallet";
import { AppActionType } from "../context/app/appReducer";

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
const Container = styled.div`
  width: 400px;
`;
const Header = styled.h1`
  margin: 0;
  color: ${colors.darkBlue};
  font-weight: 500;
  padding: 0 10px;
  padding-top: 10px;

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
const Padding = styled.div`
  padding: 12px;
`;
const AccountDetail = styled.div`
  border: 1px solid ${withOpacity(blueTemplate, 0.3)};
  border-radius: 16px;
  padding: 15px;

  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;

    & > div:nth-child(1) {
      color: ${colors.fadedBlue};
    }

    & > div:nth-child(2) {
      cursor: pointer;
      color: ${colors.pink};
      border: 1px solid ${colors.fadedPink};
      border-radius: 10px;
      padding: 0 7px;
    }
  }

  & > div:nth-child(2) {
    font-size: 1rem;
    padding: 7px 0;
  }

  & > div:nth-child(3) {
    font-size: 0.8rem;
    & a {
      margin-right: 15px;
      color: ${colors.fadedBlue};
    }
  }
`;
const TransactionHistoryContainer = styled.div`
  background: ${colors.lightBlue};

  & h2 {
    font-size: 0.8rem;
    color: ${colors.darkBlue};
    display: block;
    margin-bottom: 7px;
  }
`;
const Transaction = styled.div`
  cursor: pointer;
  border-radius: 12px;
  background: white;
  border: 1px solid ${withOpacity(blueTemplate, 0.1)};
  padding: 10px;
  margin-top: 5px;

  &:hover {
    border: 1px solid ${withOpacity(blueTemplate, 0.3)};
  }

  & > h3 {
    margin: 0;
    font-size: 0.8rem;
    color: ${colors.darkBlue};

    display: flex;
    justify-content: space-between;
    & > div {
      font-size: 0.65rem;
    }
  }
  & > div {
    font-size: 0.65rem;
    color: ${colors.fadedBlue};
  }
`;
const TimelineContainer = styled.div`
  padding: 15px;
  padding-bottom: 0;
  margin-top: 15px;
`;
const Grid = styled.div`
  position: relative;

  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);

  margin-bottom: 12px;
`;
const Arrow = styled.div`
  position: absolute;
  font-size: 1rem;
  color: ${colors.fadedBlue};
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% + 1px), -50%);
`;
const TransactionDetails = styled.div`
  background: ${colors.lightBlue};
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  margin-bottom: 12px;
  padding: 12px;
  padding-bottom: 3px;
  border-radius: 16px;
  color: ${colors.darkBlue};

  & > h3 {
    font-size: 0.8rem;
    font-weight: 400;
    padding-top: 7px;
    margin-top: 7px;
    border-top: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  }

  & > div {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;

    & > div:nth-child(1) {
      font-weight: 400;
    }
    & > div:nth-child(2) {
      font-weight: 600;
    }
  }
`;
const Chain = styled.div`
  background: ${colors.lightBlue};
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  border-radius: 12px;
  color: ${colors.darkBlue};
  padding: 7px 12px;

  & > span {
    font-weight: 400;
    font-size: 0.8rem;
  }
  & > div {
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 7px;

    & > div:nth-child(1) {
      display: flex;
      align-items: center;
    }

    & img {
      width: 22px;
      height: 22px;
      margin-right: 7px;
    }
  }
`;

const ProcessingStatus = () => (
  <>
    <LoadingOutlined style={{ color: colors.blue, marginRight: 2 }} />{" "}
    <span style={{ color: colors.blue }}>Processing...</span>
  </>
);

const AccountModal = () => {
  const { deactivate } = useWeb3React()
  const modalContext = useModalContext();
  const appContext = useAppContext();
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={modalContext.state.isAccountModalOpen}
        contentLabel="Account"
      >
        <>
          <Header>
            {isOpenDetail && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setIsOpenDetail(false)}
              >
                <ArrowLeftOutlined /> Transaction Details
              </span>
            )}
            {!isOpenDetail && <span>Account</span>}
            <span
              onClick={() => {
                modalContext.dispatch({
                  type: ModalActionType.SET_ACCOUNT_MODAL_STATE,
                  payload: false,
                });
              }}
            >
              <CloseOutlined />
            </span>
          </Header>
          {isOpenDetail && (
            <Container>
              <Padding>
                <Grid>
                  <Arrow>
                    <ArrowRightOutlined />
                  </Arrow>
                  <Chain>
                    <span>From</span>
                    <div>
                      <div>
                        <img src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png" />{" "}
                        Ethereum
                      </div>
                    </div>
                  </Chain>
                  <Chain>
                    <span>To</span>
                    <div>
                      <div>
                        <img src="https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912" />{" "}
                        Polygon
                      </div>
                    </div>
                  </Chain>
                </Grid>
                <TransactionDetails>
                  <div>
                    <div>Network Fees</div>
                    <div>0.135 ETH (~ 214.56$)</div>
                  </div>
                  <div>
                    <div>Received</div>
                    <div>100.5123 USDT</div>
                  </div>
                  <div>
                    <div>Sender</div>
                    <div>0x68fc...C1a5</div>
                  </div>
                  <div>
                    <div>Recipient</div>
                    <div>0x68fc...C1a5</div>
                  </div>
                  <h3>
                    <ProcessingStatus />
                  </h3>
                </TransactionDetails>
                <TimelineContainer>
                  <Timeline pending="Recording...">
                    <Timeline.Item>
                      Create a services site 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>
                      Solve initial network problems 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                  </Timeline>
                </TimelineContainer>
              </Padding>
            </Container>
          )}
          {!isOpenDetail && (
            <Container>
              <Padding>
                <AccountDetail>
                  <div>
                    {appContext.state.walletInfo?.type === WalletType.KEPLR && (
                      <div>Connected with Keplr</div>
                    )}
                    {appContext.state.walletInfo?.type ===
                      WalletType.METAMASK && <div>Connected with MetaMask</div>}
                    <div
                      onClick={() => {
                        deactivate()
                        appContext.dispatch({
                          type: AppActionType.SET_WALLET_INFO,
                          payload: null,
                        });
                        modalContext.dispatch({
                          type: ModalActionType.SET_ACCOUNT_MODAL_STATE,
                          payload: false,
                        });
                      }}
                    >
                      Disconnect
                    </div>
                  </div>
                  <div>{formatWalletAddress(appContext.state.walletInfo)}</div>
                  <div>
                    <a
                      onClick={() => {
                        navigator.clipboard.writeText(
                          appContext.state.walletInfo?.address || ""
                        );
                      }}
                    >
                      <CopyOutlined /> Copy Address
                    </a>
                    <a
                      target="_blank"
                      href="https://etherscan.io/address/0x79A375feFbF90878502eADBA4A89697896B60c4d"
                    >
                      <LinkOutlined /> View on Explorer
                    </a>
                  </div>
                </AccountDetail>
              </Padding>
              {/* <TransactionHistoryContainer>
                <Padding>
                  <h2>Transaction History</h2>
                  <Transaction onClick={() => setIsOpenDetail(true)}>
                    <h3>
                      <span>Transfer 100.23 USDT</span>
                      <div>
                        <ProcessingStatus />
                      </div>
                    </h3>
                    <div>
                      <span style={{ marginRight: 5 }}>10:30, 15 Sep 2021</span>{" "}
                      Ethereum Mainnet <ArrowRightOutlined /> Polygon Mainnet
                    </div>
                  </Transaction>
                  <Transaction>
                    <h3>
                      <span>Transfer 100.23 USDT</span>
                      <div>
                        <CheckCircleTwoTone twoToneColor={colors.green} />{" "}
                        <span style={{ color: colors.green }}>Transfered</span>
                      </div>
                    </h3>
                    <div>
                      <span style={{ marginRight: 5 }}>10:30, 15 Sep 2021</span>{" "}
                      Ethereum Mainnet <ArrowRightOutlined /> Polygon Mainnet
                    </div>
                  </Transaction>
                  <Transaction>
                    <h3>
                      <span>Transfer 100.23 USDT</span>
                      <div>
                        <CloseCircleTwoTone twoToneColor={colors.pink} />{" "}
                        <span style={{ color: colors.pink }}>Failed</span>
                      </div>
                    </h3>
                    <div>
                      <span style={{ marginRight: 5 }}>10:30, 15 Sep 2021</span>{" "}
                      Ethereum Mainnet <ArrowRightOutlined /> Polygon Mainnet
                    </div>
                  </Transaction>
                </Padding>
              </TransactionHistoryContainer> */}
            </Container>
          )}
        </>
      </Modal>
    </>
  );
};

export default AccountModal;
