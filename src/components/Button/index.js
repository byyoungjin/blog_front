import React from "react";
import styled from "styled-components";

import { colors } from "theme";

export default function Button({ children, ...props }) {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
}

const ButtonStyled = styled.button`
  padding: 10px;
  /* height: 50px; */

  border: none;
  background-color: ${colors.yellow};
  color: white;
  font-size: 24px;
  border-radius: 20px;

  cursor: pointer;
  @media (min-width: 600px) {
    /* width: 150px; */
    height: 70px;
    font-size: 32px;
    border-radius: 30px;
  }
`;
