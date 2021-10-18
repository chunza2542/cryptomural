import styled from "styled-components";

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

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>CryptoMural</Logo>
      <Menubar>
        <a>Connect with ZilPay</a>
      </Menubar>
    </NavbarContainer>
  );
};

export default Navbar;
