import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "theme/colors";
import { WithToggle } from "hocs";

import LinkTransition from "../../LinkTransition";

function NavItemComp({ text, to }) {
  return <NavItem to={to}>{text}</NavItem>;
}

const StyledLink = styled(LinkTransition)`
  text-decoration: none;
  cursor: pointer;
`;

const NavItem = styled(StyledLink)`
  font-size: 24px;
  color: ${colors.yellow};
  margin: 0 10px;
`;

export default WithToggle(NavItemComp);
