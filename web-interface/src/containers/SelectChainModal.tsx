import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import styled from "styled-components";
import { useAppContext } from "../context/app/appContext";
import { AppActionType } from "../context/app/appReducer";
import { useModalContext } from "../context/modal/modalContext";
import { ModalActionType } from "../context/modal/modalReducer";
import { colors, darkBlueTemplate, withOpacity } from "../utils/styled";

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
const Scrollable = styled.div`
  min-height: 300px;
  overflow: scroll;
`;
const ChainItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.3s;
  padding: 5px 15px;
  border-radius: 12px;
  border: 1px solid ${withOpacity(darkBlueTemplate, 0.1)};
  margin-bottom: 7px;

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

const SelectChainModal = () => {
  const modalContext = useModalContext();
  const appContext = useAppContext();

  const closeModal = () => {
    modalContext.dispatch({
      type: ModalActionType.SET_SELECT_FROM_CHAIN_MODAL_STATE,
      payload: false,
    });
    modalContext.dispatch({
      type: ModalActionType.SET_SELECT_TO_CHAIN_MODAL_STATE,
      payload: false,
    });
  };

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={
          modalContext.state.isSelectFromChainModalOpen ||
          modalContext.state.isSelectToChainModalOpen
        }
        contentLabel="Select Chain"
      >
        <Header>
          <span>Select Chain</span>
          <span onClick={closeModal}>
            <CloseOutlined />
          </span>
        </Header>
        <Container>
          <Scrollable>
            <ChainItem
              onClick={() => {
                const payload = {
                  id: "0",
                  icon: "https://i.pinimg.com/originals/eb/7f/9f/eb7f9f8bd8116d1bf489a199402c25fd.png",
                  name: "ICE Chain",
                };

                if (modalContext.state.isSelectFromChainModalOpen) {
                  appContext.dispatch({
                    type: AppActionType.SET_FROM_CHAIN,
                    payload,
                  });
                } else {
                  appContext.dispatch({
                    type: AppActionType.SET_TO_CHAIN,
                    payload,
                  });
                }
                closeModal();
              }}
            >
              <img
                src="https://i.pinimg.com/originals/eb/7f/9f/eb7f9f8bd8116d1bf489a199402c25fd.png"
                alt="ICE Chain"
              />
              <div>
                <div>
                  <h5>ICE Chain</h5>
                  <span>Mocked chain for demonstrating</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem
              onClick={() => {
                const payload = {
                  id: "80001",
                  icon: "data:image/png;base64,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",
                  name: "Polygon",
                };

                if (modalContext.state.isSelectFromChainModalOpen) {
                  appContext.dispatch({
                    type: AppActionType.SET_FROM_CHAIN,
                    payload,
                  });
                } else {
                  appContext.dispatch({
                    type: AppActionType.SET_TO_CHAIN,
                    payload,
                  });
                }
                closeModal();
              }}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEWPWuj///+KUeeOWOiJT+eITeeLU+eHS+eNVujLtfSFSOb+/f+fc+uHTOfVxfbczvfu5/uYaOq8oPH6+P7g1Piqh+2cb+ry7fz59v6UYumwju6ke+zq4frDq/L18f3SwPWogu3k2vm0lO+4mvDXx/bNufSieey/pfHn3vqWZenLtvTCqfK5nPCqhe1Ehw9tAAAO7ElEQVR4nOWdWXuqOhSGIbPgLGqxztXa7rb//+8dcKgKGVZCQPuc72bfdBfekmFlTQnC2jWabnb7r+H2tT0ZpGmQpoNJ+3U7XOx3m+mo/scHdf7yZbL/fk8ZpwQxJgTGOMiV/SsEY4hQztL37/1mWedL1EW47B3eUUQREycqlbBgiEbo/dCrC7MOwmV3lhLKhBbtXoJRmm53dVD6Jhwlw0FEmP7DKT4nI9HgrRd7fiOvhKPdDFEnuislRTO/kB4Je2NCbUamSoKyWc/fa/ki/NgyL3gXSHHoe3ozP4SrAa80OMvCjLdXXt7NA+HyCxG/eCcJghYeFtfKhP0ZQXXw5cKIbCsP1oqE/XHEasI7iUXjioyVCPs/HX+ri0qiU42xAuF0HNXPd2SMxtMHEI6GvBm+IyMfOlsBroR7gRrjy4XEvlHC+YDWtX6qhOlg3hzhd4MD9CrBvxsiTIJmB+hVKEiaINzypgfoVZhvayf8SB/1AU9C6Ue9hIsHfsCTMF/USPgyIQ/my0UnL3URJuIRS2hZQtgsOBaEi+jRI/QiHLVqIIzX9NFgN6JrsBUHJXwZ1HtKshUbQCcjkHD+JFPwKiGARhyMsNe4GWoW7sDWGxDh/mnWmFvhCHTcgBDuo0fDKARCBBC2+KNJlILsGmbCxfMCBgHAhDMSPjUgBNFE+MRD9CRuGqgGwtWzLjJXRQbnv56w+/yAGWLXnTD5C4AZonbr1xH2awm4+BcmOqe4hnAU/A3ADDHQmOFqwnjybMa2WmKiPkypCdfPdVzSi63tCRfPdOA1iyp3fhXhH1lGr1IuqArCpeewfP3CTBERVxC6rjL4cX8YMbEhPLj4RTGj2QaKaG1hfYPIAU64cTG3GRt+5Gv29N/ng3wefAMljB22etEZXnNFu/ghwQ0cyHZFGeHMeicsRtrjw0MijGwGI+zZjlFMJ6XxMV0/IobDJflwEkJDzmtJSEhPaEna/HTEGEL4bTeHBFWmSexZ44YfejMTfliNURGtNakuL28NZdxcxUsB1BLhp8U7YTrYqPly9d8bno7i00S4sjC4GQJ4ZHtBs1FVWlwUCoQxfJkB5yktOk1ORywKb1UgHEKXGcxfwfl0y3GTuyMqGG/3hFPgMoNpapXZspk0uHN07te+e8IxbDyBJuC9Vs3lwbGxmrAPOvaK6M2hXGk0bGzniO5ip3eEP4B3sJmA9+o3ZciJO6fNLeHcPAsxCSqUQvTSZjywd9v+LaH5EzKkj4PEL4bx20JN7Bx3H/GG0DgLRbTVJUC8tCbZMTidaVfZl1kT0zG6mUg3hIZjoeDvuuyH+BCh3FzAgn9qB/K83al9qIqb5fRKuNRbV2Sgfe/brGjTYtStP3WFXvfEK+GXdsPicjfPWb3CWdA0ngd1I7KhhFD7CdUu5Uzz9/K4Y+RL8z9Gad0DlZYJVzpC8ap+26Vi7UCBJji7qdulTn4f/kuo9QF3lGtM/MVVC5T29LiueZxe/cMXQu1ujweqF11p/YaCKz0Au7pPjfzyUS6Eb7qt4mbe3ikx+n5F9C23AQwrd3WxS+nChVAbiZFbMjA7kzHpfx7ZevRshdk9YU/rvED/JK8I9TJhkkp2Uhe/up1o745wrH1byTfcWRiYmJd90fUTXuyaE+FIPyvKhJb5mKjdPGFARjeEO72HrURovZ2RYq1LA4R0d0OoH6RlQnurK/ponPA8TI+EscGHUiRM7OOLYtw4YcDiX8LE4AYuEg7tj7GYjRonpMkvoemNi4SvDiYXnzdOeDJUjoQDw9OKhG0HQtprnPBkbOaEU9PK+EcJg2h5JtQenHI1SCgQIW7tbSQ6HqFywpnphWsgDKWEiK9b3d5qmPrpZCBmZ0LjgbsGwr7kVzCyuPg+Ei+BDpyeCJfGkKF/wkUZQETj27ytro9AR+6QCkznily+CWVRUzIo+Fnjr+otffKHZoQH4/7tl1CWiMI6klPk9Keq95gdjoTm9/VJGB/Kry34TO4JqBp3FO0jodmf4JGwV25XgOlAXYG+YpWmI8kJAXFfb4Sy1AzGtOHWuFIPFT7NCM0LjTfCYXmbE3xrCrdWiTtmTw3ClnkY+CAkyU4yQDttSK2r2aenefPAbNH4IcSS6CgS+oKeq1wTyDKrJoAkPPsgLFtpIrJoHAR27RWeMckIAUa+F8KCrPMB+q8O0xFnfAY321E1ECK8s+LLlZlC1oxkFPQBPhfvhPrYm1r2aQC8H5h8NLk8E4po69ot8GVrOR1pEnSbHqUiWlfpMDe3y+ck3QCwHfokzEw0Q0bcyGQB7GzyOVErMJ8syoSALVTBRwLtDrg8tFEUsbVhFfqi4OnIvoJvB0LId5c+Dmlry0dDjvK/HRZUFyHP/xIz6FBl3wHkexQJYRl+RYnoTdtx5S5hxTSYNwFsHIlZAPHuluIWkBS/4qP4j3aBKdqewmARjFLQO4jXoA343CXCpW2zE1POu+zcnx07dN98ClpvcDuYuBCGPTtEwxlQlXvKtD0hQKsBngQmj76cMEwI3LowZEjp+mjq1t4YUlaAB0EK+DFZpgI4ydB0BtQf/nRLDign5xP0kvJcDJibCGHtwp9NQMN7Cq6ygSBbOegLnpxyMpnT0w1nQJgTRrXNuG7Lske8u70h7rxrV3xwI1tGZEsOiDCFfUWuXCn6a/WqigKt9ZXYNLKVNUsEEkLWUmXaV67ep3xjElSbkmqegIVfF5QscghhtpZC9kNdcmL+JElhE+av2g7VEseiQayUAQoinAAJsdC972hb/B7STK+rdi6BpVIJLIiwDbJL859k2jl1n54u9P2pnHxKpyCENWFml0LPepjrN+4VvriJCoHAomLn8iBe+LUgwhnofHj+YT7TGV9xK+UEEUrXG91fQuL5hooWrBsIYXY+BBkGlx8n+pKZeXe/0t9qVKlqlhQmCojwC+SnuXmIfgUxqFocKSAFKxzmYgpWdoPGvXQtG6AVm0m4EJIuyF96J7fyw2yAVq4GciGkCcjnXRBzuKcgfqueIuNCyPuguEVRmH5aNrj/Z3FgVspplI5AsaeyMP+xuDYkKZmuTr2IHAjz2JNrwyQRHYDRP4kJw2AGf0EOhMf4obMD23B6P2tUnoCCvzk91YVwBovjKyTrS1NUOR6GeX4sNmSWS+VAeIzjA3IxlMoMOa0JIyltPh+LGyI85mI4bBc3YprKRMkEFNE5NNoQ4TGfJqzYPlDlq3gpHRpvV+CGCAkwr00vLC2BbpXyQzC5aabRDOE5r82htqD4i0pObUlSwX0RWzOEuX8p8FPseO/uk0Wixf3hshnC/LyVEU699PEkwepskM9l/n5caITTDOE5R9jNbisJE/azaLW+B9KWQsV+eI0QXvK83a2aogRDSFFJ8BDC31x9Y72FBz2E8Lfewlgz40FeCG39NNH0TBh+NlCDVCDU1o4rVLyUxESIj73bAtfHWapICEnFKoqM7AjZ2y+hta/GXkXCF/tHFos0jYQ39YemGlIPKnVPtR83UdHJZ/yG1xpSf/uFUiVC65YD5ViIgVCcauRPhFXOiDCVO+B+WHm/cVQOYRoIzxUeJ8L6h6mkx+/cIsdQmlJsIETxDWH9w1TaxXgBTPkVHWm+g57wPEhhfTF8SMgc5aCUX6xKudUHlQp9MfS9TXyIyv2r5mgpUXqftRlDxd4mHo7BBhWNyl8Vu2jdi1FlQE+f9fWbXHEhrOaPAqgUo75KnVajrYr6p29OdhnZsD5RPtRRJwLEQ2mzKX1G3EgbGbj+QWG9vnwII03gUdam1pBwpL9DRdLrK6z9SgPMdKkOH5P78KKg+rjIj34zJL8/eCVc1L/r6xv37W78cyLSx7Y+PvUr402uIbhvohcZgjktRo7NJRnX50wvZ6Z8AGnfRIcrEeyFOxPdrdOj/Zpx8rnV8oULY7mFuGlMZdO/1ItMwRyjICUziv6lLjUGLnItXDsKVPak6kEL6SPsRy7Fh0cBS9fuuv1Y94L2ItzR9rNVCVh+qO4FHc6bu8bKVKEgEbiEVNPPG9qT3YtMfaULgqds6nqyh9NOvVR3kjdUlMumlFvbVz88NHqNEThJzqYcX383gs39Fl4ESpKzaqlgut/C6o4SLzLes2B5r5LpjhK7e2a8SF9MGVsm9ZvvmWlu279K6WpyaE/DS/ts+b6ntwfcmaa4s8a+xRDkvqcwfMgdhoiVzlXLsXVSP+zOLvt717yoVEd7cEhJBd671shBUaK7C/i6LkUL0LvzmunaKJPojLvTOIz7Ladb6eD3H7rdYelFgnAUIO7mFYPfYel4D6kvuQ4gm3tIG/AP+5fdXbJ/8T5goThv/m/vdP5793Irj9P/47vVw/gPrTZioo5xqAnDlwdesm0njDVeLQ1hOH/Q7dO2wlTnC9ER/pUFVbmMmgnD1V9AjPTFSXrCcP/8iJHBz2MgDFsPM8KB4ia/sokwXDw3or63AYjwuRHNgADCsPW8czEChD4AhM+7ohpWUThh2LVtz9aIcASKs4IIw6SZO2CthMkG9O4wwrCPn80MFxjY2wFIGL4MnuswxQbQxg5Qwuy8+ExHYroGN8qGE4aLp1lvcGTeBl0Iw4Q9x2QUzKZnhQ1huJw80o96EZlYJVVZEYbhoaHr0dXC3DKjypIw3Li3efIiFGws39iWMAy3D/yMmBfvUayDMEwe9hlRYNkWx5EwDKs1tHKV4JrujZ4Jw7lN20o/wnTgkuznSmi6zNm/YM1wfBKG8cHP7W8giQ60oZFHwjCc2udKOPLdBvibJMymo2WXVTc+vnabgD4Iw/DjtebvKKJXXXJ//YTZ2XgGv4rBWozOqtz24Ycwm49DQur4kIKQYYX555Ew06otLT6rIMx423V/uJcfwmzR2aLqFzL+SlAxrDw8z/JFmGm3pl5Gq6BoXKVLakEeCcPwZTdGtFKeCmYUzXpO3UNV8kqYKU6Gg4g4ZYtjRqLBW8/ZeFHIN2Gu6WqWUmrl1BGM0nTbrVbzJVcdhLmWvcM7iihihs+JBUM0Qu+HnoeNQaq6CI+aJv+2kwBxShBjQuBzckf2rxCMIUI5Cibbf0ldcEfVSnjSqJ/s9ovh9rU9GaRpkKaDSft1O1zsd0nf65oi13+pHttcyIBS1wAAAABJRU5ErkJggg=="
                alt="Polygon"
              />
              <div>
                <div>
                  <h5>Polygon</h5>
                  <span>Polygon Testnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem
              onClick={() => {
                const payload = {
                  id: "99999",
                  icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/3945.png",
                  name: "Harmony One",
                };

                if (modalContext.state.isSelectFromChainModalOpen) {
                  appContext.dispatch({
                    type: AppActionType.SET_FROM_CHAIN,
                    payload,
                  });
                } else {
                  appContext.dispatch({
                    type: AppActionType.SET_TO_CHAIN,
                    payload,
                  });
                }
                closeModal();
              }}
            >
              <img
                src="https://s2.coinmarketcap.com/static/img/coins/200x200/3945.png"
                alt="Harmony One"
              />
              <div>
                <div>
                  <h5>Harmony One</h5>
                  <span>Harmony One Testnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem
              style={{ cursor: "not-allowed", background: colors.lightBlue }}
            >
              <img
                src="https://pbs.twimg.com/profile_images/1384182565154611201/XFFjq4v1_400x400.jpg"
                alt="Optimism"
              />
              <div>
                <div>
                  <h5>Optimism</h5>
                  <span>Optimism Ethereum Layer 2 Mainnet</span>
                </div>
              </div>
            </ChainItem>
            <ChainItem
              style={{ cursor: "not-allowed", background: colors.lightBlue }}
            >
              <img
                src="https://solana.com/branding/new/exchange/exchange-black.png"
                alt="Solana"
              />
              <div>
                <div>
                  <h5>Solana</h5>
                  <span>Solana Mainnet</span>
                </div>
              </div>
            </ChainItem>
          </Scrollable>
        </Container>
      </Modal>
    </>
  );
};

export default SelectChainModal;
