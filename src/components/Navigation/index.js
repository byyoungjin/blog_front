import React from "react";
import styled from "styled-components";

import { ProfilePicture } from "components";

import NavItem from "./NavItem";

export default function NavigationComp({ userSession }) {
  return (
    <Navigation>
      {userSession && <ProfilePicture diameter="50px" />}
      <NavItem text="LOGIN" to="/login" show={!userSession} />
      <NavItem text="SIGN IN" to="/register" show={!userSession} />
      <NavItem text="ABOUT ME" to="/about" show />
    </Navigation>
  );
}

const Navigation = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-area: nav;
`;
