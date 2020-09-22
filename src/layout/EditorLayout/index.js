import React from "react";
import styled from "styled-components";

import { Col, Row } from "components/Layout";
import Modal from "components/Modal";

import { MainLogo, Controller } from "components";

export default function EditorLayoutComp({ children }) {
  return (
    <EditorLayout>
      <NavBar>
        <MainLogo />
        <Controller />
      </NavBar>
      {children}
      <Modal />
    </EditorLayout>
  );
}

const EditorLayout = styled(Col.Center)`
width: 100%
height: 100%;
min-height: 100vh;
`;

const NavBar = styled(Row.CenterBetween)`
  width: 100%;
`;
