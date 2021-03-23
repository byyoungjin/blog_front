import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { MainLogo, Navigation } from "components";
import { Row } from "components/Layout";
import { useTransitionTranslates } from "hooks";
import { selectors } from "data";

export default function BasicLayout({ children }) {
  const {
    TransitionDownWrapper,
    TransitionUpWrapper
  } = useTransitionTranslates();

  const userSession = useSelector(selectors.user.getUserSession);
  return (
    <Container>
      <TransitionUpWrapper>
        <NavBar>
          <MainLogo />
          <Navigation userSession={userSession} />
        </NavBar>
      </TransitionUpWrapper>
      <TransitionDownWrapper>{children}</TransitionDownWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
`;
const NavBar = styled(Row.CenterBetween)`
  width: 100%;
  margin: 10px;
`;
