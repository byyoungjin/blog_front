import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { Navigation, AddPost, MainLogo } from "components";
import AddPostTry from "components/AddPost/AddPostTry";
import { Row, Col } from "components/Layout";
import { selectors } from "data";
import { SideBar } from "components";
import { useTransitionTranslates } from "hooks";

export default function DefaultLayoutComp({ children }) {
  const dispatch = useDispatch();
  const userSession = useSelector(selectors.user.getUserSession);

  const {
    TransitionLeftWrapper,
    TransitionRightWrapper,
    TransitionUpWrapper
  } = useTransitionTranslates();

  return (
    <Col.Default>
      <TransitionUpWrapper>
        <NavBar>
          <MainLogo disabled />
          <Navigation userSession={userSession} />
        </NavBar>
      </TransitionUpWrapper>
      <LayoutContainer>
        <SideBarContainer>
          <TransitionLeftWrapper>
            <SideBar />
          </TransitionLeftWrapper>
        </SideBarContainer>
        <ContentLayout>
          <TransitionRightWrapper>
            <Col.Default>{children}</Col.Default>
          </TransitionRightWrapper>
        </ContentLayout>
        {userSession ? <AddPost /> : <AddPostTry />}
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
  ${`min-height: calc(100vh- 110vh)`};
`;

const SideBarContainer = styled(Col.Default)`
  position: fixed;
  width: 20vw;
  ${`height: calc(100vh - 110px)`}
`;

const NavBar = styled(Row.CenterBetween)`
  flex:1
  margin: 10px;
`;
