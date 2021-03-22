import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Col, Row } from "components/Layout";

import { MainLogo, Controller, SubjectIndexList } from "components";
import { theme } from "theme";
import { useTransitionTranslates } from "hooks";

export default function EditorLayoutComp({ children }) {
  const isMobile = window.innerWidth < 600;
  const [isShowSubjectList, setIsShowSubjectList] = useState(
    isMobile ? false : true
  );

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
          {isShowSubjectList && <SubjectIndexList />}
        </TransitionLeftWrapper>
      </SideBarContainer>
      {isMobile && (
        <ShowSubjectButton
          onClick={() => {
            setIsShowSubjectList(prev => !prev);
          }}
        >
          {`show 
          subject`}
        </ShowSubjectButton>
      )}
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
  right: 0;
  top: 150px;
  width: 20vw;

  ${`height: calc(100vh - 110px)`}
`;

const ShowSubjectButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 0;
  background-color: ${theme["color-basic-300"]};

  opacity: 0.3;
  text-align: center;
  padding: 3px;
  border-radius: 5px;
`;
