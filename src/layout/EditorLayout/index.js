import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { MainLogo, Controller } from "components";
import { selectors } from "data";

export default function EditorLayoutComp({ logo, controller, children }) {
  const userSession = useSelector(selectors.user.getUserSession);
  return (
    <EditorLayout>
      {logo && <MainLogo />}
      {controller && <Controller userSession={userSession} />}
      {children}
    </EditorLayout>
  );
}

const EditorLayout = styled.div`
width: 100%
height: 100%;
min-height: 100vh;
display: grid;
grid-template-columns: 1fr 740px 1fr;
grid-template-rows: 100px 1fr;
grid-template-areas: 
"logo . controller"
". editor .";
`;
