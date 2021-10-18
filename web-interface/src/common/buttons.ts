import styled from "styled-components";
import {
  blueTemplate,
  colors,
  darkBlueTemplate,
  withOpacity,
} from "../utils/styled";

const ButtonStyle = styled.button`
  border: 0;
  color: #ccc;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.25s;
  border-radius: 5px;
  cursor: pointer;
`;

export const Button = styled(ButtonStyle)`
  color: white;
  background: ${colors.blue};
  border-radius: 7px;
  padding: 3px 12px;

  &:hover {
    background: ${withOpacity(blueTemplate, 0.9)};
  }
`;

export const DisabledButton = styled(ButtonStyle)`
  background: ${colors.lightBlue};
  color: ${withOpacity(darkBlueTemplate, 0.65)};
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: center;
  border-radius: 16px;
  cursor: not-allowed;
`;

export const PrimaryButton = styled(ButtonStyle)`
  background: black;

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
