import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Navigation, AddPost } from "components";
import AddPostTry from "components/AddPost/AddPostTry";
import { Row, Col } from "components/Layout";
import { selectors } from "data";
import Modal from "components/Modal";
import { SideBar } from "components";
import { rowCenter } from "theme/styles";

export default function DefaultLayoutComp({ children }) {
  const userSession = useSelector(selectors.user.getUserSession);

  return (
    <Col.Default>
      <NavBar>
        <Navigation userSession={userSession} />
      </NavBar>
      <LayoutContainer>
        <SideBarContainer>
          <SideBar />
        </SideBarContainer>
        <ContentLayout>
          <Col.Default>{children}</Col.Default>
          <Modal />
          {userSession ? <AddPost /> : <AddPostTry />}
        </ContentLayout>
      </LayoutContainer>
    </Col.Default>
  );
}

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 20vw auto;
`;

const ContentLayout = styled(Col.Center)`
  grid-column-start: 2;
  padding: 0 100px;
  ${`min-height: calc(100vh - 110px)`};
`;

const SideBarContainer = styled(Col.Center)`
  position: fixed;
  width: 20vw;
  ${`height: calc(100vh - 110px)`}
`;

const NavBar = styled(Row.CenterBetween)`
  width: 100%;
  height: 50px;
  margin: 30px;
`;
