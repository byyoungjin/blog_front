import React from "react";
import styled from "styled-components";

import NavItem from "./NavItem";

export default function NavigationComp() {
  return (
    <Navigation>
      <NavItem text="MYLOG" to="/myPage" />
      <NavItem text="LOGIN" to="/login" />
      <NavItem text="SIGN IN" to="/register" />
    </Navigation>
  );
}

const Navigation = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-area: nav;
`;
