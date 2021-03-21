import React from "react";
import styled from "styled-components";

import { Col, Row } from "components/Layout";

import { MainLogo, Controller, SubjectIndexList } from "components";
import { useTransitionTranslates } from "hooks";

export default function AboutMeLayoutComp({ children }) {
  const {
    TransitionDownWrapper,
    TransitionUpWrapper
  } = useTransitionTranslates({
    containerStyle: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100%"
    }
  });

  return (
    <AboutMeLayout>
      <TransitionUpWrapper>
        <NavBar>
          <MainLogo />
        </NavBar>
      </TransitionUpWrapper>
      <TransitionDownWrapper>{children}</TransitionDownWrapper>
    </AboutMeLayout>
  );
}

const AboutMeLayout = styled(Col.Center)`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const NavBar = styled(Row.CenterBetween)`
  width: 100%;
  margin: 10px;
`;
