import React from "react";
import styled from "styled-components";

import { ProfilePicture } from "components";

import NavItem from "./NavItem";

export default function NavigationComp({ userSession }) {
  return (
    <Navigation>
      {userSession && <ProfilePicture diameter="50px" />}
      <NavItem text="BLOG" to="/" show />
      <NavItem text="ABOUT ME" to="/about" show />
      <NavItem text="WHO ARE YOU" to="/login" show={!userSession} />
    </Navigation>
  );
}

const Navigation = styled.div`
  display: flex;
  align-items: center;
  grid-area: nav;
`;
