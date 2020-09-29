import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { MainLogo, Navigation, AddPost } from "components";
import AddPostTry from "components/AddPost/AddPostTry";
import { Row, Col } from "components/Layout";
import { selectors } from "data";
import Modal from "components/Modal";

export default function DefaultLayoutComp({ children }) {
  const userSession = useSelector(selectors.user.getUserSession);
  return (
    <DefaultLayout>
      <NavBar>
        <MainLogo />
        <Navigation userSession={userSession} />
      </NavBar>
      <ContentsContainer>{children}</ContentsContainer>
      <Modal />
      {userSession ? <AddPost /> : <AddPostTry />}
    </DefaultLayout>
  );
}

const DefaultLayout = styled(Col.Center)`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const NavBar = styled(Row.CenterBetween)`
  width: 100%;
  min-height: 5vh;
`;

const ContentsContainer = styled(Col.Default)`
  width: 90%;
  flex-wrap: wrap;
  min-height: 95vh;
`;
