import { useState, useEffect } from "react";
import styled from "styled-components";
import { DisabledButton, LinkButton } from "../common/buttons";
import { useAppContext } from "../context/app/appContext";
import { AppActionType } from "../context/app/appReducer";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import { StatusType, MessageType } from "@zilliqa-js/subscriptions";
import { generate } from "../utils/generator";
import * as IPFS from "ipfs-core";
import CONTRACT from "../constants/Contract"

let ipfs: any;
(async () => {
  ipfs = await IPFS.create({
    config: {
      API: {
        HTTPHeaders: {
          "Access-Control-Allow-Origin": ["*"],
        },
      },
    },
  });
})();

const Container = styled.div`
  margin-top: 36px;
  color: #aaa;
  text-align: center;
`;

const ContractAddress = CONTRACT.address;

const Mint = () => {
  const [isConnect, setIsConnect] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { dispatch } = useAppContext();

  useEffect(() => {
    setTimeout(async () => {
      setIsConnect(window?.zilPay?.wallet?.isConnect || false);

      if (window?.zilPay?.wallet?.isConnect) {
        const walletAddress = window?.zilPay?.wallet?.defaultAccount.bech32;
        try {
          const { result } = await window.zilPay.blockchain.getBalance(
            walletAddress
          );
          setCurrentBalance(+result.balance / Math.pow(10, 12));
        } catch (e) {}
      }
    }, 500);
  }, []);

  useEffect(() => {
    (async () => {
      const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");
      const subscriber = zilliqa.subscriptionBuilder.buildEventLogSubscriptions(
        "wss://dev-ws.zilliqa.com",
        {
          // smart contract address you want to listen on
          addresses: [ContractAddress],
        }
      );

      subscriber.emitter.on(StatusType.SUBSCRIBE_EVENT_LOG, (event: any) => {
        // if subscribe success, it will echo the subscription info
        console.log("get SubscribeEventLog echo: ", event);
      });

      subscriber.emitter.on(MessageType.EVENT_LOG, (event: any) => {
        const e = ((event?.value || [])[0] || { event_logs: [{}] })
          .event_logs[0];
        console.log("DEBUG : ");
        console.log(event);

        if (e._eventname === "MintSuccess") {
          e.params.forEach((param: any) => {
            if (param.vname === "token_id") {
              dispatch({
                type: AppActionType.SET_TOKEN_ID,
                payload: param.value,
              });
            }

            if (param.vname === "by") {
              const walletAddress =
                window?.zilPay?.wallet?.defaultAccount.base16;
              if (param.value.toLowerCase() === walletAddress.toLowerCase()) {
                dispatch({
                  type: AppActionType.SET_IS_MINT_SUCCESS,
                  payload: true,
                });
                setLoading(false);
              }
            }
            if (param.vname === "token_uri") {
              dispatch({
                type: AppActionType.SET_IMAGE_URL,
                payload: param.value,
              });
            }
          });
        }
      });

      await subscriber.start();
    })();
  }, []);

  const mint = async () => {
    const CryptoMuralContract = window.zilPay.contracts.at(ContractAddress);
    const gasPrice = window.zilPay.utils.units.toQa(
      "200",
      window.zilPay.utils.units.Units.Li
    );

    const imageData = generate();
    const { cid } = await ipfs.add(imageData);
    const imageUrl = `https://ipfs.io/ipfs/${cid.toString()}`;

    await CryptoMuralContract.call(
      "Mint",
      [
        {
          vname: "to",
          type: "ByStr20",
          value: window?.zilPay?.wallet?.defaultAccount.base16 || "",
        },
        {
          vname: "token_uri",
          type: "String",
          value: imageUrl,
        },
      ],
      {
        gasPrice,
        gasLimit: window.zilPay.utils.Long.fromNumber(10000),
      }
    );

    setLoading(true);
  };

  return (
    <Container>
      {!isConnect && (
        <>
          <DisabledButton>Mint Your CryptoMural NFT</DisabledButton>
          <div style={{ color: "rgb(241, 193, 50)" }}>
            Connect with ZilPay wallet to start minting the NFT
          </div>
        </>
      )}

      {isConnect && (
        <>
          {window.zilPay?.wallet?.net !== "testnet" && (
            <>
              <DisabledButton>Mint Your CryptoMural NFT</DisabledButton>
              <div style={{ color: "rgb(241, 193, 50)" }}>
                Wrong network, please switch the network to testnet
              </div>
            </>
          )}

          {window.zilPay?.wallet?.net === "testnet" && (
            <>
              {!isLoading && (
                <LinkButton onClick={mint}>
                  Mint Your CryptoMural NFT
                </LinkButton>
              )}
              {isLoading && <DisabledButton>Minting... <i style={{fontSize: "16px"}} className="fas fa-circle-notch fa-spin"></i></DisabledButton>}
              <div>
                Your Balance: {currentBalance.toFixed(2)} ZIL, Estimated Mint
                Gas: ~2 ZIL
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Mint;
