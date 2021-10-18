import styled from "styled-components";

const Container = styled.div`
  margin-top: 36px;
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
      This website is{" "}
      <a href="https://github.com/chunza2542/cryptomural" target="_blank">
        open-source
      </a>
    </Container>
  );
};

export default Footer;
