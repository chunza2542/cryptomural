import styled from "styled-components";
import Example from "./Example";

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
        CryptoMural is an NFT generative art for your Twitter header on Zilliqa
        blockchain. All the arts are generated using the Flow Field pathfinding
        algorithm.
      </p>
      <LinkContainer>
        <a href="https://github.com/chunza2542/cryptomural" target="_blank">Github</a>
        <a href="https://viewblock.io/zilliqa/address/zil1l975dvkygx584fl0kxadqsz5y3xqeur0qhxyz4?network=testnet&tab=code" target="_blank">Contract</a>
        <a href="https://twitter.com/chunza2542" target="_blank">Twitter</a>
      </LinkContainer>
      <Example />
    </Container>
  );
};

export default Landing;
