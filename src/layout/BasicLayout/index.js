import React from "react";
import styled from "styled-components";

import { MainLogo, Controller } from "components";
import { Row } from "components/Layout";
import { useTransitionTranslates } from "hooks";

export default function BasicLayout({ children }) {
  const {
    TransitionDownWrapper,
    TransitionUpWrapper
  } = useTransitionTranslates();
  return (
    <Container>
      <TransitionUpWrapper>
        <NavBar>
          <MainLogo />
          <Controller />
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
