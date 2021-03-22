import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import { Navigation, AddPost, MainLogo } from "components";
import AddPostTry from "components/AddPost/AddPostTry";
import { Row, Col } from "components/Layout";
import { selectors } from "data";
import { SideBar } from "components";
import { useTransitionTranslates, useWindowSize } from "hooks";
import { bp } from "constants/index";

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
          <div onClick={() => {}} style={{ cursor: "pointer" }}>
            <MainLogo disabled />
          </div>
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
  grid-template-columns: 25vw auto;

  @media (min-width: 600px) {
    grid-template-columns: 20vw auto;
  }
`;

const ContentLayout = styled(Col.Center)`
  padding: 0 20px;
  grid-column-start: 2;
  @media (min-width: 600px) {
    padding: 0 100px;
  }
  ${`min-height: calc(100vh- 110vh)`};
`;

const SideBarContainer = styled(Col.Default)`
  position: fixed;
  width: 25vw;

  @media (min-width: 600px) {
    width: 20vw;
  }

  ${`height: calc(100vh - 110px)`}
`;

const NavBar = styled(Row.CenterBetween)`
  flex: 1;
  margin: 10px;
`;
