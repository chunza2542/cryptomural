import styled from "styled-components";

const ButtonStyle = styled.button`
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.25s;
  border-radius: 5px;
  cursor: pointer;
`;
export const DisabledButton = styled(ButtonStyle)`
  color: #aaa;
  font-size: 1.4rem;
  background: transparent;
  cursor: not-allowed;
`;
export const OutlinedButton = styled(ButtonStyle)`
  color: black;
  background: transparent;
  border: 1px solid black;
  padding: 6px 12px;
  & a {
    color: black;
  }
  &:hover {
    text-decoration: underline;
  }
`;
export const LinkButton = styled(ButtonStyle)`
  color: white;
  font-size: 1.4rem;
  background: transparent;

  &:hover {
    text-decoration: underline;
  }
`;
export const PrimaryButton = styled(ButtonStyle)`
  background: black;
  color: #ccc;

  &:hover {
    background: #111;
  }
`;
export const PrimaryBlockButton = styled(PrimaryButton)`
  color: white;
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: center;

  & svg {
    transform: scale(1.5);
  }
`;
