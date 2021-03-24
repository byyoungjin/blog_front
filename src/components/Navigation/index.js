import React from "react";
import styled from "styled-components";

import { ProfilePicture } from "components";

import NavItem from "./NavItem";

export default function NavigationComp({ userSession }) {
  return (
    <Navigation>
      <NavItem text="BLOG" to="/" show />
      <NavItem text="ABOUT ME" to="/about" show />
      <NavItem text="WHO ARE YOU" to="/login" show={!userSession} />
      {userSession && <ProfilePicture diameter="50px" />}
    </Navigation>
  );
}

const Navigation = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  grid-area: nav;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
