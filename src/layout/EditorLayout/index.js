import React from "react";
import styled from "styled-components";

import { MainLogo, Controller } from "components";

export default function EditorLayoutComp({ children }) {
  return (
    <EditorLayout>
      <MainLogo />
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
