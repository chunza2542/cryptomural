import { useState, useEffect } from "react";
import styled from "styled-components";
import { DisabledButton, LinkButton } from "../common/buttons";

const Container = styled.div`
  margin-top: 36px;
  color: #aaa;
  text-align: center;
`;

const Mint = () => {
  const [isConnect, setIsConnect] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    setTimeout(async () => {
      setIsConnect(window?.zilPay?.wallet?.isConnect || false);

      if (window?.zilPay?.wallet?.isConnect) {
        const walletAddress = "zil15025jqzg68qd2dj20wx5m2ck9sj83lvksfaau5";
        try {
          const { result } = await window.zilPay.blockchain.getBalance(
            walletAddress
          );
          setCurrentBalance(+result.balance / Math.pow(10, 12));
        } catch (e) {}
      }
    }, 500);
  }, []);

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
              <LinkButton>Mint Your CryptoMural NFT</LinkButton>
              {/* TODO: Update Estimate Gas */}
              <div>
                Your Balance: {currentBalance.toFixed(2)} ZIL, Estimated Mint
                Gas: 0.1 ZIL
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Mint;
