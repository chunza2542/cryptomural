import styled from "styled-components";

const Container = styled.div`
  margin-top: 36px;
  color: white;

  & p {
    font-size: 1.4rem;
    margin: 0;
  }
`;
const Heading = styled.div`
  color: #aaa;
`;
const LinkContainer = styled.div`
  margin-top: 24px;

  & a {
    color: white;
    margin-right: 12px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Landing = () => {
  return (
    <Container>
      <Heading>What is CryptoMural?</Heading>
      <p>
        CryptoMural is an “on-chain” generative art for your Twitter header
        powered by Zilliqa blockchain. All the arts are generated using the Flow
        Field pathfinding algorithm.
      </p>
      <LinkContainer>
        <a>Mintable</a>
        <a>Contract</a>
        <a>Twitter</a>
      </LinkContainer>
    </Container>
  );
};

export default Landing;
