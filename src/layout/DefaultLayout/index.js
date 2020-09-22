import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { MainLogo, Navigation, AddPost } from "components";
import { Row } from "components/Layout";
import { selectors } from "data";

export default function DefaultLayoutComp({ children }) {
  const userSession = useSelector(selectors.user.getUserSession);
  return (
    <DefaultLayout>
      <NavBar>
        <MainLogo />
        <Navigation userSession={userSession} />
      </NavBar>
      {children}
      {userSession && <AddPost />}
    </DefaultLayout>
  );
}

const DefaultLayout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const NavBar = styled(Row.CenterBetween)``;
