import styled from "styled-components";
import { useState, useEffect } from "react";
import { formatAddress } from "../utils/helper";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`;
const Logo = styled.h1`
  color: white;
  margin: 0;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
`;
const Menubar = styled.div`
  & a {
    color: #aaa;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const Address = styled.div`
  background: black;
  color: #ccc;
  display: inline-block;
  margin-left: 12px;
  border-radius: 5rem;
  padding: 0 12px;
`;
declare global {
  interface Window {
    zilPay: any;
  }
}

const Navbar = () => {
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsConnect(window?.zilPay?.wallet?.isConnect || false);
    }, 500);
  }, []);

  const connectWallet = async () => {
    if (!window.zilPay) {
      window.location.href =
        "https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd";
      return;
    }

    const isConnect = await window.zilPay.wallet.connect();
    setIsConnect(isConnect);
  };

  return (
    <NavbarContainer>
      <Logo>CryptoMural</Logo>
      {!isConnect && (
        <Menubar onClick={connectWallet}>
          <a>Connect with ZilPay</a>
        </Menubar>
      )}
      {isConnect && (
        <Menubar>
          <a>My Collection</a>
          <Address>
            {formatAddress(window.zilPay.wallet.defaultAccount.bech32)}
          </Address>
        </Menubar>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
