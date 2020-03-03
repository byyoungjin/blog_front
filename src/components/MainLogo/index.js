import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "theme";

export default function MainLogoComp() {
  return <MainLogo to="/">LOG</MainLogo>;
}

const MainLogo = styled(Link)`
  font-size: 32px;
  color: ${colors.blue_dark};
  grid-area: logo;
  align-self: center;
  justify-self: center;

  text-decoration: none;
  cursor: pointer;
`;
