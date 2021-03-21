import React from "react";
import styled from "styled-components";

import { Col, Row } from "components/Layout";

import { MainLogo, Controller, SubjectIndexList } from "components";
import { useTransitionTranslates } from "hooks";

export default function EditorLayoutComp({ children }) {
  const {
    TransitionLeftWrapper,
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
    <EditorLayout>
      <TransitionUpWrapper>
        <NavBar>
          <MainLogo />
          <Controller />
        </NavBar>
      </TransitionUpWrapper>
      <TransitionDownWrapper>{children}</TransitionDownWrapper>
      <SideBarContainer>
        <TransitionLeftWrapper>
          <SubjectIndexList />
        </TransitionLeftWrapper>
      </SideBarContainer>
    </EditorLayout>
  );
}

const EditorLayout = styled(Col.Center)`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const NavBar = styled(Row.CenterBetween)`
  width: 100%;

  margin: 10px;
`;

const SideBarContainer = styled(Col.Default)`
  position: fixed;
  left: 0;
  top: 150px;
  width: 20vw;
  ${`height: calc(100vh - 110px)`}
`;
