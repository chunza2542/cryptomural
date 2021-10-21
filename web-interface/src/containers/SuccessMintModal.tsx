import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import styled from "styled-components";
import { OutlinedButton } from "../common/buttons";
import { useAppContext } from "../context/app/appContext";
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
    font-size: 2rem;
  }
  & p {
    text-align: center;
    margin: 0;
    margin-bottom: 36px;
  }
  & img {
    width: 100%;
    height: 200px;
    background: black;
  }
`;
const Padding = styled.div`
  padding: 0 12px;
`;
const ButtonGroup = styled.div`
  padding: 36px 12px;
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
    dispatch({
      type: AppActionType.SET_IMAGE_URL,
      payload: "",
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
          <img src={state.imageURL} />
          <ButtonGroup>
            <OutlinedButton>View on Explorer</OutlinedButton>
            <OutlinedButton>Download</OutlinedButton>
            <OutlinedButton>Share on Twitter</OutlinedButton>
          </ButtonGroup>
        </Container>
      </Modal>
    </>
  );
};

export default SuccessMintModal;
