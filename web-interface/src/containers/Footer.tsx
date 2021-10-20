import styled from "styled-components";

const Container = styled.div`
  margin-top: 60px;
  display: block;
  color: #aaa;
  text-align: center;

  & a {
    color: #aaa;
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <Container>
      <div style={{ height: 12 * 6 }}>
        2021 CryptoMural. Crafted with ♥ by{" "}
        <a target="_blank" href="https://twitter.com/chunza2542">
          @chunza2542
        </a>{" "}
        and{" "}
        <a target="_blank" href="https://twitter.com/tauhoo_ice">
          @tauhoo_ice
        </a>
        .
      </div>
    </Container>
  );
};

export default Footer;
