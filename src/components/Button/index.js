import React from "react";
import styled from "styled-components";

import { colors } from "theme";

export default function Button({ children, ...props }) {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
}

const ButtonStyled = styled.button`
  width: 150px;
  height: 70px;

  border: none;
  background-color: ${colors.yellow};
  color: white;
  font-size: 32px;
  border-radius: 30px;

  cursor: pointer;
`;
