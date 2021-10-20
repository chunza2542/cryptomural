import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import styled from "styled-components";
import { OutlinedButton } from "../common/buttons";
import { useAppContext } from "../context/app/appContext";
import { AppActionType } from "../context/app/appReducer";
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
  padding: 0 12px;
  padding-top: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & span:nth-child(2) {
    font-size: 1rem;
    cursor: pointer;
  }
`;
const Container = styled.div`
  width: 600px;
  box-sizing: border-box;

  & h2 {
    text-align: center;
    margin: 0;
    margin-bottom: 12px;
    font-size: 2rem;
  }
  & p {
    text-align: center;
    margin: 0;
    margin-bottom: 36px;
  }
`;
const Padding = styled.div`
  padding: 0 12px;
`;
const ButtonGroup = styled.div`
  padding: 40px 12px;
  text-align: center;

  & button {
    margin: 0 12px;
  }
`;

const SuccessMintModal = () => {
  const { state, dispatch } = useAppContext();

  const closeModal = () => {
    dispatch({
      type: AppActionType.SET_IS_MINT_SUCCESS,
      payload: false,
    });
  };

  return (
    <>
      <Modal
        style={ModalStyle}
        isOpen={state.isMintSuccess}
        contentLabel="Select Chain"
      >
        <Header>
          <span></span>
          <span onClick={closeModal}>
            <CloseOutlined />
          </span>
        </Header>
        <Container>
          <Padding>
            <h2>Successfully Mint!</h2>
            <p>You successfully mint your CryptoMural NFT!!</p>
          </Padding>
          <img src="https://pbs.twimg.com/profile_banners/734228556910186498/1627112708/600x200" />
          <ButtonGroup>
            <OutlinedButton>View Contract</OutlinedButton>
            <OutlinedButton>Download</OutlinedButton>
            <OutlinedButton>Share on Twitter</OutlinedButton>
          </ButtonGroup>
        </Container>
      </Modal>
    </>
  );
};

export default SuccessMintModal;
