import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "theme";
import LinkTransition from "../LinkTransition";

const logo = process.env.PUBLIC_URL + "/images/logo.svg";

export default function MainLogoComp({ disabled, style }) {
  return disabled ? (
    <DisabledMainLogo style={style}>
      <LogoImage src={logo} alt="logo-image" />
    </DisabledMainLogo>
  ) : (
    <ClickableMainLogo style={style} to="/">
      <LogoImage src={logo} alt="logo-image" />
    </ClickableMainLogo>
  );
}

const ClickableMainLogo = styled(LinkTransition)`
  font-size: 32px;
  color: ${colors.blue_dark};
  grid-area: logo;
  align-self: center;
  justify-self: center;
  text-decoration: none;
  cursor: pointer;
  margin-left: 10px;
`;

const DisabledMainLogo = styled.span`
  font-size: 32px;
  color: ${colors.blue_dark};
  grid-area: logo;
  align-self: center;
  justify-self: center;
  text-decoration: none;

  margin-left: 10px;
`;

const LogoImage = styled.img`
  width: 50px;
`;
