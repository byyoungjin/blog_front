import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "theme/colors";

export default function NavItemComp({ text, to }) {
  return <NavItem to={to}>{text}</NavItem>;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const NavItem = styled(StyledLink)`
  font-size: 24px;
  color: ${colors.yellow};
  margin: 0 10px;
`;
