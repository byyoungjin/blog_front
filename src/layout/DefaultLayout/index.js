import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { MainLogo, Navigation, AddPost } from "components";
import { selectors } from "data";

export default function DefaultLayoutComp({ children }) {
  const userSession = useSelector(selectors.user.getUserSession);
  return (
    <DefaultLayout>
      <MainLogo />
      <Navigation userSession={userSession} />
      {children}
      {userSession && <AddPost />}
    </DefaultLayout>
  );
}

const DefaultLayout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100px 1fr 100px;
  grid-template-rows: 100px 1fr;
  grid-template-areas:
    " logo nav . "
    ". contents . ";
`;
