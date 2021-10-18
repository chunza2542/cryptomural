import styled from "styled-components";
import { LinkButton } from "../common/buttons";

const Container = styled.div`
  margin-top: 36px;
  color: #aaa;
  text-align: center;
`;

const Mint = () => {
  return (
    <Container>
      <LinkButton>Mint Your CryptoMural</LinkButton>
    </Container>
  );
};

export default Mint;
