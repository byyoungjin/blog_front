import React from "react";
import styled from "styled-components";

import NavItem from "./NavItem";

export default function NavigationComp({ userSession }) {
  return (
    <Navigation>
      <NavItem text="MYLOG" to="/myPage" show={userSession} />
      <NavItem text="LOGIN" to="/login" show={!userSession} />
      <NavItem text="SIGN IN" to="/register" show={!userSession} />
    </Navigation>
  );
}

const Navigation = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-area: nav;
`;
