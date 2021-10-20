import styled from "styled-components";
import { useState, useEffect } from "react";
import { formatAddress } from "../utils/helper";
import { useAppContext } from "../context/app/appContext";
import { AppActionType } from "../context/app/appReducer";

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
  const { dispatch } = useAppContext();

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
      <Logo
        onClick={() => {
          dispatch({
            type: AppActionType.SET_IS_OPEN_MY_COLLECTION_PAGE,
            payload: false,
          });
        }}
      >
        CryptoMural
      </Logo>
      {!isConnect && (
        <Menubar onClick={connectWallet}>
          <a>Connect with ZilPay</a>
        </Menubar>
      )}
      {isConnect && (
        <Menubar>
          <a
            onClick={() => {
              dispatch({
                type: AppActionType.SET_IS_OPEN_MY_COLLECTION_PAGE,
                payload: true,
              });
            }}
          >
            My Collection
          </a>
          <Address>
            {formatAddress(window.zilPay.wallet.defaultAccount.bech32)}
          </Address>
        </Menubar>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
